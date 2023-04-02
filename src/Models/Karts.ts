import mongoose from "mongoose";

const kartSchema = new mongoose.Schema(
  {
    number: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
    updatedBy: {
      type:String,
    },
    duration: {
      type:String
    },
    startTime: {
      type:String,
    },
    endTime: {
      type: String
    },
    client:{
      type: {
        firstName: String,
        lastName: String,
        phoneNumber: String
      }
    }
  },
  { timestamps: true }
);

export const Kart = mongoose.model("Kart", kartSchema);
