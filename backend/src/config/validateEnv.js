const validateEnv = () => {
  const requiredVars = ['MONGO_URI', 'JWT_SECRET'];
  const missingVars = requiredVars.filter((key) => !process.env[key]);

  if (missingVars.length > 0) {
    throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
  }

  if (!process.env.MONGO_URI.startsWith('mongodb')) {
    throw new Error('MONGO_URI must be a valid MongoDB connection string starting with mongodb or mongodb+srv');
  }
};

export default validateEnv;
