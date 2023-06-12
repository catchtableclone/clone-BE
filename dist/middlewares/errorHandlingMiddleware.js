"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.catchAsync = exports.globalErrorHandler = void 0;
const globalErrorHandler = (err, _, res, __) => {
    err.statusCode = err.statusCode || 500;
    return res.status(err.statusCode).json({ message: err.message });
};
exports.globalErrorHandler = globalErrorHandler;
const catchAsync = (func) => {
    return (req, res, next) => {
        func(req, res, next).catch((err) => next(err));
    };
};
exports.catchAsync = catchAsync;
