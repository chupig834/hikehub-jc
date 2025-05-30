import User from "@/models/user";
import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const {name, email, password, occupation} = await req.json();
    const hashedPassword = await bcrypt.hash(password,  10);

    await connectMongoDB();
    const user = new User({ name, email, password: hashedPassword, occupation });
    await user.save();

    return NextResponse.json(
      { message: "User registered" },
      { status: 201 }
    );
  } catch (error) {
    if (error.code === 11000) {
      return NextResponse.json(
        { message: "Email already exists" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "An error occurred while registering the user." },
      { status: 500 }
    );
  }
}