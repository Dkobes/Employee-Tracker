import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const { Pool } = pkg;

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: 5432
});

const connectToDatabase = async () => {
    try {
        await pool.connect();
        console.log('Connect to database successfully.');
    } catch (err) {
        console.error('Error connecting to database.', err);
    }
}; 

connectToDatabase();
export default pool;