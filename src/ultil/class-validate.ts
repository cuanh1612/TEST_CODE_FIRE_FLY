import { ClassConstructor, plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { baseError } from "./base-error";

export const validatePlainToClass = async (
  plainCode: any,
  classCheck: ClassConstructor<unknown>
) => {
  const validErrors: any[] = [];
  //convert plain to class
  const dataCheck = plainToClass(classCheck, plainCode);

  //check validate
  await validate(dataCheck as object).then((errors) => {
    // errors is an array of validation errors map and push value errors
    if (errors.length > 0) {
      errors.map((error) => {
        if (error.constraints) {
          Object.values(error.constraints).map((constraint) =>
            validErrors.push(constraint)
          );
        }
      });
    }
  });

  if (validErrors.length > 0) {
    throw baseError({
      message: `${validErrors.toString()}`,
      statusCode: 400,
    });
  }

  return;
};
