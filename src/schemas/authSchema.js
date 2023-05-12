const bodyJsonSchemaSignUp = {
  type: 'object',
  required: ['displayName', 'email', 'password'],
  properties: {
    displayName: { type: 'string', minLength: 5, maxLength: 25 },
    email: { type: 'string', maxLength: 50 },
    password: { type: 'string', maxLength: 50 },
  },
};

const bodyJsonSchemaLogin = {
  type: 'object',
  required: ['email', 'password'],
  properties: {
    email: { type: 'string', maxLength: 50 },
    password: { type: 'string', maxLength: 50 },
  },
};

export const signUpUserSchema = {
  body: bodyJsonSchemaSignUp,
};

export const loginUserSchema = {
  body: bodyJsonSchemaLogin,
};
