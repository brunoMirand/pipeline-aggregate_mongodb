import mongoose from 'mongoose';

const UserDetailsSchema = new mongoose.Schema({
  id_detail: String,
});

export const UserDetails = mongoose.model('UserDetails', UserDetailsSchema);