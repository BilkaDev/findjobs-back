import express, { json } from 'express';
import cors from 'cors';
import {handleError} from "./utils/errors";

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
}));
app.use(json());



// ROUTES




app.use(handleError)

app.listen(3001,'0.0.0.0', ()=> {
    console.log('listening on http://localhost:3001')
});