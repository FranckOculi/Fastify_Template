import fastify from 'fastify';
import authRoutes from './src/routes/authRoutes.js';
import userRoutes from './src/routes/userRoutes.js';
import configuration from './src/config/configuration.js';

const app = fastify({
  logger: true,
});

// Routes managers
app.register(authRoutes, { prefix: '/auth' });
app.register(userRoutes, { prefix: '/user' });

// Run the server!
const start = async () => {
	try {
		await app.listen({ port: configuration.server_port })
	} catch (err) {
		app.log.error(err)
		process.exit(1)
	}
}
start()
