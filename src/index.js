import express from 'express';
import router from './routes.js';
import dotenv from 'dotenv';

dotenv.config();


const app = express();
const port = 3000;

app.use(router);

 app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
 })