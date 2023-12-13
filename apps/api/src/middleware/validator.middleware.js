import { validationResult } from "express-validator";

export const validator = (validations) => {
    return async (req, res, next) => {
        for (let validation of validations){
            const result = await validation.run(req);
            if(result.errors.length) break;
        }

        const errors = validationResult(req);
        if (errors.isEmpty()){
            return next();
        }

        return res.status(400).json({errors: errors.array()});
    };
};