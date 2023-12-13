import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

const validateRequest = (schema: AnyZodObject) => {

    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            // Validations
            //if everything is is okay, then we will call next() ->
            await schema.parseAsync({
                body: req.body
            });


            next();
        } catch (err) {
            next(err);
        }
    }
};


export default validateRequest;




