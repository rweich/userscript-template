<template>
  <div class="settingsapp">
    <Dialog header="Settings" :visible.sync="showDialog" :modal="true" :style="{ width: '25vw' }">
      <Fieldset legend="Misc" class="p-mt-5">
        <div class="p-grid p-align-center p-mt-2 p-mx-2">
          <div class="p-col p-grid p-align-center">
            <label for="enabled" class="p-mr-2 p-col-4">Enable Userscript:</label>
            <InputSwitch id="enabled" v-model="enabled" />
          </div>
        </div>
      </Fieldset>

      <template #footer>
        <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="showDialog = false" />
        <Button label="Save" icon="pi pi-check" @click="save()" />
      </template>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { default as EventEmitter } from 'eventemitter3';
import Button from 'primevue/button/Button';
import Dialog from 'primevue/dialog/Dialog';
import Fieldset from 'primevue/fieldset/Fieldset';
import InputSwitch from 'primevue/inputswitch/InputSwitch';
import { Logger } from 'ts-log';
import { inject, ref } from 'vue';

import DefaultSettings from '@/Utils/Settings/DefaultSettings';
import { SettingsEventType } from '@/Utils/Settings/Settings';
import { SettingsType } from '@/Utils/Settings/SettingsType';

let showDialog = ref(false);
let enabled = ref(true);

const eventEmitter = inject<EventEmitter<SettingsEventType>>('eventEmitter');
eventEmitter?.on('openDialog', (settings) => {
  showDialog.value = true;
  loadSettings(settings);
});
const logger = inject<Logger>('logger');

function save(): void {
  logger?.info('saving settings ...');
  showDialog.value = false;
  const settings: SettingsType = {
    enabled: enabled.value,
  };
  eventEmitter?.emit('newSettings', settings);
}

function loadSettings(payload?: Partial<SettingsType>): void {
  const settings = DefaultSettings.merge(payload);
  logger?.info('loading settings ...', settings);
  enabled.value = settings.enabled;
}
</script>
