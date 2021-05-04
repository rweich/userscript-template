import 'primevue/resources/primevue.min.css';
import 'primevue/resources/themes/saga-blue/theme.css';

import * as PrimeVue from 'primevue/config';

import { EventEmitter } from 'eventemitter3';
import { Logger } from 'ts-log';
import SettingsApp from '@/Utils/Settings/SettingsApp.vue';
import { SettingsType } from '@/Utils/Settings/SettingsType';
import Vue from 'vue';
import VueLogger from '@/Utils/Settings/VueLogger';

type EventType = {
  saveSettings: (settings: SettingsType) => void;
};

export default class Settings {
  private readonly logger: Logger;
  private readonly eventEmitter = new EventEmitter<EventType>();

  constructor(logger: Logger) {
    this.logger = logger;
  }

  /**
   * Creates and registers the settings dialog to the userscript menu
   */
  public register(): this {
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
    }).$on('saveSettings', (settings: SettingsType) => this.eventEmitter.emit('saveSettings', settings));

    GM.registerMenuCommand('Settings ...', () => {
      this.logger.info('opening settings dialog ...');
      vue.$children[0].$data.showDialog = true;
    });

    return this;
  }

  /**
   * Allows to register a callback function no be notified when the settings were changed
   * @param callback
   */
  public onSave(callback: (settings: SettingsType) => void): void {
    this.eventEmitter.on('saveSettings', callback);
  }
}
