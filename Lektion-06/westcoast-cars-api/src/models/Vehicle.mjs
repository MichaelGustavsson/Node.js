import mongoose from 'mongoose';

const vehicleSchema = new mongoose.Schema({
  manufacturer: {
    type: String,
    required: [true, 'Tillverkare måste anges'],
  },
  model: {
    type: String,
    required: [true, 'Modelltyp måste anges'],
  },
  modelYear: {
    type: Number,
  },
});

export default mongoose.model('Vehicle', vehicleSchema);
