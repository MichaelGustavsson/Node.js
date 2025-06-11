import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'Förnamn måste anges'],
  },
  lastName: {
    type: String,
    required: [true, 'Efternamn måste anges'],
  },
  email: {
    type: String,
    required: [true, 'E-post måste anges'],
  },
  password: {
    type: String,
    required: [true, 'Lösenord måste anges'],
  },
});

export default mongoose.model('User', userSchema);
