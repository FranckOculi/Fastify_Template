declare namespace NodeJS {
	export interface ProcessEnv {
		readonly SERVER_PORT: string
		readonly TOKEN_SECRET: string
		readonly APP_URL: string
		readonly SQLITE_FILENAME: string
		readonly SQLITE_FILENAME_MIGRATIONS: string
		readonly INITIAL_ADMIN_PASSWORD: string
		readonly INITIAL_USER_PASSWORD: string
		readonly INITIAL_ADMIN_EMAIL: string
		readonly MAIL_HOST: string
		readonly MAIL_PORT: string
		readonly MAIL_USER: string
		readonly MAIL_PASSWORD: string
	}
}
