import express from 'express';
import pkg from 'pg';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

dotenv.config();
const { Pool } = pkg;

const app = express();
const port = 3000;

app.use(bodyParser.json());

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

app.get('/employees', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM employee');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// // add new employee
// app.post('/employees', async (req, res) => {
//     const { first_name, last_name, role_id, manager_id } = req.body;
//     try {
//         const result = await pool.query(
//             'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4) RETURNING *',
//             [first_name, last_name, role_id, manager_id]
//         );
//         res.status(201).json(result.rows[0]);
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Server Error');
//     }
//  });

 app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
 })