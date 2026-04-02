import mongoose from "mongoose";

const recordSchema = new mongoose.Schema({
  amount: Number,
  type: { type: String, enum: ["income", "expense"] },
  category: String,
  date: Date,
  notes: String,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  isDeleted: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model("Record", recordSchema);