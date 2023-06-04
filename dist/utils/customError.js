"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = void 0;
class CustomError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.name = "ERROR";
        this.statusCode = statusCode;
    }
}
exports.CustomError = CustomError;
