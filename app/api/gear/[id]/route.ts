import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import { connectMongoDB } from "@/lib/mongodb";
import Gear from "@/models/gear";
import { Error } from "mongoose";

// Get a specified gear
export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
      const { id } = await params;
      const session = await getServerSession(authOptions);
  
      if (session) {
        const email = session.user.email;
  
        await connectMongoDB();
  
        var doc = await Gear.findOne({ email: email, _id: id });
  
        if (!doc) {
          return Response.json(
            { message: "Could not find gear" },
            { status: 404 }
          );
        }
  
        return Response.json(doc, { status: 200 });
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
        { message: "Error getting gear" },
        { status: 500 }
      );
    }
}
// Update a specified gear
export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
      const { id } = await params; // Extract gear ID from request parameters
      const session = await getServerSession(authOptions);
  
      if (!session) {
        return Response.json(
          { message: "Not signed in" },
          { status: 401 }
        );
      }
  
      const email = session.user.email;
      const { name, link, weight, unit, comment } = await req.json(); // Get updated fields
  
      await connectMongoDB();
  
      const gearItem = await Gear.findOne({ email: email, _id: id });
  
      if (!gearItem) {
        return Response.json(
          { message: "Could not find gear" },
          { status: 404 }
        );
      }
  
      // Update the fields only if new values are provided
      if (name !== undefined) gearItem.name = name;
      if (link !== undefined) gearItem.link = link;
      if (weight !== undefined) gearItem.weight = weight;
      if (unit !== undefined) gearItem.unit = unit;
      if (comment !== undefined) gearItem.comment = comment;
  
      await gearItem.save(); // Save the updated document
  
      return Response.json(
        { message: "Gear updated successfully", gear: gearItem },
        { status: 200 }
      );
  
    } catch (error) {
      if (error instanceof Error.CastError) {
        return Response.json(
          { message: "Invalid ID format" },
          { status: 400 }
        );
      }
  
      return Response.json(
        { message: "Error updating gear" },
        { status: 500 }
      );
    }
  }

// Delete a specified gear
export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
      const { id } = await params;
      const session = await getServerSession(authOptions);
  
      if (session) {
        const email = session.user.email;
  
        await connectMongoDB();
  
        var doc = await Gear.findOne({ email: email, _id: id });
  
        if (!doc) {
          return Response.json(
            { message: "Could not find gear" },
            { status: 404 }
          );
        }

        await Gear.deleteOne({ _id: id }); // Delete the item
  
        return Response.json({ message: "Gear deleted successfully" }, { status: 200 });
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
        { message: "Error getting gear" },
        { status: 500 }
      );
    }
}
