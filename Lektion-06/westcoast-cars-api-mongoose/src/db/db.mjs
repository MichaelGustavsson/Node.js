import mongoose from 'mongoose';

// Funktion som exporterar anslutningen till mongodb
const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    if (conn) {
      console.log(`Databas ansluten till ${conn.connection.host}`);
    }
  } catch (error) {
    console.log(error);
  }
};

export default connectDb;
