import bcrypt from 'bcrypt';

import { findByEmail } from "../../../repositories/userRepository.js";
import Token from '../../../utils/Token.js';

export const loginService = async (data) => {
    try {
        const user = await findByEmail(data.email, [
          'id',
          'teamId',
          'email',
          'password',
          'access',
        ])

        if (!user)
		    return { error: "That email and password combination is incorrect", status: 401 }
    
        const isValidPassword = await bcrypt.compare(
          data.password,
          user.password,
        );

        if(!isValidPassword) return { error: "That email and password combination is incorrect", status: 401 }

        const token = Token.createToken({id: user.id, email: user.email, access: user.access});

        return {
          error: null, data: {
            user: user.id,
            token,
          }}

      } catch (err) {
		throw new Error('Unable to complete signin');
	}
}
