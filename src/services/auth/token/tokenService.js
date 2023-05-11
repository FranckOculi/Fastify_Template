import Token from "../../../utils/Token.js";

export const TokenService = async (tokenObject) => {
    try {
        const token = tokenObject.replace('Bearer ', '');
    
        if (token) {
            const decodedToken = await Token.verifyToken(token)

            if(!decodedToken) return {error: 'Token not valid', status: 401}

            return {error: null, data: decodedToken}
        } else {
            return {error: 'Token required', status: 401}
        }
      } catch (err) {
        throw new Error('Unable to verify token');
      }
}
