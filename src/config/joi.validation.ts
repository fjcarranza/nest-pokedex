import * as Joi from 'joi'; // Es asi por mas que se vea raro. 

export const JoiValidationSchema = Joi.object(
    {
        MONGODB: Joi.required(),
        PORT: Joi.number().default(3005),
        DEFAULT_LIMIT: Joi.number().default(6)
    }
)