import { Module } from '@nestjs/common';
import { Config } from './service/config';
import {ConfigFactory} from './service/config.factory';

@Module({
    providers: [
        {
            provide: Config,
            useValue: ConfigFactory.createCurrentConfig(),
        },
    ],
    exports: [Config],
})
export class ConfigModule {}
