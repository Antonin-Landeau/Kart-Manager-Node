import mongoose from "mongoose";

const kartSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Kart = mongoose.model("Kart", kartSchema);
