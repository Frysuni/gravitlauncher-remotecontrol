import request, { ExtractDataOptions, RequestParams } from './core';

export type CommandModule = { [key: string]:(this: GravitLauncherRemoteControlCore, params?: any, log?: boolean) => any };
export class GravitLauncherRemoteControlCore {
  constructor(
    private readonly rawUrl: string,
    private readonly token: string
  ) {}

  protected async request<LogEnabled extends boolean>(command: string, log?: LogEnabled) {
    const requestParams: RequestParams<LogEnabled> = {
      rawUrl: this.rawUrl,
      token: this.token,
      command, log
    };

    const extractDataOptions: ExtractDataOptions<LogEnabled> = {
      onError(error) { throw error; },
      onException(exception) { throw exception; },
      filter: { debug: true, dev: true },
      removeColors: true
    };

    const res = await request<LogEnabled>(requestParams, extractDataOptions).catch(e => { throw e; });
    return res;
  }

  public import<T extends CommandModule>(commands: T): this is this & T {
    for (const command in commands) {
      this[command as string] = commands[command].bind({ token: this.token, rawUrl: this.rawUrl, request: this.request, import: this.import });
      if (!this[command as string] || typeof this[command as string] !== 'function') return false;
    }
    return true;
  }
}


export * as commands from './commands';
export * from './core';

export function init<T extends CommandModule>(rawUrl: string, token: string, commands: T): GravitLauncherRemoteControlCore & T {
  const core = new GravitLauncherRemoteControlCore(rawUrl, token);
  core.import(commands);
  return core as GravitLauncherRemoteControlCore & T;
}