import './styles.scss';

import Settings from '@/Utils/Settings/Settings';
import Storage from '@/Utils/Storage';
import generateHeaders from '@/Header';
import logger from './Utils/Logger';

logger.info('hello world');

new Settings(
  new Storage(window.localStorage, `${generateHeaders(false).name || 'userscript'}-settings`),
  logger.getLogger('settings'),
)
  .onNewSettings((settings) => logger.info('is enabled:', settings.enabled))
  .registerDialog();
