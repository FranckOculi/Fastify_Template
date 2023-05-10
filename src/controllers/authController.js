import { registerUser } from '../services/auth/register/registerService.js';
import { loginService } from '../services/auth/login/loginService.js';

export const signUp = async (req, res) => {
    const { error, status, data } = await registerUser({
      teamId: req.body.teamId,
      displayName: req.body.displayName,
      email: req.body.email,
      password: req.body.password,
      access: req.body.access,
      phone: req.body.phone,
    })

    if (error) return res.code(status).send({ message: error });
    
    return res.code(201).send({ 
      message: 'User added !',
      data
    });

}

export const login = async (req, res) => {
  const {error, status, data } = await loginService({
    email: req.body.email, 
    password: req.body.password
  })

  if (error) return res.code(status).send({ message: error });

  return res.code(200).send({
    message: 'Authenticate with success !',
    data
});
}

export const requireAuth = async (req, res) => {
  const {error, status, data} = await TokenService(req.headers.authorization)

  if(error) return res.code(status).send({ message: error });

  return res.code(200).send({
    message: 'Authenticate with success !',
    data,
  });
}
