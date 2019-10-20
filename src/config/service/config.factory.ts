import {Config} from './config';

export class ConfigFactory {

    public static createCurrentConfig(): Config {
        return this.createConfig(process.env.NODE_ENV);
    }

    public static createConfig(nodeEnv: string): Config {
        const filePath = `${nodeEnv || 'development'}.env`;
        return new Config(filePath);
    }
}
