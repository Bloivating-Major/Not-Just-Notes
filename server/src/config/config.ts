import dotEnv from 'dotenv';
dotEnv.config();

interface Config{
    PORT : string | number,
    MONGO_URL : string,
    JWT_SECRET : string,
    JWT_EXPIRE : string | number,
}

function getEnvVar(key : string) : string{
    const value = process.env[key];
    if(!value){
        throw new Error(`Missing key ${key} in .env file`);
    }
    return value;
} 

const _config = {
    PORT : process.env.PORT || 3000,
    MONGO_URL : getEnvVar("MONGO_URL"),
    JWT_SECRET : getEnvVar("JWT_SECRET"),
    JWT_EXPIRE : getEnvVar("JWT_EXPIRE"),
};

const config : Readonly<Config> = Object.freeze(_config);

export default config; 