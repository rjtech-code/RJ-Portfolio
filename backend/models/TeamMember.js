import mongoose from 'mongoose';

const teamMemberSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 120 },
  role: { type: String, required: true, trim: true, maxlength: 120 },
  bio: { type: String, trim: true, default: '', maxlength: 1000 },
  imageUrl: { type: String, trim: true, required: true, maxlength: 1000 },
  linkedin: { type: String, trim: true, default: '', maxlength: 500 },
  sortOrder: { type: Number, default: 0 },
  status: { type: String, enum: ['draft', 'published'], default: 'draft' },
}, { timestamps: true });

export default mongoose.model('TeamMember', teamMemberSchema);
