const sqlDbconnect = require("../dbconnection");
exports.paymentUpdate = paymentUpdate;
const dotenv = require('dotenv');
dotenv.config();
const util = require('util');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const moment = require('moment');
const { sendEmail } = require("../lib/mail");
const { sendInvoiceEmail } = require("../lib/invoiceEmail");
async function paymentUpdate() {

    const itemSql = `Select id, hash_id from order_details where order_status = 'pending' and email_sent = 0`;
    const queryAsync = util.promisify(sqlDbconnect.query).bind(sqlDbconnect);
    let response = await queryAsync(itemSql);

    const orderItemsPromises = response.map(async (orderItem) => {
        // console.log(orderItem.hash_id,'orderItem');
        const hashId = orderItem.hash_id;
        if (!hashId) {
            return Promise.resolve();
        }
        const session = await stripe.checkout.sessions.retrieve(hashId);
      //  console.log(session, 'session');
        if (session) {
            const sessionStatus = session.payment_status;
        //    console.log(session, 'sessionStatus');
            let paymentUpdateStatus = '';
            if (sessionStatus == 'paid') {
                paymentUpdateStatus = 'Paid';
            }
            else if (sessionStatus == 'pending' || sessionStatus == 'unpaid') {
                paymentUpdateStatus = 'pending';
            }
            else {
                paymentUpdateStatus = 'Failed';
            }

            const updateCourseQuery = ` UPDATE order_details SET order_status = ? WHERE hash_id = ?`;
            const itemValuesU = [
                paymentUpdateStatus,
                hashId
            ];
            const updateCourseQueryc = ` UPDATE order_course SET status = ? WHERE hash_id = ?`;
            let response = await queryAsync(updateCourseQuery, itemValuesU);
            let responseUpdate = await queryAsync(updateCourseQueryc, itemValuesU);
            let UserOrder = await queryAsync('Select * from order_details where hash_id = ? ', [hashId]);
            if (UserOrder) {
                if (paymentUpdateStatus == 'Paid') {
                    const alphanumeric = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                    let password = '';
                    for (let i = 0; i < 7; i++) {
                        password += alphanumeric.charAt(Math.floor(Math.random() * alphanumeric.length));
                    }
                    let userRegister = [
                        UserOrder[0]?.FName,
                        UserOrder[0]?.lName,
                        UserOrder[0]?.Email,
                        UserOrder[0]?.Email,
                        UserOrder[0]?.Phone,
                        null,
                        UserOrder[0]?.Zip,
                        UserOrder[0]?.Street_Address,
                        UserOrder[0]?.Country,
                        UserOrder[0]?.State,
                        UserOrder[0]?.City,
                        password
                    ];
                    const sqlr = `INSERT INTO registration (fname, lname, uname, email,phone,gender,pincode,address1,country,state,city, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
                    const result = await queryAsync(sqlr, userRegister);
                  //  console.log(result, 'result');
                    if (result && result.affectedRows) {
                        const updateUserIdQuery = ` UPDATE order_details SET user_id = ? WHERE hash_id = ?`;
                        const itemValuesUser = [
                            result.insertId,
                            hashId
                        ];
                        await queryAsync(updateUserIdQuery, itemValuesUser);
                        let emailObject = {
                            user_name: UserOrder[0]?.Email,
                            receiver: UserOrder[0]?.Email,
                            subject: 'Account Created successfully.',
                            password: password,
                            content: '',
                            login: process.env.LOGIN_URL
                        };
                        sendEmail(emailObject);
                    }
                }
             //   console.log(UserOrder, "userorder");
            }


            //getting order data from  database using hash_id
            // const UserOrder = await queryAsync('Select * from order_details where hash_id = ? ', [hashId]);
            // if (UserOrder) {
            //     console.log(UserOrder, "userorder");
            // }
            UserOrder = await queryAsync('Select * from order_details where hash_id = ? ', [hashId]);
            //getting data from  user info from user_id
            const userId = UserOrder[0].user_id || 0;
            const resultInfo = await queryAsync('SELECT * from registration WHERE id =? ', [userId]);
           // console.log(resultInfo);
            if (resultInfo) {
                console.log(resultInfo, 'resultInfo');
            }
            //date extraction form ,Date,time and time zone 
            const datetime = new Date(UserOrder[0].trans_date);
            const date = moment(datetime).format('YYYY-MM-DD');
            // console.log(date,'date');

            //ALL data that will be fetch in invoice pdf
            let FinnalInvoiceData = {
                //company ditaile for company
                CompanyName: 'CUE SERVICES',
                Companywebsite: 'ceutrainers.com',
                CompanywebsitePolice: 'ceu-trainers.com/privacy-policy',
                CompanyAddress: 'lowermokhampur',
                CompanyEmail: 'info@ceutrainers.com',
                CompanyZip: 'info@ceutrainers.com',
                //User detail for invoice
                OrderId: UserOrder[0]?.id || null,
                User_Fname: UserOrder[0]?.FName || null,
                User_lname: UserOrder[0]?.lName || null,
                InvoiceNumber: UserOrder[0]?.order_id || null,
                OrderDate: date,
                Country: UserOrder[0]?.Country || null,
                State: UserOrder[0]?.State || null,
                Zip: UserOrder[0]?.Zip || null,
                City: UserOrder[0]?.City || null,
                Phone: UserOrder[0]?.Phone || null,
                Email: UserOrder[0]?.Email || null,
                Course_quantity: UserOrder[0]?.course_quantity || null,
                TotalAmount: UserOrder[0]?.grand_total || null,
                Discount: UserOrder[0]?.discount || null,
                CourseDetail: UserOrder[0]?.card_detail || null,
            }

           // console.log(FinnalInvoiceData, 'information');
            let emailObject = {
                user_name: resultInfo[0]?.uname || UserOrder[0].Email,
                receiver: UserOrder[0].Email,
                subject: 'Order Created successfully.',
                content: ''
            };
            let userDetail = {
                user_name: 'test'
            };
            let fileName = UserOrder[0]?.order_id + '_Invoice.pdf';
            const itemValuesUEmail = [
                1,
                hashId
            ];
            // console.log(itemValuesUEmail,'itemValuesUEmail');
            const updateCourseQueryEmail = `UPDATE order_details SET email_sent = ? WHERE hash_id = ?`;

            if (paymentUpdateStatus == 'Paid') {
                let responses = await sendInvoiceEmail(emailObject, userDetail, fileName, FinnalInvoiceData);
                await queryAsync(updateCourseQueryEmail, itemValuesUEmail);
            }
            if (paymentUpdateStatus == 'Failed') {
                await queryAsync(updateCourseQueryEmail, itemValuesUEmail);
            }


            return Promise.resolve();
        }

        //return queryAsync(itemSql, itemValues);
    });

    const orderItemsResults = await Promise.all(orderItemsPromises);
    //console.log(response,"I am here");
}