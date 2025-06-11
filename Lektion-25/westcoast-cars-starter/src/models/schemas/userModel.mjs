import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import validator from 'validator';

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
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Ange en giltig e-postadress'],
  },
  password: {
    type: String,
    required: [true, 'Lösenord måste anges'],
    minlength: 8,
    select: false,
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.checkPassword = async function (
  passwordToCheck,
  userPassword
) {
  return await bcrypt.compare(passwordToCheck, userPassword);
};

export default mongoose.model('User', userSchema);
