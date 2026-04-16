import mongoose from 'mongoose';

const LeadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  businessType: { type: String },
  message: { type: String },
  status: { type: String, enum: ['new', 'contacted', 'converted', 'rejected'], default: 'new' },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Lead || mongoose.model('Lead', LeadSchema);
