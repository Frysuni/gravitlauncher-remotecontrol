import { GravitLauncherRemoteControlCore as This } from 'index';

/**
 * Category: updates - Update and Sync Management
 * Commands:
 * makeprofile, downloadclient, syncprofiles, downloadasset, unindexasset, syncup, syncbinaries, saveprofile, indexasset, syncupdates
 */
export const updates = {
  /**
   * make profile for any minecraft versions
   */
  makeprofile<T extends boolean>(this: This, params: { name: string, minecraftVersion: string, dir: string }, log?: T) {
    return this.request<T>(`makeprofile ${params.name} ${params.minecraftVersion} ${params.dir}`, log);
  },

  /**
   * Download client dir
   */
  downloadclient<T extends boolean>(this: This, params: { version: string, dir: string, from?: 'mirror' | 'generate' }, log?: T) {
    return this.request<T>(`downloadclient ${params.version} ${params.dir} ${params.from ?? ''}`, log);
  },

  /**
   * Resync profiles dir
   */
  syncprofiles<T extends boolean>(this: This, log?: T) {
    return this.request<T>('syncprofiles', log);
  },

  /**
   * Download asset dir
   */
  downloadasset<T extends boolean>(this: This, params: { version: string, dir: string, from?: 'mirror' | 'mojang' }, log?: T) {
    return this.request<T>(`downloadasset ${params.version} ${params.dir} ${params.from ?? ''}`, log);
  },

  /**
   * Unindex asset dir (1.7.10+)
   */
  unindexasset<T extends boolean>(this: This, params: { dir: string, index: string, outputDir: string }, log?: T) {
    return this.request<T>('unindexasset', log);
  },

  /**
   * Resync profiles & updates dirs
   */
  syncup<T extends boolean>(this: This, log?: T) {
    return this.request<T>('syncup', log);
  },

  /**
   * Resync launcher binaries
   */
  syncbinaries<T extends boolean>(this: This, log?: T) {
    return this.request<T>('syncbinaries', log);
  },

  /**
   * load and save profile
   */
  saveprofiles<T extends boolean>(this: This, params: { profileNames: string[] }, log?: T) {
    return this.request<T>(`saveprofiles ${params.profileNames.join(' ')}`, log);
  },

  /**
   * index asset dir (1.7.10+)
   */
  indexasset<T extends boolean>(this: This, params: { dir: string, index: string, outputDir: string }, log?: T) {
    return this.request<T>(`indexasset ${params.dir} ${params.index} ${params.outputDir}`, log);
  },

  /**
   * Resync updates dir
   */
  syncupdates<T extends boolean>(this: This, params: { subdirs?: string[] }, log?: T) {
    return this.request<T>(`syncupdates ${(params.subdirs ?? []).join(' ')}`, log);
  }
} as const;