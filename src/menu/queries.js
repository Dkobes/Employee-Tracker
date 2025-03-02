import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const { Pool } = pkg;

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

export const getEmployees = async () => {
    const result = await pool.query('SELECT * FROM employee');
    return result.rows;
};

export const addEmployee = async (first_name, last_name, role_id, manager_id) => {
    const result = await pool.query(
        'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4) RETURNING *',
        [first_name, last_name, role_id, manager_id]
    );
    return result.rows[0];
};