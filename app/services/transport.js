var mailer = require('nodemailer');
var mailConfig = {
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD
  }
};

var transporter = mailer.createTransport(mailConfig);

module.exports = transporter;



