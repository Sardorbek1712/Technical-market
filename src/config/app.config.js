import { config } from "dotenv";

config();


export const appConfig = {
  port: parseInt(process.env.APP_PORT) || 4000,
  host: process.env.APP_HOST,
};

