import 'primevue/resources/primevue.min.css';
import 'primevue/resources/themes/saga-blue/theme.css';
import 'primeflex/primeflex.css';

import * as PrimeVue from 'primevue/config';

import DefaultSettings from '@/Utils/Settings/DefaultSettings';
import { EventEmitter } from 'eventemitter3';
import { Logger } from 'ts-log';
import SettingsApp from '@/Utils/Settings/SettingsApp.vue';
import { SettingsType } from '@/Utils/Settings/SettingsType';
import Storage from '@/Utils/Storage';
import Vue from 'vue';
import VueLogger from '@/Utils/Settings/VueLogger';

type EventType = {
  newSettings: (settings: SettingsType) => void;
};
export type SettingsStorageType = Storage<{ settings: SettingsType }>;

export default class Settings {
  private readonly storage: SettingsStorageType;
  private readonly logger: Logger;
  private readonly eventEmitter = new EventEmitter<EventType>();

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
    Vue.use(VueLogger);

    const vue = new Vue({
      el: div,
      render: (h) => h(SettingsApp),
    }).$on('saveSettings', (settings: SettingsType) => {
      this.eventEmitter.emit('newSettings', settings);
      this.storeSettings(settings);
    });

    GM.registerMenuCommand('Settings ...', () => this.openSettingsDialog(vue));
    this.eventEmitter.emit('newSettings', DefaultSettings.merge(this.storage.get('settings')));

    return this;
  }

  /**
   * Allows to register a callback function no be notified when the settings were changed
   */
  public onNewSettings(callback: EventType['newSettings']): this {
    this.eventEmitter.on('newSettings', callback);
    return this;
  }

  private storeSettings(settings: SettingsType): void {
    this.logger.info('saving settings to storage', settings);
    this.storage.set('settings', settings, this.SETTINGS_SAVE_TIME_MS);
  }

  private openSettingsDialog(vue: Vue): void {
    this.logger.info('opening settings dialog ...');
    vue.$children[0].$data.showDialog = true;
    vue.$children[0].$data.injectSettings(this.storage.get('settings'));
  }
}
