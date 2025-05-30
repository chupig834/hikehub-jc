import mongoose, { Document, Schema, Model } from "mongoose";

// Define the Gear document interface
interface IGear extends Document {
  name: string;
  link?: string;
  weight?: number;
  unit: string;
  comment: string;
  email: string;
}

// Define the Gear schema
const GearSchema = new Schema<IGear>({
  name: { type: String, required: true },
  link: { type: String, required: false },
  weight: { type: Number, required: false },
  unit: { type: String, required: true },
  comment: { type: String, required: false },
  email: { type: String, required: true }
});

// Define the Gear model with proper TypeScript typing
const Gear: Model<IGear> = mongoose.models.Gear || mongoose.model<IGear>("Gear", GearSchema);

export default Gear;
