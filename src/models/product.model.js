import mongoose from 'mongoose';
const { Schema } = mongoose;

const productSchema = new Schema({
  title: String,
  description: String,
  price: Number,
  category: { type: Schema.Types.ObjectId, ref: 'Category' },
  ownerId: String,
});

const Product = mongoose.model('Product', productSchema);

export default Product;
