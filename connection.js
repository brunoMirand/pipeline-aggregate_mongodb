import 'dotenv/config';
import mongoose from 'mongoose';

export const connection = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connection established successfully.');
    return true;
  } catch (error) {
    console.error('Error establishing connection.');
    return false;
  }
}

export const disconnect = async () => {
  try {
    await mongoose.disconnect();
    console.log('Disconnect database with successfully.');
  } catch (error) {
    console.error('Error disconnect database.');
  }
}
