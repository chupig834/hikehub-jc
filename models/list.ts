import mongoose, { Model, models, Schema } from "mongoose";

export interface IItem {
  name: string;
  category: string;
  link: string;
  weight: number;
  unit: string;
  quantity: number;
  comment: string;
}

export interface ICategory {
  name: string;
  color: string;
}

export interface IPackingList {
  name: string;
  visibility: string;
  coverImage: string;
  owner: string;
  categories: ICategory[];
  items: IItem[];
  trailName: string;
  location: string;
  startDate: Date;
  endDate: Date;
  hikeLength: string;
  elevationGain: string;
  allTrailsLink: string;
  pubishDate: Date;
}


const listSchema = new Schema<IPackingList>({
    name: {
      type: String,
      required: true,
    },
    visibility: {
      type: String,
      enum: ['private', 'public'],
      required: true,
    },
    owner: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
      required: true,
      default: "/images/hiking-banner1.jpg", 
    },
    categories: [
      {
        name: { type: String, required: true },
      }
    ],
    items: [
      {
        name: { type: String },
        category: {type: String },
        link: { type: String },
        weight: { type: Number },
        unit: { type: String, enum: ["oz", "lb", "g", "kg"] },
        quantity: { type: Number },
        comment: { type: String },
      }
    ],
    trailName: {type: String},
    location: {type: String},
    startDate: {type: Date},
    endDate: {type: Date},
    hikeLength: {type: String},
    elevationGain: {type: String},
    allTrailsLink: {type: String},
    pubishDate: {type: Date}
  },
  { timestamps: true }
);

const List = models?.lists as Model<IPackingList> || mongoose.model<IPackingList>("lists", listSchema);
export default List;
