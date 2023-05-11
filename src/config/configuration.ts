// 'use strict';
import dotenv from 'dotenv';
dotenv.config();

const data = {
  env: process.env.NODE_ENV || 'development',
	jwt_secret: process.env.JWT_SECRET,
	server_port: parseInt(process.env.SERVER_PORT),
	sqlite_path: process.env.SQLITE_FILENAME,
	initial_admin_password: process.env.INITIAL_ADMIN_PASSWORD,
	initial_admin_email: process.env.INITIAL_ADMIN_EMAIL,
};

export default data;
