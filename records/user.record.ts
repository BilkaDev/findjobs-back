import { HttpError, ValidationError } from '../utils/errors';
import { FieldPacket } from 'mysql2';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {
  LoginUserEntity,
  NewUserEntity,
  SimpleUserEntity,
  UserEntity,
  UserLoginRes,
} from '../types';
import { pool } from '../utils/db';
import { v4 as uuid } from 'uuid';

type userRecordResults = [UserRecord[], FieldPacket[]];

export class UserRecord implements UserEntity {
  id: string;
  email: string;
  password: string;
  name: string;
  token: string | null = null;

  constructor(obj: NewUserEntity | LoginUserEntity) {
    this.email = obj.email;
    this.name = obj.name;
    this.id = obj.id;
    this.password = obj.password;
  }

  private VALIDATION = (obj: NewUserEntity) => {
    if (!obj.name || obj.name.length > 30) {
      throw new ValidationError('Name cannot be blank or exceed 30 characters');
    }
    if (!obj.password || obj.password.length > 25 || obj.password.length < 6) {
      throw new ValidationError('invalid password');
    }

    if (!obj.email || obj.email.length > 100) {
      throw new ValidationError(
        'Email cannot be blank or exceed 100 characters',
      );
    }
  };

  static async getUser(uId: string): Promise<SimpleUserEntity> {
    const [results] = (await pool.execute(
      'SELECT * FROM `users` WHERE `id` = :id',
      {
        id: uId,
      },
    )) as userRecordResults;

    if (results.length === 0) {
      return null;
    } else {
      const { email, id, name } = results[0];
      return { email, id, name };
    }
  }

  async singup(): Promise<UserLoginRes> {
    this.VALIDATION(this);
    if (!this.id) {
      this.id = uuid();
    } else {
      throw new Error('Cannot insert something that  is already inserted');
    }
    const [existingUser] = (await pool.execute(
      'SELECT * FROM `users` WHERE `email` = :email ',
      {
        email: this.email,
      },
    )) as userRecordResults;
    if (existingUser.length !== 0) {
      throw new ValidationError('User exists already, please login instead');
    }

    try {
      this.password = await bcrypt.hash(this.password, 12);
    } catch (e) {
      throw new HttpError('Could not create user, please try again', 500);
    }

    try {
      await pool.execute(
        'INSERT INTO `users`(`id`,`name`, `email`, `password`) VALUES (:id,:name,:email,:password)',
        this,
      );
    } catch (e) {
      throw new HttpError('Creating a new user failed, please try again', 500);
    }
    try {
      this.token = jwt.sign(
        {
          userId: this.id,
          email: this.email,
        },
        'LASDFSAF@#ADSVS@#$@!@#$24',
        { expiresIn: '1h' },
      );
    } catch (e) {
      throw new HttpError('Creating a new user failed, please try again', 500);
    }
    return {
      email: this.email,
      name: this.name,
      id: this.id,
      token: this.token,
    };
  }
  async login(): Promise<UserLoginRes> {
    const [user] = (await pool.execute(
      'SELECT * FROM `users` WHERE `email` = :email ',
      {
        email: this.email,
      },
    )) as userRecordResults;
    if (user.length === 0) {
      throw new ValidationError('Invalid credentials, could not login');
    }

    let isValidPassword;
    try {
      isValidPassword = await bcrypt.compare(this.password, user[0].password);
    } catch (e) {
      throw new HttpError(
        'Could not log you in, please check your credentials and try again',
        500,
      );
    }

    if (!isValidPassword) {
      throw new ValidationError('Invalid credentials, could not login');
    }

    const { email, name, id } = user[0];

    try {
      this.token = jwt.sign(
        {
          userId: user[0].id,
          email: user[0].email,
        },
        'LASDFSAF@#ADSVS@#$@!@#$24',
        { expiresIn: '1h' },
      );
    } catch (e) {
      throw new HttpError('logging in failed, please try again', 500);
    }

    return { email, name, id, token: this.token };
  }
}
