import { default as logger } from 'loglevel';
import { apply, reg } from 'loglevel-plugin-prefix';

import header from '../Header';

reg(logger);
apply(logger, { template: `[%t] [${header(false).name}] %l (%n):` });
logger.enableAll();

export { default } from 'loglevel';
