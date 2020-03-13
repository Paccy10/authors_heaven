import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const sendEmail = mailOptions => {
    return new Promise((resolve, reject) => {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASSWORD
            }
        });

        transporter.sendMail(mailOptions, error => {
            if (error) {
                reject(error);
            } else {
                resolve('Account activation link sent');
            }
        });
    });
};

export default sendEmail;
