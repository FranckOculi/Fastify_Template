// 'use strict';
import dotenv from 'dotenv'
dotenv.config()

const data = {
	env: process.env.NODE_ENV || 'development',
	server_port: parseInt(process.env.SERVER_PORT),
	app_url: process.env.APP_URL,
	sqlite_path: process.env.SQLITE_FILENAME,
	initial_admin_password: process.env.INITIAL_ADMIN_PASSWORD,
	initial_user_password: process.env.INITIAL_USER_PASSWORD,
	initial_admin_email: process.env.INITIAL_ADMIN_EMAIL,
}

export default data
