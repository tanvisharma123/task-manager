import dotenv from 'dotenv';
import app from './app.js';
import connectDB from './config/db.js';
import validateEnv from './config/validateEnv.js';

dotenv.config();

validateEnv();

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await connectDB(process.env.MONGO_URI);
    const server = app.listen(PORT , '0.0.0.0', () => {
      console.log(`Server running on port ${PORT}`);
    });

    server.on('error', (error) => {
      if (error.code === 'EADDRINUSE') {
        console.error(`Startup failed: Port ${PORT} is already in use. Stop the existing process or use a different PORT.`);
      } else {
        console.error('Startup failed:', error.message);
      }
      process.exit(1);
    });
  } catch (error) {
    console.error('Startup failed:', error.message);
    process.exit(1);
  }
}

startServer();
