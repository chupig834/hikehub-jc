import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import { NextRequest } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import List from "@/models/list";

// Get all user's packing lists
export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (session) {
      const email = session.user.email;

      await connectMongoDB();

      var userLists = [];

      userLists = await List.find({ owner: email }, "name");

      return Response.json(userLists, { status: 200 });
    } else {
      return Response.json(
        { message: "Not signed in" },
        { status: 401 }
      );
    }
  } catch (error) {
    return Response.json(
      { message: "Error creating packing list" },
      { status: 500 }
    );
  }
}

// Create a new empty packing list
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const searchParams = req.nextUrl.searchParams;

    if (session) {
      const email = session.user.email;
      var name = searchParams.get('name') ?? "New Packing List";
      var id;

      try {
        // Populate with body
        const data = await req.json();
        delete data._id;
        delete data.owner;
        delete data.visibility;
        delete data.__v;
        delete data.createdAt;
        delete data.updatedAt;

        const doc = new List({
          owner: email,
          visibility: "private",
        });
        Object.assign(doc, data);
        const updatedDoc = await doc.save();
        id = updatedDoc._id;
        name = updatedDoc.name;
      } catch (error) {
        // Create blank packing list
        const newList = new List({
          name,
          visibility: "private",
          owner: email,
          categories: [],
        });
        
        await newList.save().then(doc => {
          id = doc._id;
        });
      }

      return Response.json(
        { _id: id, name },
        { status: 201 }
      );
    } else {
      return Response.json(
        { message: "Not signed in" },
        { status: 401 }
      );
    }
  } catch (error) {
    return Response.json(
      { message: "Error creating packing list" },
      { status: 500 }
    );
  }
}
