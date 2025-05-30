import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (session) {
      const email = session.user.email;

      await connectMongoDB();
      const doc = await User.findOne({ email });

      if (!doc) {
        return Response.json(
          { message: "Could not find user" },
          { status: 404 }
        )
      }

      return Response.json(
        doc,
        { status: 200 }
      );
    } else {
      return Response.json(
        { message: "Not signed in" },
        { status: 401 }
      )
    }
  } catch (error) {
    return Response.json(
      { message: "Error getting user" },
      { status: 500 }
    )
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (session) {
      const email = session.user.email;
      const data = await req.json();

      await connectMongoDB();
      const doc = await User.findOne({ email });

      if (!doc) {
        return Response.json(
          { message: "Could not find user" },
          { status: 404 }
        )
      }

      delete data._id;
      delete data.email;
      Object.assign(doc, data);
      const updatedDoc = await doc.save();

      return Response.json(
        updatedDoc,
        { status: 200 }
      );
    } else {
      return Response.json(
        { message: "Not signed in" },
        { status: 401 }
      )
    }
  } catch (error) {
    if (error instanceof SyntaxError) {
      return Response.json(
        { message: "Body required" },
        { status: 400 }
      );
    }
    return Response.json(
      { message: "Error updating user" },
      { status: 500 }
    )
  }
}
