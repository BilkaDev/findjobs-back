import express, {json, Router} from 'express';
import cors from 'cors';
import {handleError} from "./utils/errors";
import rateLimit from "express-rate-limit";
import 'express-async-errors';
import {adRouter} from "./routers/ad.router";
import {userRouter} from "./routers/user.router";
import path from "path";


const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
}));

app.use(json({limit: '0.25mb'}));
app.use('/uploads/images', express.static(path.join('uploads', 'images')));

app.use(rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 100,
}));

const router = Router();
// job because with ad name there may be a problem with the additive adBlock in browser.
router.use('/job', adRouter);
router.use('/user', userRouter);
app.use('/api')


app.use(handleError);

app.listen(3001, '0.0.0.0', () => {
    console.log('listening on http://localhost:3001');
});