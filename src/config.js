import {config} from 'dotenv';

config();

export const PORT = process.env.PORT || 3000;
export const USER = process.env.USER || 'root';
export const PASSWORD = process.env.PASSWORD || 'bfCm4n/BVD2t2FYU';
export const HOST = process.env.HOST || 'localhost';
export const DATABASE = process.env.DATABASE || 'pagina_tec';
export const DB_PORT = process.env.DB_PORT || '3306';
