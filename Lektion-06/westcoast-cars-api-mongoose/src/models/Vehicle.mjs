import mongoose from 'mongoose';

const vehicleSchema = new mongoose.Schema({
  manufacturer: String,
  model: String,
  modelYear: Number,
});

export default mongoose.model('Vehicle', vehicleSchema);
