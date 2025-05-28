const nodemailer = require("nodemailer");

import config from "../config";

const transport = nodemailer.createTransport({
    service: config.mailer.service,
    secure: config.mailer.secure,
    auth: {
        user: config.mailer.username,
        pass: config.mailer.password,
    },
});

function sendEmail(to: string, subject: string, htmlContent: string) {
    const option = {
        from: config.mailer.fromAddress,
        to,
        subject,
        html: htmlContent,
    };

    return transport.sendMail(option);
}

export default sendEmail;
