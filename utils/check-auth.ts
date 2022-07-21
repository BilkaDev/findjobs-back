import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import { ValidationError } from './errors';
import { AuthReq } from '../types';

export = (req: AuthReq, res: Response, next: NextFunction) => {
  if (req.method === 'OPTIONS') {
    return next();
  }

  let token;
  try {
    token = req.headers.authorization.split(' ')[1];
    if (!token) {
      throw new Error('Authentication failed!');
    }
    const user = jwt.verify(token, 'LASDFSAF@#ADSVS@#$@!@#$24');
    req.userData = {
      user,
    };
    next();
  } catch (e) {
    throw new ValidationError('Authentication failed!');
  }
};
