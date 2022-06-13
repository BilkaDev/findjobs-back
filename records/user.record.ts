import {ValidationError} from "../utils/errors";
import {FieldPacket} from "mysql2";
import {LoginUserEntity, NewUserEntity, SimpleUserEntity, UserEntity} from "../types/user-entity";
import {pool} from "../utils/db";
import {v4 as uuid} from "uuid";


type userRecordResults = [UserRecord[], FieldPacket[]];

export class UserRecord implements UserEntity {
    id: string;
    email: string;
    password: string;
    name: string;
    constructor(obj: (NewUserEntity | LoginUserEntity)) {
        this.email = obj.email;
        this.name = obj.name;
        this.id = obj.id;
        this.password = obj.password;
    }

    private VALIDATION = (obj: NewUserEntity) => {
        if (!obj.name || obj.name.length > 30) {
            throw new ValidationError("Name cannot be blank or exceed 30 characters");
        }
        if (!obj.password || obj.password.length > 25 || obj.password.length < 6) {
            throw new ValidationError("invalid password");
        }

        if (!obj.email || obj.email.length > 100) {
            throw new ValidationError("Email cannot be blank or exceed 100 characters");
        }

    };

    static async getUser(uId: string): Promise<SimpleUserEntity> {
        const [results] = await pool.execute("SELECT * FROM `users` WHERE `id` = :id", {
            id: uId,
        }) as userRecordResults;

        if (results.length === 0) {
            return null;
        } else {
            const {
                email,
                id,
                name,
            } = results[0];
            return {email, id, name};
        }

    }

    async singup(): Promise<void> {
        this.VALIDATION(this);
        if (!this.id) {
            this.id = uuid();
        } else {
            throw new Error('Cannot insert something that  is already inserted');
        }
        const [existingUser] = await pool.execute("SELECT * FROM `users` WHERE `email` = :email ", {
            email: this.email,
        }) as userRecordResults;
        if (existingUser.length !== 0) {
            throw new ValidationError("User exists already, please login instead");
        }

        await pool.execute("INSERT INTO `findjobs`.`users`(`id`,`name`, `email`, `password`) VALUES (:id,:name,:email,:password)", this);
    }

    async login(): Promise<SimpleUserEntity> {
        const [user] = await pool.execute("SELECT * FROM `users` WHERE `email` = :email ", {
            email: this.email,
        }) as userRecordResults;
        if (user.length === 0) {
            throw new ValidationError("Invalid credentials, could not login");
        }
        if (user[0].password !== this.password) {
            throw new ValidationError("Invalid credentials, could not login");
        }

        const {email, name, id} = user[0];

        return {email, name, id};
    }


}