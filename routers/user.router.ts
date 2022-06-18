import {Router} from "express";
import {UserRecord} from "../records/user.record";
import {HttpError} from "../utils/errors";
import {LoginUserEntity, NewUserEntity} from "../types";

export const userRouter = Router();

userRouter
    .get('/:id', async (req, res) => {
        const user = await UserRecord.getUser(req.params.id);
        if (!user) {
            throw new HttpError('Cannot find user.', 404);
        }
        res.json({
            user,
        });
    })
    .post('/login', async (req, res) => {
        console.log("adsfasdfsadfsdfsdf",req.body);
        const {email, password} = req.body;
        const user  = new UserRecord({email, password} as LoginUserEntity);
        const login  = await user.login();
        res.json(
            login
        );

    })
    .post('/singup', async (req, res) => {
        const user = new UserRecord(req.body as NewUserEntity);
        await user.singup();
        const {id, email, name, token} = user;

        res.status(201)
            .json({
                user: {id, email, name, token}
            });
    });
