import pkg from 'pg';
import dotenv from 'dotenv';
dotenv.config({ path: '../.env' }); // This will load your .env file into process.env

const { Pool } = pkg;
console.log(process.env.DB_USER);  // Should log your username
console.log(process.env.DB_PASSWORD);  // Should log your password

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

// Handle connection events
pool.on('connect', () => {
    console.log('Connected to the database.');
});

pool.on('error', (err) => {
    console.error('Unexpected error on idle database client:', err);
    process.exit(-1);
});

export const db = pool;

