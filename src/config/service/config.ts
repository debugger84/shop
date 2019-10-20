import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as Joi from '@hapi/joi';
import {ConnectionOptions} from 'typeorm';

export interface EnvConfig {
    [key: string]: string;
}

export class Config {
    private readonly envConfig: EnvConfig;

    constructor(filePath: string) {
        const config = dotenv.parse(fs.readFileSync(filePath));
        this.envConfig = this.validateInput(config);
    }

    /**
     * Ensures all needed variables are set, and returns the validated JavaScript object
     * including the applied default values.
     */
    private validateInput(envConfig: EnvConfig): EnvConfig {
        const envVarsSchema: Joi.ObjectSchema = Joi.object({
            NODE_ENV: Joi.string()
                .valid('development', 'production', 'test', 'provision')
                .default('development'),
            PORT: Joi.number().default(3000),
            DB_HOST: Joi.string().default('localhost'),
            DB_PORT: Joi.number().default(3306),
            DB_USER: Joi.string().required(),
            DB_PASSWORD: Joi.string().required(),
            DB_NAME: Joi.string().required(),
            APP_DEBUG: Joi.boolean().required(),
        });

        const { error, value: validatedEnvConfig } = envVarsSchema.validate(
            envConfig,
        );
        if (error) {
            throw new Error(`Config validation error: ${error.message}`);
        }
        return validatedEnvConfig;
    }

    public isProduction(): boolean {
        return this.envConfig.NODE_ENV === 'production';
    }

    public get defaultDbConfig(): ConnectionOptions {
        const path = __dirname + '/../../**/entity/*{.ts,.js}';
        const migrationsPath = __dirname + '/../../../migrations/*{.ts,.js}';
        return {
            name: 'default',
            type: 'postgres',
            host: this.envConfig.DB_HOST,
            port: Number(this.envConfig.DB_PORT),
            username: this.envConfig.DB_USER,
            password: this.envConfig.DB_PASSWORD,
            database: this.envConfig.DB_NAME,
            entities: [path],
            synchronize: false,
            migrationsRun: false,
            logging: Boolean(this.envConfig.APP_DEBUG),
            logger: 'file',

            // Allow both start:prod and start:dev to use migrations
            // __dirname is either dist or src folder, meaning either
            // the compiled js in prod or the ts in dev.
            migrations: [migrationsPath],
            cli: {
                // Location of migration should be inside src folder
                // to be compiled into dist/ folder.
                migrationsDir: 'migrations',
            },
        };
    }
}
