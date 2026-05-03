import mongoose from 'mongoose';

const connectDB = async (mongoUri) => {
  if (!mongoUri) {
    throw new Error('MONGO_URI is not defined. Please set it in your .env file.');
  }

  try {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected');
  } catch (error) {
    throw new Error(
      `MongoDB connection failed. Verify MONGO_URI is a valid MongoDB Atlas connection string. ${error.message}`
    );
  }
};

export default connectDB;
