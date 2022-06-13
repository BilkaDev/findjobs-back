import express, { json } from 'express';
import cors from 'cors';
import {handleError} from "./utils/errors";
import rateLimit from "express-rate-limit";
import 'express-async-errors';
import {adRouter} from "./routers/ad.router";
import {userRouter} from "./routers/user.router";

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
}));
app.use(json());
app.use(rateLimit({
    windowMs: 5* 60 * 1000,
    max: 100,
}))


// job because with ad name there may be a problem with the additive adBlock in browser.
app.use('/job', adRouter)
app.use('/user', userRouter)



app.use(handleError)

app.listen(3001,'0.0.0.0', ()=> {
    console.log('listening on http://localhost:3001')
});