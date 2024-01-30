const sqlDbconnect = require("../dbconnection");
exports.paymentUpdate = paymentUpdate;
const dotenv = require('dotenv');
dotenv.config();
const util = require('util');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


async function paymentUpdate() {
    
    const itemSql = `Select id, hash_id from order_details  where order_status = 'pending'`;
    const queryAsync = util.promisify(sqlDbconnect.query).bind(sqlDbconnect);
    let response =  await queryAsync(itemSql);

    const orderItemsPromises = response.map(async (orderItem) => {
        console.log(orderItem.hash_id,'orderItem');
        const hashId = orderItem.hash_id;
        const session = await stripe.checkout.sessions.retrieve(hashId);
        console.log(session,'session');
        if (session) {
            const sessionStatus = session.payment_status;
            console.log(session, 'sessionStatus');
            let paymentUpdateStatus = '';
            if (sessionStatus == 'paid') {
                paymentUpdateStatus = 'Paid';
            }
            else if (sessionStatus == 'pending' || sessionStatus == 'unpaid') {
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
            const updateCourseQueryc = ` UPDATE order_course SET status = ? WHERE hash_id = ?`;
            let response = await queryAsync(updateCourseQuery, itemValuesU);
            let responseUpdate = await queryAsync(updateCourseQueryc, itemValuesU);

            console.log(response, 'response');
            return Promise.resolve();
        }
        
        //return queryAsync(itemSql, itemValues);
    });

    const orderItemsResults = await Promise.all(orderItemsPromises);
    console.log(response,"I am here");
}