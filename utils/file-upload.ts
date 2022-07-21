import { Request } from 'express';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const multer = require('multer');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { v4: uuid } = require('uuid');

export interface TypeMime {
  [key: string]: any;
  'image/png': 'png';
  'image/jpeg': 'jpeg';
  'image/jpg': 'jpg';
}
const MIME_TYPE_MAP: TypeMime = {
  'image/png': 'png',
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpg',
};

export const fileUpload = multer({
  limits: 500000000,
  storage: multer.diskStorage({
    destination: (
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      req,
      file: Express.Multer.File,
      cb: (error: Error | null, filename: string) => void,
    ) => {
      cb(null, 'uploads/images');
    },

    filename: (
      req: Request,
      file: Express.Multer.File,
      cb: (error: Error | null, filename: string) => void,
    ) => {
      const ext = MIME_TYPE_MAP[file.mimetype];
      cb(null, uuid() + '.' + ext);
    },
  }),
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  fileFilter: (req, file, cb) => {
    const isValid = !!MIME_TYPE_MAP[file.mimetype];
    const error = isValid ? null : new Error('Invalid mime type!');
    cb(error, isValid);
  },
});
