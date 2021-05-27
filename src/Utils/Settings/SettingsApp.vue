<template>
  <div class="settingsapp">
    <Dialog header="Settings" :visible.sync="showDialog" :modal="true" :style="{ width: '25vw' }">
      <Fieldset legend="Misc" class="p-mt-5">
        <div class="p-grid p-align-center p-mt-2 p-mx-2">
          <div class="p-col p-grid p-align-center">
            <label for="enabled" class="p-mr-2">Enable Userscript:</label>
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

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Button from 'primevue/button/Button';
import DefaultSettings from "@/Utils/Settings/DefaultSettings";
import Dialog from 'primevue/dialog/Dialog';
import Fieldset from 'primevue/fieldset/Fieldset';
import InputSwitch from 'primevue/inputswitch/InputSwitch';
import {SettingsType} from "@/Utils/Settings/SettingsType";

@Component({
  components: {
    Button,
    Dialog,
    Fieldset,
    InputSwitch
  }
})
export default class SettingsApp extends Vue {
  showDialog = false;

  // settings data
  enabled = true;

  // prop for easy external settings injection
  injectSettings = (settings?: Partial<SettingsType>): void => this.loadSettings(settings);

  public save(): void {
    this.$logger.info('saving settings ...');
    this.showDialog = false;
    const settings: SettingsType = {
      enabled: this.enabled
    };
    this.$root.$emit('saveSettings', settings);
  }

  private loadSettings(payload?: Partial<SettingsType>): void {
    const settings = DefaultSettings.merge(payload);
    this.$logger.info('loading settings ...', settings);
    this.enabled = settings.enabled;
  }
}
</script>
