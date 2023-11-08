import { transporter } from "../lib/nodeMailerConfig";
import Otp from "../models/otp";

export const sendMail = async (email, fullName) => {
    const OTP = `${Math.floor(1000 + Math.random() * 9000000)}`
    try {
        const otpData = { email, otp: OTP }
        const isExisit = await Otp.findOne({ email })

        if (isExisit) {
            await Otp.findByIdAndDelete(isExisit._id);
        }
        const newOtp = new Otp(otpData)
        await newOtp.save()
        const mailData = {
            from: process.env.MAILER_EMAIL,
            to: email,
            subject: "Here is the OTP for Resetting Password",
            text: `Dear ${fullName},\n\nYour One-Time Password (OTP) for resetting the password is: ${OTP}`,
        };

        transporter.sendMail(mailData, (error) => {
            if (error) {
                console.error(error);
            } else {
                console.log('Email sent');
            }
        });


    } catch (error) {
        console.error("node mailer error", error)
    }
}