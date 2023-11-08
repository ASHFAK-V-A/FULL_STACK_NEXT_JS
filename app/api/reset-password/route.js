import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import UserModel from "@/app/models/user";

export async function POST(req) {


    try {
        const { password, email } = await req.json();
        if (!password == null && !email == null) {
            return NextResponse.json({
                status: 400,
                message: "Please provide both email and password.",
            });
        }

        const hash = await bcrypt.hash(password, 10);

        await UserModel.findOneAndUpdate(
            {
                email: email
            },
            {
                $set: {
                    password: hash
                }
            }
        );
        return NextResponse.json({
            status: 200,
            message: "Password updated successfully.",
        });


    } catch (error) {
        return NextResponse.json({
            status: 500,
            message: "Internal Server Error",
        });
    }
}
