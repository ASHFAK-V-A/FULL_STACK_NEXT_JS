import connectMongoDB from "@/app/lib/connection";
import UserModel from "@/app/models/user";
import { NextResponse } from "next/server";
import nodemailer from 'nodemailer'
export async function POST(req) {
    try {
        await connectMongoDB()
        const { email } = await req.json();
        const user = await UserModel.findOne({ email }).select({ email: 1, _id: 0 }).exec();

        const OTP = `${Math.floor(1000 + Math.random() * 9000)}`

        if (user) {
            sendOTPByEmail(email, OTP);
            return NextResponse.json({ status: 200, message: "User found", data: user });
        } else {
            return NextResponse.json({ status: 404, message: "User not found" });
        }
    } catch (error) {
        console.log("err", error);
        return NextResponse.json({ status: 500, message: "Internal Server Error" });
    }
}


async function sendOTPByEmail(email, otp) {
    const mailDetails = {
        from: 'your_email@gmail.com',
        to: email,
        subject: 'OTP for Password Reset',
        text: `Your OTP for password reset is: ${otp}`,
    };
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'ashfakv17@gmail.com',
            pass: 'ehyr vass pkni awxa',
        },
        debug: true
    });
    try {
        await transporter.sendMail(mailDetails);
        console.log('OTP sent successfully to', email);
    } catch (error) {
        console.error('Error sending OTP:', error);
    }
}
