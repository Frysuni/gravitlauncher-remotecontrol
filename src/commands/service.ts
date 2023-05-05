import { GravitLauncherRemoteControlCore as This } from 'index';

/**
 * Category: service - Managing LaunchServer Components
 * Commands:
 * clients, signjar, serverstatus, signdir, notify, token, token server, token info, securitycheck,
 * component, component load, component unload, config_launchserver, config_launchserver_resetauth,
 * config_launchserver_reload, config_launchserver_save, config_componentReglimiter, config_componentAuthlimiter, config_componentProguard, config_authStdCore
 */
export const service = {
  /**
   * Show all connected clients
   */
  clients<T extends boolean>(this: This, log?: T) {
    return this.request<T>('clients', log);
  },

  /**
   * sign custom jar
   */
  signjar<T extends boolean>(this: This, params: { pathToFile: string, pathToSignedFile?: string }, log?: T) {
    return this.request<T>(`signjar ${params.pathToFile} ${params.pathToSignedFile ?? ''}`, log);
  },

  /**
   * Check server status
   */
  serverstatus<T extends boolean>(this: This, log?: T) {
    return this.request<T>('serverstatus', log);
  },

  /**
   * sign all files into dir
   */
  signdir<T extends boolean>(this: This, params: { pathToDir: string }, log?: T) {
    return this.request<T>(`signdir ${params.pathToDir}`, log);
  },

  /**
   * send notification to all connected client
   */
  notify<T extends boolean>(this: This, params: { head: string, message: string, icon?: string }, log?: T) {
    return this.request<T>(`notify ${params.head} ${params.message} ${params.icon ?? ''}`, log);
  },

  /**
   * jwt management
   */
  token<T extends boolean>(this: This, params: { action: 'server' | 'info', args: string[] }, log?: T) {
    return this.request<T>(`token ${params.action} ${params.args.join(' ')}`, log);
  },

  /**
   * generate new server token
   */
  token_server<T extends boolean>(this: This, params: { profileName: string, authId?: string }, log?: T) {
    return this.request<T>(`token server ${params.profileName} ${params.authId ?? ''}`, log);
  },

  /**
   * print token info
   */
  token_info<T extends boolean>(this: This, params: { token: string }, log?: T) {
    return this.request<T>(`token info ${params.token}`, log);
  },

  /**
   * check configuration
   */
  securitycheck<T extends boolean>(this: This, log?: T) {
    return this.request<T>('securitycheck', log);
  },

  /**
   * component manager
   */
  component<T extends boolean>(this: This, params: { action: 'load' | 'unload', componentName: string, moreArgs?: string[] }, log?: T) {
    return this.request<T>(`component ${params.action} ${params.componentName} ${(params.moreArgs ?? []).join(' ')}`, log);
  },

  /**
   * Load component
   */
  component_load<T extends boolean>(this: This, params: { componentName: string, componentType: string, jsonFile?: string }, log?: T) {
    return this.request<T>(`component load ${params.componentName} ${params.componentType} ${params.jsonFile ?? ''}`, log);
  },

  /**
   * Unload component
   */
  component_unload<T extends boolean>(this: This, params: { componentName: string }, log?: T) {
    return this.request<T>(`component unload ${params.componentName}`, log);
  },

  /**
   * call reconfigurable action
   */
  config<T extends boolean>(this: This, params: { name: string, action: 'launchserver' | 'component.reglimiter' | 'component.authlimiter' | 'component.proguard' | 'auth.std.core', moreArgs?: string[] }, log?: T) {
    return this.request<T>(`config ${params.name} ${params.action} ${(params.moreArgs ?? []).join(' ')}`, log);
  },

  config_launchserver<T extends boolean>(this: This, params: { subcommand: 'resetauth' | 'reload' | 'save', args?: string[] }, log?: T) {
    return this.request<T>(`config launchserver ${params.subcommand} ${(params.args ?? []).join(' ')}`, log);
  },

  /**
   * reset auth by id
   */
  config_launchserver_resetauth<T extends boolean>(this: This, params: { authId: string }, log?: T) {
    return this.request<T>(`config launchserver resetauth ${params.authId}`, log);
  },

  /**
   * reload launchserver config
   */
  config_launchserver_reload<T extends boolean>(this: This, params: { type?: string }, log?: T) {
    return this.request<T>(`config launchserver reload ${params.type}`, log);
  },

  /**
   * save launchserver config
   */
  config_launchserver_save<T extends boolean>(this: This, log?: T) {
    return this.request<T>('config launchserver save', log);
  },

  config_componentReglimiter<T extends boolean>(this: This, params: { subcommand: 'addExclude' | 'clear' | 'clearExclude' | 'gc' | 'rmExclude', arg?: string }, log?: T) {
    return this.request<T>(`config component.reglimiter ${params.subcommand} ${params.arg ?? ''}`, log);
  },

  config_componentAuthlimiter<T extends boolean>(this: This, params: { subcommand: 'addExclude' | 'clear' | 'clearExclude' | 'gc' | 'rmExclude', arg?: string }, log?: T) {
    return this.request<T>(`config component.authlimiter ${params.subcommand} ${params.arg ?? ''}`, log);
  },

  config_componentProguard<T extends boolean>(this: This, params: { subcommand: 'addExclude' | 'clear' | 'clearExclude' | 'gc' | 'rmExclude', arg?: string }, log?: T) {
    return this.request<T>(`config component.reglimiter ${params.subcommand} ${params.arg ?? ''}`, log);
  },

  config_authStdCore<T extends boolean>(this: This, params: { args: string[] }, log?: T) {
    return this.request<T>(`config auth.std.core ${params.args.join(' ')}`, log);
  }
} as const;