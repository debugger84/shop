import {Config} from './service/config';
import {ConfigFactory} from './service/config.factory';

const wholeConfig = ConfigFactory.createCurrentConfig();
const config = wholeConfig.defaultDbConfig;

export = config;
