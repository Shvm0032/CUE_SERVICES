const nodemailer = require('nodemailer');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/mail.js')[env];
const ejs = require('ejs');


const sendEmail = async ({ user_name, receiver, subject, content, password, login }) => {
    const html = await getEmailContent(user_name, receiver, content, password, login);
    let from = process.env.MAIL_FROM_ADDRESS;
    let mailOptions = {
      from,
      to: receiver,
      subject: subject,
      html
    };
    console.log(config,'config');
    const transporter = nodemailer.createTransport(config);
    return await transporter.sendMail(mailOptions);
};

const getEmailContent = async (user_name, receiver, content, password, login) => {
    return new Promise((resolve, reject) => {
        ejs.renderFile(__dirname + '/../templates/welcome.ejs', { user_name, receiver, content, password, login }, {}, (err, data) => {
            if (err) {
                return reject(err);
            }
            resolve(data);
        });
    });
}


module.exports = {
  sendEmail
};
