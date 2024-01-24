0afbebc0 - a38c - 40fa - 9d35 - 1f4a3df382a2_coupan = {
    
}

// Router.post("/api/PostOrder", () => {
//     var userId = 1;
//     var order_id = cue123;
//     var bank_ref_no = 12345;
//     var order_status = true;
//     var card_name = course_title;
//     var status_message = success;
//     var orderdetail = [
//         {
//             "course_title": "The DOL Overtime Rule To Be Launched in 2024! Employers Need to Prepare for Compliance!",
//             "course_id": 44,
//             "qty": 1,
//             "totalPrice": 210,
//             "courseItems": [
//                 {
//                     "itemId": 12,
//                     "itemName": "3 Recordings (Save $492)",
//                     "itemPrice": "110"
//                 },
//                 {
//                     "itemId": 11,
//                     "itemName": "2 Recordings (Save $393)",
//                     "itemPrice": "100"
//                 }
//             ]
//         },
//         {
//             "course_title": "Employee Handbook & NLB Audits – 2024 Updates: From the PUMP Act to Stericycle – What Employers need to know for 2024",
//             "course_id": 45,
//             "qty": 1,
//             "totalPrice": 961,
//             "courseItems": [
//                 {
//                     "itemId": 3,
//                     "itemName": "2 Attendee (Save $69)",
//                     "itemPrice": "329"
//                 },
//                 {
//                     "itemId": 4,
//                     "itemName": "3 Attendee (Save $140)",
//                     "itemPrice": "457"
//                 },
//                 {
//                     "itemId": 6,
//                     "itemName": "5 Attendee (Save $220)",
//                     "itemPrice": "175"
//                 }
//             ]
//         }

//     ];
//     var TotalAmount= 1234;
//     var discount=100;
//     var trans_date = 2020 ;
//     var hash_id = 23erryuiplkjhgfdsazcnmlkjhgfdsaertyuipoiuytrhjkjhgfdnmnbvcxz ;


//     let queryStr = `INSERT INTO order_details (user_id,order_id
//         ,bank_ref_no,order_status,card_name,status_message
//         ) VALUES(?, ?, ?, ?, ?,?)`;
    
   
    
//     const sql  'insert into order_details (user_id , order_id , bank_ref_no , order_status , card_name , status_message,amount ,trans_date ,trans_date)'

// })
try {
    // Make a POST request to the backend to create a checkout session
    const response = await http.post('/create-checkout-session', { formData });
    const { sessionId } = response.data;

    // Initialize Stripe
    const stripe = await loadStripe('pk_test_51OGHZSSA3p9Dwv0NaccoiuEfDXTNtWgvxuPleUcdSBFVbnBTwoa1KZcXPVzBxmNRXW1GNwpPZcX5YGY8FfiBSdpH00ZkIQDWaC');

    // Redirect to Stripe Checkout
    const { error } = await stripe.redirectToCheckout({
        sessionId,
    });

    if (error) {
        console.error('Error redirecting to Checkout:', error);
        // Handle the error (e.g., display an error message to the user)
    }
} catch (error) {
    console.error('Error during checkout:', error);
    // Handle the error (e.g., display an error message to the user)
}