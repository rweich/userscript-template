import 'primevue/resources/primevue.min.css';
import 'primevue/resources/themes/saga-blue/theme.css';
import 'primeflex/primeflex.css';

import { EventEmitter } from 'eventemitter3';
import * as PrimeVue from 'primevue/config';
import { Logger } from 'ts-log';
import Vue from 'vue';

import DefaultSettings from '@/Utils/Settings/DefaultSettings';
import SettingsApp from '@/Utils/Settings/SettingsApp.vue';
import { SettingsType } from '@/Utils/Settings/SettingsType';
import Storage from '@/Utils/Storage';

export type SettingsEventType = {
  newSettings: (settings: SettingsType) => void;
  openDialog: (settings: SettingsType) => void;
};
export type SettingsStorageType = Storage<{ settings: SettingsType }>;

export default class Settings {
  private readonly storage: SettingsStorageType;
  private readonly logger: Logger;
  private readonly eventEmitter = new EventEmitter<SettingsEventType>();

  private readonly SETTINGS_SAVE_TIME_MS = 365 * 24 * 60 * 60 * 1000;

  constructor(storage: SettingsStorageType, logger: Logger) {
    this.storage = storage;
    this.logger = logger;
  }

  /**
   * Creates and registers the settings dialog to the userscript menu
   */
  public registerDialog(): this {
    const div = document.createElement('div');
    div.id = 'userscript-settings-container';
    const body = document.querySelector('body');
    body?.append(div);
    this.logger.info(body, document.querySelector('#userscript-settings-container'));

    Vue.use(PrimeVue);

    new Vue({
      el: div,
      provide: {
        eventEmitter: this.eventEmitter,
        logger: this.logger,
      },
      render: (h) => h(SettingsApp),
    });

    GM.registerMenuCommand('Settings ...', () =>
      this.eventEmitter.emit('openDialog', this.storage.get('settings') as SettingsType),
    );
    this.eventEmitter.emit('newSettings', DefaultSettings.merge(this.storage.get('settings')));
    this.eventEmitter.on('newSettings', (settings) => this.storeSettings(settings));

    return this;
  }

  /**
   * Allows to register a callback function no be notified when the settings were changed
   */
  public onNewSettings(callback: SettingsEventType['newSettings']): this {
    this.eventEmitter.on('newSettings', callback);
    return this;
  }

  private storeSettings(settings: SettingsType): void {
    this.logger.info('saving settings to storage', settings);
    this.storage.set('settings', settings, this.SETTINGS_SAVE_TIME_MS);
  }
}
