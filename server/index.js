import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import AuthRouter from './Routes/AuthRoute.js';
import HomeRouter from './Routes/HomeRoute.js';
import dotenv from 'dotenv';
import './Config/DB.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.get('/ping', (req, res) => {
    res.send('PONG');
});

app.use(bodyParser.json());
app.use(cors());
app.use('/auth', AuthRouter);
app.use('/home', HomeRouter);


app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
