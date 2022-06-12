import {ValidationError} from "../utils/errors";
import {FieldPacket} from "mysql2";
import {NewUserEntity, UserEntity} from "../types/user-entity";


type userRecordResults = [UserRecord[], FieldPacket[]];

export class UserRecord implements UserEntity {
    id: string;
    email: string;
    password: string;
    name: string;

    constructor(obj: NewUserEntity) {
        this.VALIDATION(obj);
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




}