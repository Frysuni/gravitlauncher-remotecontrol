import { GravitLauncherRemoteControlCore as This } from 'index';

/**
 * Category: basic - Base LaunchServer commands
 * Commands:
 * gc, debug, restart, loadmodule, clear, version, modules, help, stop, build
 */
export const basic = {
  /**
   * Garbage collector stat
   */
  gc<T extends boolean>(this: This, log?: T) {
    return this.request<T>('gc', log);
  },

  /**
   * Enable log level TRACE in LaunchServer
   */
  debug<T extends boolean>(this: This, params: { enable: boolean }, log?: T) {
    return this.request<T>(`debug ${params.enable}`, log);
  },

  /**
   * Restart LaunchServer
   */
  restart(this: This) {
    return this.request('restart', false);
  },

  /**
   * Module jar file
   */
  loadmodule<T extends boolean>(this: This, params: { jar: string }, log?: T) {
    return this.request<T>(`loadmodule ${params.jar}`, log);
  },

  /**
   * Clear terminal
   */
  clear(this: This) {
    return this.request('clear', false);
  },

  /**
   * Print LaunchServer version
   */
  version<T extends boolean>(this: This, log?: T) {
    return this.request<T>('version', log);
  },

  /**
   * get all modules
   */
  modules<T extends boolean>(this: This, log?: T) {
    return this.request<T>('modules', log);
  },

  /**
   * Print command usage
   */
  help<T extends boolean>(this: This, params: { command?: string }, log?: T) {
    return this.request<T>(`help ${params.command ?? ''}`, log);
  },

  /**
   * Stop LaunchServer
   */
  stop(this: This) {
    return this.request('stop', false);
  },

  /**
   * build launcher binaries
   */
  build<T extends boolean>(this: This, log?: T) {
    return this.request<T>('build', log);
  }
} as const;