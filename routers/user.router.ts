import {Router} from "express";
import {UserRecord} from "../records/user.record";
import {HtmlError} from "../utils/errors";
import {LoginUserEntity, NewUserEntity} from "../types/user-entity";

export const userRouter = Router();

userRouter
    .get('/:id', async (req, res) => {
        const user = await UserRecord.getUser(req.params.id);
        if (!user) {
            throw new HtmlError('Cannot find user.', 404);
        }
        res.json({
            user,
        });
    })
    .post('/login', async (req, res) => {
        const {email, password} = req.body;
        const user = new UserRecord({email, password} as LoginUserEntity);
        const login = await user.login();
        res.json(
            login
        );

    })
    .post('/singup', async (req, res) => {
        const user = new UserRecord(req.body as NewUserEntity);
        await user.singup();
        const {id, email, name} = user;

        res.status(201)
            .json({
                user: {id, email, name}
            });
    });
