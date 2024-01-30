const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  development: {
   // service: "gmail",
    host: process.env.SMTP_HOST,
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD
    },
  //  port: process.env.SMTP_PORT,
    debug: false, // show debug output
    logger: false // log information in console
  },
  test: {
    host: process.env.SMTP_HOST,
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD
    },
    port: process.env.SMTP_PORT
  },
  production: {
    host: process.env.SMTP_HOST,
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD
    },
    port: process.env.SMTP_PORT
  }
};