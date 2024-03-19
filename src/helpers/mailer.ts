import nodemailer from 'nodemailer'
import User from '@/models/user'
import bcryptjs from 'bcryptjs'


export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)


        // await User.findByIdAndUpdate(userId, {
        //     verifyToken : hashedToken,
        //     verifyTokenExpiry : Date.now() + 3600000
        // })
        // waht kind of email type 
        const tenDaysInMilliseconds = 10 * 24 * 60 * 60 * 1000;
        const twoHoursInMilliseconds = 2 * 60 * 60 * 1000;
        if (emailType === 'VERIFY') {
            await User.findByIdAndUpdate(userId, {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + tenDaysInMilliseconds
            })
        } else if (emailType === 'RESET') {
            await User.findByIdAndUpdate(userId,
                {
                    forgotPasswordToken: hashedToken,
                    forgotPasswordTokenExpiry: Date.now() + twoHoursInMilliseconds
                }
            )
        }

        const transporter = nodemailer.createTransport({
            service: "Gmail",
            // host: "smtp.gmail.com",
            // port: 465,
            // secure: true,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.APP_PASSWORD,
            },
        });


        const emailSubject = emailType === 'VERIFY' ? 'Verify your email to keep your account active' : 'Reset your account password';
        const emailContent = emailType === 'VERIFY' ? `
    <p>Your account has been created. To verify your email, please click on the following link. This link is valid only for 10 days. If not verified within this time, your account access may be restricted.</p>
    <p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to verify email</p>`
            :
            `
    <p>Reset your password using the following link. This link is valid only for two hours.</p>
    <p>Click <a href="${process.env.DOMAIN}/resetPassword?token=${hashedToken}">here</a> to reset your password</p>
`;

        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: emailSubject,
            html: emailContent
        };



        const mailresponse = await transporter.sendMail(mailOptions)
        return mailresponse

    } catch (error: any) {
        throw new Error(error.message)

    }

}