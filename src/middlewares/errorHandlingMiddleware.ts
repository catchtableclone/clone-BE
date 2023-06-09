import { Request, Response, NextFunction } from "express";
import { CustomError } from "../utils/customError";

export const globalErrorHandler = (err: CustomError, _: Request, res: Response, __: NextFunction): Response => {
	err.statusCode = err.statusCode || 500;
	
	return res.status(err.statusCode).json({ message: err.message });
};

export const catchAsync = (func: Function) => {
	return (req: Request, res: Response, next: NextFunction) => {
		func(req, res, next).catch((err: Error) => next(err));
	}
}
