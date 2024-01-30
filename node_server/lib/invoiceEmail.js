const request = require("superagent");
const nodemailer = require('nodemailer');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/mail.js')[env];
const ejs = require('ejs');
let pdf = require("html-pdf");
const path = require('path');
const DIR = './public/';
const helper = require("../helper/helper.js");

const sendInvoiceEmail = async ({ user_name, receiver, subject, content,token }, userdetail, fileName) => {
    let logo = process.env.SERVICE_BASE_URL+'/logo/logo.png';
    const filepath = await getEmailAttachment(fileName, logo, userdetail);
    const html = await getEmailContent(user_name, receiver, content,token, userdetail);
    let from = process.env.MAIL_FROM_ADDRESS;
    let mailOptions = {
      from,
      to: receiver,
      subject: subject,
      html
    };
    if(filepath && filepath != 0){
        let filepath = __dirname+'/../public/user/invoice/'+fileName;
        mailOptions.attachments = [
        {
            filename: fileName, // <= Here: made sure file name match
            path: path.join(filepath), // <= Here
            contentType: 'application/pdf'
        }
    ]
    }

    const transporter = nodemailer.createTransport(config);
    return await transporter.sendMail(mailOptions);
};

const getEmailContent = async (user_name, receiver, content, token, detail) => {
    return new Promise((resolve, reject) => {
        ejs.renderFile(__dirname + '/../templates/invoice.ejs', { user_name, receiver, content, detail } , (err, data) => {
            if (err) {
               // console.log(err)
                return reject(err);
            }
            resolve(data);
        });
    });
}
const getEmailAttachment = async (fileName, logo, detail) => {

    return new Promise((resolve, reject) => {


       // let filePAth = __dirname + '/../templates/forgetEmail.pdf';
        let filePAth = DIR+process.env.USER_ENTITY_FOLDER+'/invoice/'+fileName;
        console.log(logo,'logo');
        ejs.renderFile(__dirname + '/../templates/pdf.ejs', { logo, detail}, (err, data) => {
            if (err) {
                  return 0;
            } else {
                let options = {
                    "height": "11.25in",
                    "width": "740px",
                    childProcessOptions: {
                    env: {
                      OPENSSL_CONF: '/dev/null',
                    }
                  }
                };
                pdf.create(data, options).toFile(filePAth, function (err, data) {
                    if (err) {
                        return reject(0);
                    } else {
                        return resolve(filePAth);
                    }
                });
            }
        });

    });
}


module.exports = {
    sendInvoiceEmail
};
