import mongoose from 'mongoose';

export function toObjectId(req, _, next) {
  const id = new mongoose.Types.ObjectId(req.params.id);

  req.params.id = id;

  next();
}
