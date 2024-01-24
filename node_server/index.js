const express = require('express');
const app = express();


app.use(express.json());
app.use(express.static("public"))
// Use the express.urlencoded() middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));
const sqlDbconnect = require("./dbconnection");


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

// Routes
// app.use('/', RouterPath);//1
// app.use('/api/Course', RouterPath);//2
// app.use('/api/Speaker', RouterPath);//3
// app.use('/api/Industary', RouterPath);//4
// app.use('/api/Subscribe', RouterPath);//5
// app.use('/api/Faq_Category', RouterPath);//6
// app.use('/api/Faq_Question', RouterPath);//7
// app.use('/api/Order_Details', RouterPath);//8
// app.use('/api/Testimonial', RouterPath);//9
// app.use('/api/Coupan', RouterPath);//10
// app.use('/api/User_message', RouterPath);//11
// app.use('/api/Registration', RouterPath);//12
// app.use('/api/getLogin', RouterPath);//13
// app.use('/api/Dashboard', RouterPath);//14
// app.use('/api/logout', RouterPath);//15

app.use(RouterPath)


const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

app.post('/api/create-checkout-session', async (req, res) => {
    try {
        const session = await stripe.Checkout.session.create({
            payment_method_types: ['card'],
            mode: "payment",
            line_items: req.body.items.map(purchaseDetails => {
                return {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: purchaseDetails.productName
                        },
                        unit_amount: (purchaseDetails.price) * 100,

                    },
                    quantity: parseInt(purchaseDetails.quantity),

                }
            }),
            sussess_url: `http://127.0.1:3000/success`,
            cancel_url: `http://127.0.1:3000/cancle`

        })

        res.json({ url: session.url })
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port at http://${hostname}:${port}/`);
});
