import mongoose from 'mongoose';
const { Schema } = mongoose;

const categorySchema = new Schema({
  title: String,
  description: String,
  ownerId: String,
});

const Category = mongoose.model('Dog', categorySchema);

export default Category;
