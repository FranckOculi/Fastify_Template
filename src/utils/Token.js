import configuration from '../config/configuration.js'
import jwt from 'jsonwebtoken'
export default class Token {
	constructor() {}

	static options = {
		expiresIn: '1d',
	}

	static createToken = (data, expiresIn = null) => {
		if (expiresIn) this.options.expiresIn = expiresIn

		const token = jwt.sign(data, configuration.token_secret, this.options)
		return token
	}
}
