import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import compression from 'compression';
import mongoose from 'mongoose';
import router from './router';
import { configDotenv } from 'dotenv';

configDotenv();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    credentials: true,
}));
app.use(compression());

const server = http.createServer(app);

server.listen(3000, () => {
    console.log('Server listening on port 3000');
});

mongoose.Promise = Promise;
mongoose.connect(process.env.MONGO_URL);
mongoose.connection.on('error', (error: Error) => {
    console.error(error);
    throw new Error(`unable to connect to database: ${process.env.MONGO_URL}`);
});

app.use('/', router());