import connectMongoDB from "@/app/lib/connection";
import UserModel from "@/app/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req) {
  if (req.method === "POST") {
    try {
      const { name, email, password } = await req.json();
      const hashedPassword = await bcrypt.hash(password, 8);
      await connectMongoDB();
      const user = new UserModel({
        name,
        email,
        password: hashedPassword,
      });
      await user.save();
      return NextResponse.json({ message: "Topic Created" }, { status: 201 });
    } catch (error) {
      return NextResponse.json(
        { message: "An error occurred while registering the user" },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.error("Method not allowed", 405);
  }
}
