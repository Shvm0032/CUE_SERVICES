const express = require('express');
const app = express();
const util = require('util');
const jwt = require('jsonwebtoken');

app.use(express.json({limit: '50mb'}));
app.use(express.static("public"))
// Use the express.urlencoded() middleware to parse URL-encoded bodies
//app.use(express.urlencoded({ extended: true }));
const sqlDbconnect = require("./dbconnection");
const schedular = require('./schedular/payment_status');
const cron = require('node-cron');
//app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb',  extended: true}));

const RouterPath = require('./router');
const cors = require('cors');
const { default: Stripe } = require('stripe');
const { name } = require('ejs');
// const { appendErrors } = require('react-hook-form');
app.use(cors());
const hostname = '127.0.1';
const port = 8000;
// const secretKey = process.env.JWT_SECRET_KEY || 'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcwNDg4ODQ3NSwiaWF0IjoxNzA0ODg4NDc1fQ.qgAX2SXjLzNplSOL67ILmVR4a68q9_WPP7vKFcXI4oE';



app.use(cors());

app.use(RouterPath)


const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

app.post('/api/create-checkout-session', async (req, res) => {
    const queryAsync = util.promisify(sqlDbconnect.query).bind(sqlDbconnect);

    const orderDetails = req.body;
    const userDetail = req.body.detail;
    let userId = 'null';
    let token = req.headers.authorization;
    if (token && token.startsWith('Bearer ')) {

        token = token.slice(7, token.length);
        let jwtSecretKey = process.env.JWT_SECRET_KEY;
        const decoded = jwt.verify(token, jwtSecretKey);
        if (!decoded) {

        }
        userId = decoded.userId;
    }


    const values = [
        userId, // Replace with the actual user_id
        orderDetails.OrderID, // Assuming session.id is the order_id
        orderDetails.Grand_Total,
        orderDetails.Subtotal,
        orderDetails.Discount,
        orderDetails.Coupon_Code,
        orderDetails.Course_Quantity,
        JSON.stringify(orderDetails.card_detail),
        userDetail.firstName,
        userDetail.lastName,
        userDetail.companyName,
        userDetail.jobTitle,
        userDetail.country,
        userDetail.streetAddress,
        userDetail.city,
        userDetail.state,
        userDetail.zip,
        userDetail.phone,
        userDetail.email,
        'Pending',
    ];

    const sql = `
INSERT INTO order_details (user_id, order_id, grand_total, subtotal, discount, coupon_code, course_quantity,
card_detail, FName, lName, Company_Name, Job_Title, Country, Street_Address, City, State, Zip, phone, Email, order_status)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`;
    try {
        const result = await queryAsync(sql, values);
        console.log(result, 'result');
        if (result && result.affectedRows) {
            let orderId = result.insertId;

            const orderItemsPromises = orderDetails.card_detail.map(async (orderItem) => {
                const itemValues = [
                    orderId,  // Assuming order_id is auto-incremented and orderResult has the inserted ID
                    orderItem.course_id,
                    orderItem.qty,
                    orderItem.totalPrice,
                    JSON.stringify(orderItem.courseItems),
                    orderItem.course_title,
                    'Pending'
                ];

                const itemSql = `
                INSERT INTO order_course (Order_id, Course_id, qty, Price, Selling_Option, Course_name, status)
                VALUES (?, ?, ?, ?, ?, ?, ?)`;

                return queryAsync(itemSql, itemValues);
            });

            const orderItemsResults = await Promise.all(orderItemsPromises);
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                mode: "payment",
                line_items: req.body.card_detail.map(purchaseDetail => ({

                    // price: req.body.purchaseDetails.Grand_Total,
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: purchaseDetail.course_title
                        },
                        unit_amount: parseInt(purchaseDetail.totalPrice) * 100
                    },
                    quantity: parseInt(purchaseDetail.qty),


                })),
                success_url: `http://127.0.1:3000/Success`,
                cancel_url: `http://127.0.1:3000/cancle`
            });
            console.log(orderItemsResults, 'orderItemsResults');
            const updateCourseQuery = ` UPDATE order_details SET hash_id = ? WHERE id = ?`;
            const itemValuesU = [
                session.id,
                orderId
            ];
            const updateCourseQueryC = ` UPDATE order_course SET hash_id = ? WHERE Order_id = ?`;
            const itemValuesUC = [
                session.id,
                orderId
            ];
            await queryAsync(updateCourseQuery, itemValuesU);
            await queryAsync(updateCourseQueryC, itemValuesUC);
            res.json({ url: session.url, id: session.id })
            
        }
        else {
            res.status(500).send('Server error');
            return;
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
        return;
    }


});




app.get('/api/check_session_info', async (req, res) => {

    const queryAsync = util.promisify(sqlDbconnect.query).bind(sqlDbconnect);
    const hashId = req.query.id;
    const session = await stripe.checkout.sessions.retrieve(hashId);

    if (session) {
        const sessionStatus = session.payment_status;
        console.log(session, 'sessionStatus');
        res.json({ session, status: sessionStatus });
        let paymentUpdateStatus = '';
        if (sessionStatus == 'paid') {
            paymentUpdateStatus = 'Paid';
        }
        else if (sessionStatus == 'pending') {
            paymentUpdateStatus = 'Pending';
        }
        else {
            paymentUpdateStatus = 'Failed';
        }

        const updateCourseQuery = ` UPDATE order_details SET order_status = ? WHERE hash_id = ?`;
        const itemValuesU = [
            paymentUpdateStatus,
            hashId
        ];
        let response = await queryAsync(updateCourseQuery, itemValuesU);
        console.log(response, 'response');

    }
    console.log(sessionStatus)
    console.log(session, 'hash id');
    res.status(200).send(session);
});


cron.schedule('* * * * *', () => {
    schedular.paymentUpdate();
});
app.listen(port, () => {
    console.log(`Example app listening on port at http://${hostname}:${port}/`);
});
