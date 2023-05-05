import { get as httpsGet } from 'node:https';
import { get as httpGet } from 'node:http';

export interface RequestParams<LogEnabled extends boolean> {
  rawUrl: string
  token: string
  command: string
  log?: LogEnabled
}

export interface ExtractDataOptions<LogEnabled extends boolean> {
  onException: (exception: string, lines: Line<LogEnabled>[]) => void
  onError: (error: ApiErrorResponse['error']) => void
  removeColors?: true
  filter?: {
    dev?: true
    debug?: true
    info?: true
    error?: true
  }
}

export type ExtractedData<LogEnabled extends boolean> = { lines: Line<LogEnabled>[], data: string }

export default request;
export async function request<L extends boolean = true >(params: RequestParams<L>, extractData: ExtractDataOptions<L>): Promise<ExtractedData<L>>
export async function request<L extends boolean = false>(params: RequestParams<L>, extractData: ExtractDataOptions<L>): Promise<ExtractedData<L>>
export async function request<L extends boolean = true >(params: RequestParams<L>, extractData?:             undefined): Promise<ApiResponse<L>>
export async function request<L extends boolean = false>(params: RequestParams<L>, extractData?:             undefined): Promise<ApiResponse<L>>

export async function request<L extends boolean>(params: RequestParams<L>, extractData?: ExtractDataOptions<L>) {
  const url = new URL(params.rawUrl);
  if (url.pathname == '/') url.pathname = '/webapi/remotecontrol/command';

  url.searchParams.append('token', params.token);
  url.searchParams.append('command', params.command);
  url.searchParams.append('log', `${!!params.log}`);

  const get: typeof httpGet =
    url.protocol === 'https:'
      ? httpsGet
      : url.protocol === 'http:'
        ? httpGet : null;

  const req = new Promise<ApiResponse<L>>((resolve, reject) => {
    get(url, response => {
      response.on('error', reject);

      response.setEncoding('utf-8');
      response.on('data', dataChunk => resolve(Object.freeze(JSON.parse(dataChunk.toString())))); // That's will work perfect, just trust me

      response.on('end', () => reject('No data!'));
    })
    .on('error', reject);
  });

  if (!extractData) return req;

  const lines: Line<L>[] = [];
  let data = '';

  const extractedData = req.then(apiResponse => {
    if (isError(apiResponse)) return extractData.onError(apiResponse.error);
    if (isException(apiResponse)) return extractData.onException(apiResponse.data.exception, apiResponse.data.lines);

    apiResponse = getSuccess(apiResponse);
    apiResponse.data.lines?.forEach(line => {
      if (extractData.filter?.[line.level.toLowerCase()]) return;
      if (extractData.removeColors) line.message = line.message.replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, '');
      lines.push(line);
      data += `[${line.level}${' '.repeat(5 - line.level.length)}] ${line.message}\n`;
    });

    return { lines, data } as ExtractedData<L>;
  });

  if (!await extractedData) throw 'Exception or error is resolved.';

  return extractedData;
}

export const isError = (response: ApiResponse<boolean>): response is ApiErrorResponse => 'error' in response;
export const getSuccess = <LogEnabled extends boolean>(response: ApiResponse<LogEnabled>): ApiSuccessResponse<LogEnabled> => (!isError(response) && !isException(response)) ? response as ApiSuccessResponse<LogEnabled> : null;
export const isException = <LogEnabled extends boolean>(response: ApiResponse<LogEnabled>): response is ApiExceptionResponse<LogEnabled> => 'data' in response && 'success' in response.data && !response.data.success;

export type ApiResponse<LogEnabled extends boolean> = Readonly<ApiSuccessResponse<LogEnabled> | ApiExceptionResponse<LogEnabled> | ApiErrorResponse>;

export type Line<LogEnabled extends boolean> = LogEnabled extends true ? { level: 'DEV' | 'DEBUG' | 'INFO' | 'ERROR', message: string } : undefined;
export interface ApiSuccessResponse<LogEnabled extends boolean> {
  data: {
    lines: Line<LogEnabled>[]
    success: true
  }
}
export interface ApiExceptionResponse<LogEnabled extends boolean> {
  data: {
    lines: Line<LogEnabled>[]
    exception: string
    success: false
  }
}
export interface ApiErrorResponse {
  error: 'RemoteControl disabled'             |
    'You can used only GET and POST requests' |
    'Missing required parameter: token'       |
    'Token not valid'                         |
    'Missing required parameter: command'     |
    'You cannot execute this command'
}
