import mongoose from 'mongoose';

class Database {
  constructor() {}

  async connect() {
    return mongoose.connect(process.env.DATABASE_URL).then(() => {
      console.log('Database connected');
    });
  }
}

export default new Database();
