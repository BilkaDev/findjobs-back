import {Request} from "express";

export interface AuthReq extends Request {
    userData: any
}