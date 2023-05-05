import { GravitLauncherRemoteControlCore as This } from 'index';

/**
 * AuthCoreProvider - FileAuthSystem
 */
export const fileauthsystem = {
  /**
   * update cloak for user
   */
  config_authStdCore_updatecloak<T extends boolean>(this: This, params: { username: string, urlOrPath?: string }, log?: T) {
    return this.request<T>(`config auth.std.core updatecloak ${params.username} ${params.urlOrPath ?? ''}`, log);
  },

  /**
   * Reload database
   */
  config_authStdCore_reload<T extends boolean>(this: This, log?: T) {
    return this.request<T>('config auth.std.core reload', log);
  },

  /**
   * Test auth
   */
  config_authStdCore_auth<T extends boolean>(this: This, params: { login: string, jsonOrPlainPasswordData?: string }, log?: T) {
    return this.request<T>(`config auth.std.core auth ${params.login} ${params.jsonOrPlainPasswordData ?? ''}`, log);
  },

  /**
   * add user permission
   */
  config_authStdCore_addpermission<T extends boolean>(this: This, params: { username: string, permission: string }, log?: T) {
    return this.request<T>(`config auth.std.core addpermission ${params.username} ${params.permission}`, log);
  },

  /**
   * remove user permission
   */
  config_authStdCore_removepermission<T extends boolean>(this: This, params: { username: string, permission: string }, log?: T) {
    return this.request<T>(`config auth.std.core removepermission ${params.username} ${params.permission}`, log);
  },

  /**
   * get user by uuid
   */
  config_authStdCore_getuserbyuuid<T extends boolean>(this: This, params: { uuid: string }, log?: T) {
    return this.request<T>(`config auth.std.core getuserbyuuid ${params.uuid}`, log);
  },

  /**
   * Convert 5.2.2 and lower base64 sha256 passwords
   */
  config_authStdCore_xconvertpassword<T extends boolean>(this: This, params: { args?: string[] }, log?: T) {
    return this.request<T>(`config auth.std.core xconvertpassword ${(params.args ?? []).join(' ')}`, log);
  },

  /**
   * Save database
   */
  config_authStdCore_save<T extends boolean>(this: This, log?: T) {
    return this.request<T>('config auth.std.core save', log);
  },

  /**
   * get user by username
   */
  config_authStdCore_getuserbyusername<T extends boolean>(this: This, params: { username: string }, log?: T) {
    return this.request<T>(`config auth.std.core getuserbyusername ${params.username}`, log);
  },

  /**
   * update skin for user
   */
  config_authStdCore_updateskin<T extends boolean>(this: This, params: { username: string, slim: boolean, urlOrPath?: string }, log?: T) {
    return this.request<T>(`config auth.std.core updateskin ${params.username} ${params.slim} ${params.urlOrPath ?? ''}`, log);
  },

  /**
   * Register new user
   */
  config_authStdCore_register<T extends boolean>(this: This, params: { username: string, email: string, plainOrJsonPassword: string, jsonArgs?: string[] }, log?: T) {
    return this.request<T>(`config auth.std.core register ${params.username} ${params.email} ${params.plainOrJsonPassword} ${(params.jsonArgs ?? []).join(' ')}`, log);
  },

  /**
   * Change user password
   */
  config_authStdCore_changePassword<T extends boolean>(this: This, params: { username: string, newPassword: string }, log?: T) {
    return this.request<T>(`config auth.std.core changePassword ${params.username} ${params.newPassword}`, log);
  }
} as const;