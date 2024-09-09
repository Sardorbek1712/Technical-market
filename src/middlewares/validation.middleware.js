import { BadRequestException } from "../exceptions/bad-request.exception.js";

export const ValidationMiddleware = (schema) => {
  return (req, _, next) => {
    const { error, __ } = schema.validate(req.body);

    if (error) throw new BadRequestException(error.message);

    next();
  };
};

const sendDublicateFieldException = (err) => {
  const error = { ...err };

  if (error.code != 11000) {
    return error;
  }

  error.name = "Validation Error";
  error.message = `Given value "${Object.values(error.keyValue).join(
    " "
  )}" for "${Object.keys(error.keyValue).join(
    " "
  )}" is already exists. Try another one!`;
  error.statusCode = 400;
  error.isException = true;

  return error;
};
