import { apply, reg } from 'loglevel-plugin-prefix';

import header from '../Header';
import { default as logger } from 'loglevel';

reg(logger);
apply(logger, { template: `[%t] [${header.name}] %l (%n):` });
logger.enableAll();

export default logger;
