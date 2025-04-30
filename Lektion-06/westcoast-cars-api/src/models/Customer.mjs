import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'Kundens förnamn måste anges'],
  },
  lastName: {
    type: String,
    required: [true, 'Kundens efternamn måste anges'],
  },
  phone: {
    type: String,
    required: [true, 'Kundens telefonnummer måste anges'],
  },
  email: {
    type: String,
    required: [true, 'Kundens e-post adress måste anges'],
  },
  addresses: [
    {
      addressLine: {
        type: String,
        required: false,
      },
      postalCode: {
        type: String,
        required: false,
      },
      city: {
        type: String,
        required: false,
      },
    },
  ],
  vehicles: [
    {
      manufacturer: {
        type: String,
        required: false,
      },
      model: {
        type: String,
        required: false,
      },
      modelYear: {
        type: Number,
        required: false,
      },
      mileage: {
        type: Number,
        required: false,
      },
    },
  ],
});

export default mongoose.model('Customer', customerSchema);
