import connectMongoDB from "@/app/lib/connection";
import Otp from "@/app/models/otp";
import { NextResponse } from "next/server";

export async function POST(req) {
    await connectMongoDB()
    const { otp, email } = await req.json()
    if (!otp) {
        return NextResponse.json({
            status: 404
        });
    } else {
        const storedOtpData = await Otp.findOne({ email })

        if (!storedOtpData) {
            return NextResponse.json({
                status: 404,
                message: "OTP not found in the database",
            });
        }
        if (otp == storedOtpData.otp) {
            return NextResponse.json({
                status: 200,
                message: "OTP verification successful",
            });
        } else {
            return NextResponse.json({
                status: 400,
                message: "OTP verification failed",
            });
        }
    }

}