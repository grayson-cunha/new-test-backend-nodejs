import mongoose from 'mongoose';

class Database {
  constructor() {}

  async connect() {
    return mongoose.connect(process.env.DATABASE_URL).then(() => {
      console.log('Database connected');
    });
  }

  async disconnect() {
    return mongoose.disconnect();
  }
}

export default new Database();
