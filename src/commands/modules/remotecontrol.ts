import { GravitLauncherRemoteControlCore as This } from 'index';

/**
 * Category: Base - RemoteControl module
 */
export const remoteControl = {
  /**
   * Manage RemoteControl module
   */
  remotecontrol<T extends boolean>(this: This, params: { subcommand: 'new' | 'reload' | 'revoke' | 'list' | 'enabled', args?: string[] }, log?: T) {
    return this.request<T>(`remotecontrol ${params.subcommand} ${(params.args ?? []).join(' ')}`, log);
  },

  /**
   * add new token
   */
  remotecontrol_new<T extends boolean>(this: This, params: { allowAll: boolean, startWithMode: boolean, commands: string[] }, log?: T) {
    return this.request<T>(`remotecontrol new ${params.allowAll} ${params.startWithMode} ${params.commands.join(' ')}`, log);
  },

  /**
   * reload config
   */
  remotecontrol_reload<T extends boolean>(this: This, log?: T) {
    return this.request<T>('remotecontrol reload', log);
  },

  /**
   * revoke token
   */
  remotecontrol_revoke<T extends boolean>(this: This, params: { token: string }, log?: T) {
    return this.request<T>(`remotecontrol revoke ${params.token}`, log);
  },

  remotecontrol_list<T extends boolean>(this: This, log?: T) {
    return this.request<T>('remotecontrol list', log);
  },

  /**
   * enable or disable RemoteControl module
   */
  remotecontrol_enabled<T extends boolean>(this: This, params: { enable: boolean }, log?: T) {
    return this.request<T>(`remotecontrol enabled ${params.enable}`, log);
  }
} as const;