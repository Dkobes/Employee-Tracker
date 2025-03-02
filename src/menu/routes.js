import express from 'express';
import bodyParser from 'body-parser';
import { getEmployees, addEmployee } from './queries.js';

const router = express.Router();

router.use(bodyParser.json());

router.get('/employees', async (req, res) => {
    try {
        const employees = await getEmployees();
        res.json(employees);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

router.post('/employees', async (req, res) => {
    const { first_name, last_name, role_id, manager_id } = req.body;
    try {
        const newEmployee = await addEmployee(first_name, last_name, role_id, manager_id);
        res.status(201).json(newEmployee);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

export default router;