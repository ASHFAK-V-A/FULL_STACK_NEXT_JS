import nodeMailer from 'nodemailer'

export const transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAILER_EMAIL,
        pass: process.env.MAILER_PASSWORD

    }
})

