const joi = require("joi");

function userValidatorRegister(user) {
  const userValidationSchema = joi
    .object({
      name: joi.string().max(20).min(5).required(),
      email: joi.string().email().required(),
      password: joi.string().min(6).required(),
    })
    .options({ abortEarly: false });

  return userValidationSchema.validate(user);
}

function userValidatorLogin(user) {
  const userValidationSchema = joi
    .object({
      email: joi.string().email().required(),
      password: joi.string().min(6).required(),
    })
    .options({ abortEarly: false });

  return userValidationSchema.validate(user);
}

module.exports.userValidatorRegister = userValidatorRegister;
module.exports.userValidatorLogin = userValidatorLogin;
