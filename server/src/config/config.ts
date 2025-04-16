import dotEnv from 'dotenv';
dotEnv.config();

interface Config{
    PORT : string | number,
    MONGO_URL : string,
    JWT_SECRET : string
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
};

const config : Readonly<Config> = Object.freeze(_config);

export default config; 