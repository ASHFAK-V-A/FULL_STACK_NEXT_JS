import connectMongoDB from "@/app/lib/connection";
import UserModel from "@/app/models/user";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        await connectMongoDB()
        const { email } = await req.json();
        const user = await UserModel.findOne({ email }).select({ email: 1, _id: 0 }).exec();

        if (user) {
            return NextResponse.json({ status: 200, message: "User found", data: user });
        } else {
            return NextResponse.json({ status: 404, message: "User not found" });
        }
    } catch (error) {
        console.log("err", error);
        return NextResponse.json({ status: 500, message: "Internal Server Error" });
    }
}


