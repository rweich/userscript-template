import { Logger } from 'ts-log';

declare module 'vue/types/vue' {
  interface Vue {
    $logger: Logger;
  }
}
