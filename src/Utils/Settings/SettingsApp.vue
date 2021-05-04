<template>
  <div class="settingsapp">
    <Dialog header="Settings" :visible.sync="showDialog" :modal="true">
      <div class="p-formgroup-inline">
        <div class="p-field">
          <h3>Enable:</h3>
          <InputSwitch v-model="enabled" />
        </div>
      </div>

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
import Dialog from 'primevue/dialog/Dialog';
import InputSwitch from 'primevue/inputswitch/InputSwitch';

@Component({
  components: {
    Button,
    Dialog,
    InputSwitch
  }
})
export default class SettingsApp extends Vue {
  showDialog = false;

  // settings data
  enabled = true;

  public save(): void {
    this.$logger.info('saving settings ...');
    this.showDialog = false;
    this.$root.$emit('saveSettings', {
      enabled: this.enabled
    });
  }
}
</script>
