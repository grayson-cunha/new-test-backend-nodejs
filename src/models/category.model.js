import mongoose from 'mongoose';
const { Schema } = mongoose;

const categorySchema = new Schema({
  title: String,
  description: String,
  ownerId: String,
});

const Category = mongoose.model('Category', categorySchema);

export default Category;
