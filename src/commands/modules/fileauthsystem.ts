import { GravitLauncherRemoteControlCore as This } from 'index';

/**
 * Category: Base - FileAuthSystem module
 */
export const fileauthsystem = {
  /**
   * manage FileAuthSystem
   */
  fileauthsystem<T extends boolean>(this: This, params: { subcommand: 'install' }, log?: T) {
    return this.request<T>(`fileauthsystem ${params.subcommand}`, log);
  }
} as const;