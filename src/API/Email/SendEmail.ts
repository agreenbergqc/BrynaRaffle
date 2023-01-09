
import nodemailer from "nodemailer";

export interface ISendEmailProps {
    body: string,
    toAddress: string,
    subject: string
}
export const sendEmail = (emailProps: ISendEmailProps) => new Promise<any>(async (resolve, reject) => {

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        service: 'gmail',
        secure: false,
        requireTLS: true,
        auth: {
            user: process.env.email,
            pass: process.env.emailpassword
        }
    })

    const message = {
        from: "aryehygreenberg613@gmail.com",
        to: emailProps.toAddress,
        subject: emailProps.subject,
        text: emailProps.body
    }

    await transporter.sendMail(message, (err, info) => {
        if (err) {
            console.log("error sending email", { err })
            reject(err)
        } else {
            resolve(info);
        }
    })
})