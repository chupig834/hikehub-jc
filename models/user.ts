import mongoose, { Model, models, Schema } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  password: string;
  occupation: string;
}

const userSchema = new Schema<IUser>({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true, 
      trim: true,
      match: [/.+\@.+\..+/, 'Please enter a valid email address']
    },
    password: {
      type: String
    },
    occupation: {
      type: String
    },
  },
  { timestamps: true }
);

const User = models.users as Model<IUser> || mongoose.model("users", userSchema);
export default User;
