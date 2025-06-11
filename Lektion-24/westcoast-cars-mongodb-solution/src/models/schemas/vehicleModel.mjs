import mongoose from 'mongoose';

const vehicleSchema = new mongoose.Schema({
  registrationNumber: {
    type: String,
    required: [true, 'Registreringsnummer måste anges'],
    unique: true,
  },
  manufacturer: {
    type: String,
    required: [true, 'Tillverkare måste anges'],
  },
  model: {
    type: String,
    required: [true, 'Modell måste anges'],
  },
  modelYear: {
    type: Number,
    required: [true, 'Årsmodell måste anges'],
  },
  mileage: {
    type: Number,
    required: [true, 'Antal körda km måste anges'],
  },
  color: {
    type: String,
    required: [true, 'Färg måste anges'],
  },
  fuelType: {
    type: String,
    default: 'Bensin',
    enum: ['Bensin', 'Diesel', 'Hybrid', 'El', 'Gas'],
  },
  photos: [],
});

export default mongoose.model('Vehicle', vehicleSchema);
