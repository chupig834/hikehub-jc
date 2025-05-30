import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import { NextApiRequest, NextApiResponse } from "next";

import { connectMongoDB } from "@/lib/mongodb";
import Gear from "@/models/gear";
//import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {

    const session = await getServerSession(authOptions);

    if (!session) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { name, link, weight, unit, comment } = await req.json(); // Get gear details

    await connectMongoDB(); // Connect to the database

    const newGear = new Gear({
      name,
      link,
      weight,
      unit,
      comment,
      email: session.user.email
    });
    const newDoc = await newGear.save(); // Save to database

    return Response.json(
      newDoc,
      { status: 201 }
    );
  } catch (error) {
    return Response.json(
      { message: "An error occurred while adding gear." },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectMongoDB();
    const userGear = await Gear.find({ email: session.user.email });

    return Response.json(userGear, { status: 200 });
  } catch (error) {
    console.error("Error fetching gear:", error);
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

// export async function DELETE(req: Request) {
//   try {
//     const session = await getServerSession(authOptions);

//     if (!session) {
//       return Response.json({ message: "Unauthorized" }, { status: 401 });
//     }

//     const { id } = await req.json(); // Extract the ID from request body

//     await connectMongoDB(); // Connect to the database

//     const gearItem = await Gear.findOne({ _id: id, email: session.user.email });

//     if (!gearItem) {
//       return Response.json({ message: "Item not found or unauthorized" }, { status: 404 });
//     }

//     await Gear.deleteOne({ _id: id }); // Delete the item

//     return Response.json({ message: "Gear deleted successfully" }, { status: 200 });
//   } catch (error) {
//     return Response.json(
//       { message: "An error occurred while deleting gear." },
//       { status: 500 }
//     );
//   }
// }


// GET METHOD TO FETCH USER'S GEAR
// export async function GET(req: Request) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const email = searchParams.get("email");

//     if (!email) {
//       return NextResponse.json(
//         { message: "Email is required." },
//         { status: 400 }
//       );
//     }

//     await connectMongoDB();

//     const userGear = await Gear.find({ email });

//     return NextResponse.json(
//       { message: "Gear retrieved successfully", gear: userGear },
//       { status: 200 }
//     );
//   } catch (error) {
//     return NextResponse.json(
//       { message: "An error occurred while retrieving gear.", error },
//       { status: 500 }
//     );
//   }
// }

