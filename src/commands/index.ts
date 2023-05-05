import { basic } from './basic';
import { updates } from './updates';
import { service } from './service';
import { remoteControl as remoteControlModule } from './modules/remotecontrol';
import { fileauthsystem as fileauthsystemModule } from './modules/fileauthsystem';
import { fileauthsystem as fileauthsystemAuthProvider } from './authCoreProviders/fileauthsystem';

export const defaults = {
  basic, updates, service
};

export const modules = {
  fileauthsystem: fileauthsystemModule,
  remoteControl: remoteControlModule
};

export const authCoreProviders = {
  fileauthsystem: fileauthsystemAuthProvider
};