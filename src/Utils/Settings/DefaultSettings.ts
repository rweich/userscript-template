import { SettingsType } from '@/Utils/Settings/SettingsType';

export default class DefaultSettings {
  public static merge(payload: unknown): SettingsType {
    const settings: SettingsType = {
      enabled: true,
    };
    if (
      payload
      && (payload as Record<string, unknown>).hasOwnProperty('enabled')
      && !((payload as Record<string, unknown>).enabled as boolean)
    ) {
      settings.enabled = false;
    }

    return settings;
  }
}
