import Settings from '@/Utils/Settings/Settings';
import logger from './Utils/Logger';

logger.info('hello world');

new Settings(logger.getLogger('settings'))
  .register()
  .onSave((settings) => logger.info('is enabled:', settings.enabled));
