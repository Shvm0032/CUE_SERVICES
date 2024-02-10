const nodemailer = require('nodemailer');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/mail.js')[env];
const ejs = require('ejs');
let pdf = require("html-pdf");
const path = require('path');
const DIR = './public/';


const sendInvoiceEmail = async ({ user_name, receiver, subject, content }, userdetail, fileName, information) => {
    let logo = process.env.APP_URL +'/logo/logo.png';
    const filepath = await getEmailAttachment(fileName, logo, userdetail, information);
    const html = await getEmailContent(user_name, receiver, content, userdetail, information);
    console.log(html);
    let from = process.env.MAIL_FROM_ADDRESS;
    let mailOptions = {
      from,
      to: receiver,
      subject: subject,
      html
    };
    if(filepath && filepath != 0){
        let filepath = __dirname+'/../public/invoice/'+fileName;
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

const getEmailContent = async (user_name, receiver, content, detail, information) => {
    return new Promise((resolve, reject) => {
        ejs.renderFile(__dirname + '/../templates/invoice.ejs', { user_name, receiver, content, detail, information } , (err, data) => {
            if (err) {
               // console.log(err)
                return reject(err);
            }
            resolve(data);
        });
    });
}

const getEmailAttachment = async (fileName, logo, detail, information) => {

    return new Promise((resolve, reject) => {


       // let filePAth = __dirname + '/../templates/forgetEmail.pdf';
        let filePAth = DIR+'invoice/'+fileName;

        ejs.renderFile(__dirname + '/../templates/pdf.ejs', { logo, detail, information }, (err, data) => {
            if (err) {
                console.log(err,'__dirname');
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
