import { TokenService } from '../services/auth/token/tokenService.js';

export const tokenVerification = async (req, res) => {
  const {error, status, data} = await TokenService(req.headers.authorization)

  if(error) return res.code(status).send({ message: error });

  req.headers.tokenInfo = {
    authorization: {id: data.id, access: data.access},
  };
  
  return
}
