const mailer = {
    secure: process.env.EMAIL_SECURE,
    service: process.env.EMAIL_SERVICE,
    username: process.env.EMAIL_USERNAME,
    password: process.env.EMAIL_PASSWORD,
    fromName: process.env.EMAIL_FROM_NAME,
    fromAddress: process.env.EMAIL_FROM_ADDRESS,
};

export default mailer;
