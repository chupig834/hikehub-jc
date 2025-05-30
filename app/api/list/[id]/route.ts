import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import { connectMongoDB } from "@/lib/mongodb";
import List from "@/models/list";
import { Error } from "mongoose";

// Get packing list by id
export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    // Allow public lists to be viewed without session
    let doc = await List.findOne({_id: id, visibility: "public"});
    if (doc)
      return Response.json(doc, { status: 200 });

    const session = await getServerSession(authOptions);
    if (session) {
      const email = session.user.email;

      await connectMongoDB();

      doc = await List.findOne({ owner: email, _id: id });

      if (!doc) {
        return Response.json(
          { message: "Could not find list" },
          { status: 404 }
        );
      }

      return Response.json(doc, { status: 200 });
    } else {
      return Response.json(
        { message: "Could not find list" },
        { status: 404 }
      );
    }
  } catch (error) {
    if (error instanceof Error.CastError) {
      return Response.json(
        { message: "Invalid id" },
        { status: 400 }
      );
    }

    return Response.json(
      { message: "Error getting packing list" },
      { status: 500 }
    );
  }
}

// Update packing list by id
export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);

    if (session) {
      const email = session.user.email;
      const data = await req.json();

      await connectMongoDB();
      const doc = await List.findOne({ _id: id, owner: email });

      if (!doc) {
        return Response.json(
          { message: "Could not find list" },
          { status: 404 }
        );
      }

      delete data._id; // Don't allow user to change _id
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
      );
    }
  } catch (error) {
    if (error instanceof Error.CastError) {
      return Response.json(
        { message: "Invalid id" },
        { status: 400 }
      );
    }

    return Response.json(
      { message: "Error creating packing list" },
      { status: 500 }
    );
  }
}

// Delete packing list by id
export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);

    if (session) {
      const email = session.user.email;

      await connectMongoDB();
      const doc = await List.findOne({ _id: id, owner: email });

      if (!doc) {
        return Response.json(
          { message: "Could not find list" },
          { status: 404 }
        );
      }

      await List.deleteOne({_id: id, owner: email});

      return Response.json(
        { message: "Packing list deleted successfully"},
        { status: 200 }
      );

    } else {
      return Response.json(
        { message: "Not signed in" },
        { status: 401 }
      );
    }
  } catch (error) {
    if (error instanceof Error.CastError) {
      return Response.json(
        { message: "Invalid id" },
        { status: 400 }
      );
    }

    console.log(error)

    return Response.json(
      { message: "Error deleting packing list" },
      { status: 500 }
    );
  }
}
