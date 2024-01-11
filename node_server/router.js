const express = require("express");
const sqlDbconnect = require("./dbconnection");
const crypto = require("crypto")
var generator = require('generate-password');
const Router = express.Router();
const session = require('express-session');
const nodemailer = require('nodemailer');
const multer = require('multer');
const { log } = require("console");
const { title } = require("process");
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config();

var filename = "";
var filet = "";
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, "./public")
    },
    filename: function (req, file, cb) {
        filename = file.originalname
        filet = file
        return cb(null, file.originalname)
    }
})


const upload = multer({ storage })
// Uncomment the following line to enable JSON parsing
// Router.use(express.json());

Router.use(session({
    secret: 'your-secret-key',
    resave: true,
    saveUninitialized: true,
    cookie: {
        secure: true, // Set to true if your app is served over HTTPS
    }
}));



// admin login

Router.post('/api/admin_login', (req, res) => {
    const { username, password } = req.body;

    // Basic validation
    if (!username || !password) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const sqlQuery = "SELECT * FROM  admin_login  WHERE username = ? AND password = ?";
    sqlDbconnect.query(sqlQuery, [req.body.username, req.body.password], (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        if (data.length > 0) {
            req.session.user = data[0].username
            return res.json({ status: "success" });
        } else {
            return res.json({ status: "No record Existed" });
        }
    });
});



// Login route
Router.post('/api/getLogin', (req, res) => {
    const { email, password } = req.body;

    // Basic validation
    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const sqlQuery = "SELECT * FROM  registration WHERE email = ? AND password = ?";
    sqlDbconnect.query(sqlQuery, [req.body.email, req.body.password], (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        if (data.length > 0) {
            
            let jwtSecretKey = process.env.JWT_SECRET_KEY;
            let dataToken = {
                time: Date(),
                userId:  data[0].id,
            }
         
            const token = jwt.sign(dataToken, jwtSecretKey);
         
           // res.send(token);

            req.session.user = data[0].email
            return res.json({ status: "success", token });
        } else {
            return res.json({ status: "No record Existed" });
        }
    });
});


Router.post('/api/logout', (req, res) => {
    // Destroy the session
    req.session.destroy(err => {
        if (err) {
            console.error('Error destroying session:', err);
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }

        // Respond with success
        return res.json({ success: true, message: 'Logout successful' });
    });
});

Router.get('/Dashboard', (req, res) => {
    // Check if the user is authenticated (session exists)
    if (req.session && req.session.user) {
        // Render your dashboard page or send a response indicating success
        return res.json({ success: true, message: 'Dashboard page' });
    } else {
        // Redirect to the login page if the user is not authenticated
        return res.redirect('/login');
    }
});

Router.get("/", (req, res) => {
    res.send({ message: "hello" });

});

Router.get("/api/Course", (req, res) => {
    sqlDbconnect.query("select * from  course_detail", (err, rows) => {
        console.log(rows)
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    });
});
Router.delete("/api/delete_course", (req, res) => {
    console.log(req.query.id, "<<>>")
    sqlDbconnect.query(`DELETE FROM course_detail WHERE id = "${req.query.id}"`, (err, rows) => {
        if (!err) {

            sqlDbconnect.query(`DELETE FROM selling_options WHERE cid = "${req.query.id}"`, (err, row) => {
                if (!err) {
                    res.send({ rows, row });
                } else {
                    console.log(err);
                }
            });
        } else {
            console.log(err);
        }
    });
})

Router.post("/api/Course_add", upload.single("file"), (req, res) => {
    try {
        console.log(req.body,'req.body');
        const { industry, speaker, name, description, duration, time, cstdate, fields } = req.body;
        const filename = req.file.filename; // Assuming your file is uploaded correctly
        const fieldsData = JSON.parse(fields);
        console.log('fieldsData');
        // Extracting selling options data from fieldsData
        const sellingOptions = fieldsData.map(option => ({
            category: option.category,
            name: option.name,
            price: option.price
        }));
        // Inserting data into the database, including the new selling_option column
        sqlDbconnect.query(`INSERT INTO course_detail (industries, speaker, description, title, date, time, duration, course_thumbail, selling_option) VALUES ('${industry}','${speaker}','${description}','${name}','${cstdate}','${time}', '${duration}', '${filename}', '${JSON.stringify(sellingOptions)}')`, (err, rows) => {
            if (!err) {
                console.log(rows)
                // Fetching the inserted row including selling_option
                sqlDbconnect.query(`SELECT * FROM course_detail WHERE id = ${rows.insertId}`, (err, fetchedRow) => {
                    if (!err) {
                        const fetchedSellingOptions = JSON.parse(fetchedRow[0].selling_option);
                        // Sending response to the client
                        res.status(200).json({ rows, fetchedSellingOptions });
                    } else {
                        console.log(err);
                        res.status(500).json({ error: 'Internal Server Error' });
                    }
                });
            } else {
                console.log(err);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
// end courses



// all speaker components 

Router.get("/api/Speaker", (req, res) => {
    sqlDbconnect.query("SELECT * FROM speaker_info", (err, rows) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    });
});

Router.post("/api/Speaker_add", upload.single("file"), (req, res) => {
    // insert data in contact form
    const username = req.body.name;
    const phone = req.body.phone;
    const email = req.body.email;
    const bio = req.body.bio;
    console.log(req.body, "<<<<")
    console.log("File Name is =  " + filename)
    sqlDbconnect.query(`INSERT INTO speaker_info (name, email, phone_no, bio, images) VALUES ('${username}','${email}', '${phone}' , '${bio}', '${filename}')`, (err, rows) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    });

});





Router.delete("/api/delete_speaker", (req, res) => {
    console.log(req.query.id, "<<>>")
    sqlDbconnect.query(`DELETE FROM speaker_info WHERE id = "${req.query.id}"`, (err, rows) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    });
})

// edit speaker
Router.get("/api/edit/:id", (req, res) => {
    const id = req.params.id;

    const query = "SELECT * FROM speaker_info WHERE id = ?";

    sqlDbconnect.query(query, [id], (err, result) => {
        if (err) return res.json({ Error: err });
        return res.json(result);
    });
});

// update speaker
Router.put('/api/update_speaker/:id', upload.single('image'), async (req, res) => {
    const { id } = req.params;
    const { name, email, phone_no, bio, designation, experience } = req.body;

    // Handle file upload
    const image = req.file ? req.file.originalname : null;

    // Update speaker data in the database
    const updateQuery = `
        UPDATE speaker_info
        SET name=?, email=?, phone_no=?, bio=?, designation=?, experience=?, images=?
        WHERE id=?
    `;

    sqlDbconnect.query(
        updateQuery,
        [name, email, phone_no, bio, designation, experience, image, id],
        (err, result) => {
            if (err) {
                console.error('Error updating speaker:', err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            // Check if the update was successful
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Speaker not found' });
            }

            // Respond with success
            res.status(200).json({ success: true, message: 'Speaker updated successfully' });
        }
    );
});


// end speaker component


// start copan



Router.get("/api/Coupan", (req, res) => {
    sqlDbconnect.query("SELECT * FROM sales_promotion_coupon", (err, rows) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    });
});


// edit copon
Router.get("/api/cu_edit/:id", (req, res) => {
    const id = req.params.id;
    const query = "SELECT * FROM sales_promotion_coupon WHERE id = ?";

    sqlDbconnect.query(query, [id], (err, result) => {
        if (err) return res.json({ error: err.message });
        return res.json(result);
    });
});

// update coppan
Router.put('/api/update_Coupon/:id', (req, res) => {
    const { id } = req.params;
    const { coupon_code, discount, start_date, expire_date, coupons_status, coupons_limit } = req.body;

    const updateQuery = `
      UPDATE sales_promotion_coupon
      SET coupon_code=?, discount=?, start_date=?, expire_date=?, coupons_status=?, coupons_limit=?
      WHERE id=?
    `;

    sqlDbconnect.query(
        updateQuery,
        [coupon_code, discount, start_date, expire_date, coupons_status, coupons_limit, id],
        (err, result) => {
            if (err) {
                console.error('Error updating coupon:', err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Coupon not found' });
            }

            res.status(200).json({ success: true, message: 'Coupon updated successfully' });
        }
    );
});

// delet coopan
Router.delete("/api/delete_Coupans", (req, res) => {
    console.log(req.query.id, "<<>>")
    sqlDbconnect.query(`DELETE FROM sales_promotion_coupon WHERE id = "${req.query.id}"`, (err, rows) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    });
})

Router.post('/api/InsertCoupons', (req, res) => {
    const { couponName, discountType, startDate, expiryDate, coupanlimit, status } = req.body;

    sqlDbconnect.query('INSERT INTO sales_promotion_coupon (coupon_code,discount,start_date,expire_date,coupons_status)VALUES (?, ?, ?, ?, ?)',
        [couponName, discountType, startDate, expiryDate, coupanlimit, status], (err, result) => {
            if (err) {
                console.error('Error inserting data into MySQL:', err);
                res.status(500).json({ error: 'Internal Server Error' });
            } else {
                console.log('Form data inserted into MySQL:', result);
                res.json({ message: 'Form data received and stored successfully' });
            }
        });
});


// end copon



Router.get("/api/Industary", (req, res) => {
    sqlDbconnect.query("SELECT * FROM industry", (err, rows) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    });
});


// start faq category

Router.get("/api/Faq_Category", (req, res) => {
    sqlDbconnect.query("SELECT * FROM faq_category", (err, rows) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    });
});

// edit faq category

Router.post('/api/Add_Category', (req, res) => {
    const { category } = req.body;

    // Check if category is provided
    if (!category) {
        return res.status(400).json({ success: false, error: 'Category is required' });
    }

    const sql = 'INSERT INTO faq_category (category) VALUES (?)';
    sqlDbconnect.query(sql, [category], (err, result) => {
        if (err) {
            console.error('Error inserting data into MySQL:', err);
            return res.status(500).json({ success: false, error: 'Internal Server Error', errorMessage: err.message });
        } else {
            console.log('Data inserted successfully');
            return res.json({ success: true, message: 'Data inserted successfully' });
        }
    });
});

// update category
Router.put('/api/Update_Category/:id', (req, res) => {
    try {
        const categoryId = req.params.id;
        const { category } = req.body;

        if (!category || typeof category !== 'string') {
            return res.status(400).json({ error: 'Invalid category data' });
        }

        const query = 'UPDATE faq_category SET category = ? WHERE id = ?';

        sqlDbconnect.query(query, [category, categoryId], (error, result) => {
            if (error) {
                console.error('Error updating category:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            } else {
                if (result.affectedRows > 0) {
                    res.json({ success: true, message: 'Category updated successfully' });
                } else {
                    res.status(404).json({ error: 'Category not found or no changes made' });
                }
            }
        });
    } catch (error) {
        console.error('Error updating category:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// end faq category


// start faq question

Router.get("/api/Faq_Question", (req, res) => {
    sqlDbconnect.query("SELECT * FROM faq", (err, rows) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    });
});


Router.post('/api/Add_question', (req, res) => {
    const { question, answer, category_id } = req.body;


    const sql = 'INSERT INTO faq (category_id,question,answer) VALUES (?,?,?)';
    sqlDbconnect.query(sql, [category_id,question,answer], (err, result) => {
        if (err) {
            console.error('Error inserting data into MySQL:', err);
            return res.status(500).json({ success: false, error: 'Internal Server Error', errorMessage: err.message });
        } else {
            console.log('Data inserted successfully');
            return res.json({ success: true, message: 'Data inserted successfully' });
        }
    });
});

// edit and update  question
Router.put('/api/Update_Question/:id', (req, res) => {
    const { category_id, question, answer } = req.body;
    const { id } = req.params;
    const sql = 'UPDATE faq SET category_id=?, question=?, answer=? WHERE id=?';
    sqlDbconnect.query(sql, [category_id, question, answer, id], (err, result) => {
      if (err) {
        console.error('Error updating data in MySQL:', err);
        res.status(500).json({ success: false, error: 'Internal Server Error', errorMessage: err.message });
      } else {
        res.json({ success: true, message: 'Data updated successfully' });
      }
    });
  });

//   end faq question


Router.get("/api/Order_Details", (req, res) => {
    sqlDbconnect.query("SELECT * FROM order_details", (err, rows) => {
        console.log(rows)
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    });
});


// Selling_option


Router.post('/api/AddSellingOption', (req, res) => {
    const { category, name, price } = req.body;

    const sql = 'INSERT INTO selling_options (selling_category, name, price) VALUES (?, ?, ?)';
    sqlDbconnect.query(sql, [category, name, price], (err, result) => {
        if (err) {
            console.error('Error inserting data into MySQL:', err);
            res.status(500).json({ success: false, error: err.message });
        } else {
            console.log('Data inserted successfully');
            res.json({ success: true, message: 'Data inserted successfully' });
        }
    });
});

// Endpoint to get all selling options
Router.get('/api/GetsellingOptions', (req, res) => {
    const sql = 'SELECT * FROM selling_options';
    sqlDbconnect.query(sql, (err, result) => {
        if (err) {
            console.error('Error fetching data from MySQL:', err);
            res.status(500).json({ success: false, error: err.message });
        } else {
            res.json(result);
        }
    });
});


// edit selling coopan

Router.get("/api/selling_edit/:id", (req, res) => {
    const id = req.params.id;
    const query = "SELECT * FROM selling_options WHERE id = ?";

    sqlDbconnect.query(query, [id], (err, result) => {
        if (err) return res.json({ error: err.message });
        return res.json(result);
    });
});




Router.put('/api/update_option/:id', (req, res) => {
    const { id } = req.params;
    const { selling_category, name, price } = req.body;
  
//   og the request body for debugging
console.log('Received data:', selling_category, name, price);
  
    const updateQuery = `
      UPDATE selling_options
      SET selling_category=?, name=?, price=?
      WHERE id=?`;
  
    sqlDbconnect.query(updateQuery, [selling_category, name, price, id], (err, result) => {
      if (err) {
        console.error('Error updating selling_option', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Selling option not found' });
      }
  
      res.status(200).json({ success: true, message: 'Selling option updated successfully' });
    });
  });
// end selling option

Router.get("/api/Testimonial", (req, res) => {
    sqlDbconnect.query("SELECT * FROM testimonial", (err, rows) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    });
});


Router.get("/api/Registration", (req, res) => {
    sqlDbconnect.query("SELECT * FROM registration", (err, rows) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    });
});

// Endpoint for user registration
Router.post('/api/NewRegistration', (req, res) => {
    const { firstName, lastName, username, email, password } = req.body;

    // Basic validation
    if (!firstName || !lastName || !username || !email || !password) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    // Check if the email is already registered
    sqlDbconnect.query('SELECT * FROM registration WHERE email = ?', [email], (error, results) => {
        if (error) {
            console.error('Error checking email:', error);
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }

        if (results.length > 0) {
            return res.status(400).json({ success: false, message: 'Email is already registered' });
        }

        // Insert user data into the "users" table
        sqlDbconnect.query('INSERT INTO registration (fname, lname, uname, email, password) VALUES (?, ?, ?, ?, ?)',
            [firstName, lastName, username, email, password],
            (insertError) => {
                if (insertError) {
                    console.error('Error inserting user data:', insertError);
                    return res.status(500).json({ success: false, message: 'Internal server error' });
                }

                console.log('User registered:', { firstName, lastName, username, email });

                // Respond with success
                res.status(200).json({ success: true, message: 'Registration successful' });
            });
    });
});

// Router.post("/api/Course_add", upload.single("file"), (req, res) => {

//     function makeString(val) {
//         const fields = JSON.parse(req.body.fields);
//         console.log(fields, "here are the fields")
//         let str = `INSERT INTO selling_options (selling_category, name, price, status, cid) VALUES`
//         for (let i = 0; i < fields.length; i++) {
//             if (i === 0) {
//                 str += ` ('${fields[i].category}','${fields[i].name}','${fields[i].price}', '${true}' , '${val}')`
//             } else {
//                 str += `, ('${fields[i].category}','${fields[i].name}','${fields[i].price}', '${true}' , '${val}')`
//             }

//         }
//         console.log(str)
//         return str;
//     }

//     console.log(req.body, filename, "<<>>", filet)
//     try {
//         sqlDbconnect.query(`INSERT INTO course_detail (industries, speaker, title, date, time, duration, course_thumbail) VALUES ('${req.body.industry}','${req.body.speaker}','${req.body.name}', '${req.body.cstdate}' , '${req.body.time}', '${req.body.duration}', '${filename}')`, (err, rows) => {
//             if (!err) {
//                 console.log(rows)
//                 sqlDbconnect.query(makeString(rows.insertId), (err, row) => {
//                     if (!err) {

//                         res.status(200).json({ rows, row });
//                     } else {
//                         console.log(err);
//                     }
//                 });
//             } else {
//                 console.log(err);
//             }
//         });


//     } catch (err) {
//         console.log(err)
//     }

// })





Router.get("/api/User_message", (req, res) => {
    sqlDbconnect.query("SELECT * FROM user_message", (err, rows) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    });
});

Router.get("/api/User_message", (req, res) => {
    sqlDbconnect.query("SELECT * FROM user_message", (err, rows) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    });
});


Router.post("/api/user_message", (req, res) => {

    const username = req.body.username;
    const phone = req.body.phone;
    const email = req.body.email;
    const message = req.body.message;
    var sql = `INSERT INTO user_message(Name,Email,Phone,Message)
        VALUES("${username}","${phone}","${email}","${message}")`;
    sqlDbconnect.query(sql, (err, result) => {
        if (!err) {
            res.status(200).json({ success: "ueser message send succesfully" });
        } else {
            console.log(err);
        }
    });
});
Router.post("/api/add_user", (req, res) => {
    console.log(req.body, "<<>>Body")
    let sql = `INSERT INTO user_info (company_name,name,email,password,number,city, job_profile, country, address, address2, state, pin_code, isActive) VALUES ("${req.body.CompanyName}", "${req.body.Name}", "${req.body.Email}", "", "${req.body.Phone}", "${req.body.City}", "${req.body.JobTitle}", "${req.body.Country}", "${req.body.Address1}", "${req.body.Address2}", "${req.body.State}", "${req.body.Zip}", "${0}")`
    sqlDbconnect.query(sql, (err, result) => {
        if (!err) {
            console.log("success")
            res.status(200).json({ success: "ueser message send succesfully", result: result, id: result.insertId });
        } else {
            console.log(err);
            res.status(500).json({ success: "There is some error" });
        }
    });

})

Router.post("/api/course_added", (req, res) => {
    console.log(req.body, "<<>>Body")

    let sql = `INSERT INTO courses_orders (course_id, customer_id, payment_status) VALUES ("${req.body.courseId}", "${req.body.userId}", "1")`
    sqlDbconnect.query(sql, (err, result) => {
        if (!err) {
            console.log("success")
            sqlDbconnect.query(`SELECT * FROM user_info WHERE id = ${req.body.userId}`, (er, res) => {
                if (!er) {
                    console.log("success")
                    let mailTransporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: 'itsyourabhay@gmail.com',
                            pass: 'eppb dskn plzj ggqs'
                        }
                    });
                    let random = generator.generateMultiple(1, {
                             length: 6,
                            uppercase: false,
                            numbers: true,
                            symbols: true
                   })[0];
            
               console.log(random)
                    let mailDetails = {
                        from: 'itsyourabhay@gmail.com',
                        to: `${res[0].email}`,
                        subject: 'Test mail',
                        html: `<!DOCTYPE html>
                        <html lang="en">
                        <head>
                            <meta charset="UTF-8">
                            <meta name="viewport" content="width=device-width, initial-scale=1.0">
                            <title>Document</title>
                        </head>
                        <body>
                            <h1>hello</h1>
                            <h2>username - </h2>
                            <h2>password - </h2>
                             <a href="http://localhost:3000/login">login Link</a>
                            
                        </body>
                        </html>`
                    };
            
                    mailTransporter.sendMail(mailDetails, function (err, data) {
                        if (err) {
                            console.log('Error Occurs');
                            res.status(500).json({ message: "Error" })
                        } else {
                            console.log('Email sent successfully');
                            res.status(200).json({ success: "ueser message send succesfully", result: result, id: result.insertId });
                        }
                    }) 

                   
                } else {
                    console.log(er);
                    res.status(500).json({ success: "There is some error" });
                }
            })
           
        } else {
            console.log(err);
            res.status(500).json({ success: "There is some error" });
        }
    });

})


Router.post("/api/sending_email", (req, res) => {
    console.log(req.body)


    try {
        let mailTransporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'itsyourabhay@gmail.com',
                pass: 'eppb dskn plzj ggqs'
            }
        });
        let random = generator.generateMultiple(1, {
	             length: 6,
            	uppercase: false,
                numbers: true,
                symbols: true
       })[0];

   console.log(random)
        let mailDetails = {
            from: 'itsyourabhay@gmail.com',
            to: `${req.body.email}`,
            subject: 'Test mail',
            html: `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Document</title>
            </head>
            <body>
                <h1>hello</h1>
                <h2>username - ${req.body.email}</h2>
                <h2>password - ${random}</h2>
                 <a href="http://localhost:3000/login">login Link</a>
                
            </body>
            </html>`
        };

        mailTransporter.sendMail(mailDetails, function (err, data) {
            if (err) {
                console.log('Error Occurs');
                res.status(500).json({ message: "Error" })
            } else {
                console.log('Email sent successfully');
                var sql = `UPDATE user_info SET password = "${random}"`;
                sqlDbconnect.query(sql, (err, result) => {
                    if (!err) {
                        console.log("Updated db successfully")
                        res.status(200).json({ success: "ueser message send succesfully" });
                    } else {
                        console.log(err);
                        res.status(500).json({ message: "Error" })
                    }
                });
            }
        })
    } catch (err) {
        res.status(500).json({ message: "Error" })
    }

})


Router.post("/api/user_info", (req, res) => {

    const username = req.body.username;
    const phone = req.body.phone;
    const email = req.body.email;
    const message = req.body.message;
    var sql = `INSERT INTO user_message(Name,Email,Phone,Message)
        VALUES("${username}","${phone}","${email}","${message}")`;
    sqlDbconnect.query(sql, (err, result) => {
        if (!err) {
            res.status(200).json({ success: "ueser message send succesfully" });
        } else {
            console.log(err);
        }
    });
});


Router.get("/api/payment_success", (req, res) => {
    console.log(req.body, "<<<< Yaha")
    res.send("hi")
})

Router.get("/api/industry", (req, res) => {
    try {
        sqlDbconnect.query("SELECT * FROM industry", (err, result) => {
            if (!err) {
                res.status(200).json(result);
            } else {
                console.log(err);
            }
        });
    } catch (err) {

    }
})
Router.get("/api/speaker", (req, res) => {
    try {
        sqlDbconnect.query("SELECT * FROM speaker_info", (err, result) => {
            if (!err) {
                res.status(200).json(result);
            } else {
                console.log(err);
            }
        });
    } catch (err) {

    }
})

// add to cart api

Router.get("/api/Add_cart", (req, res) => {
    try {


        sqlDbconnect.query("SELECT * FROM add_to_cart", (err, result) => {
            if (!err) {
                res.status(200).json(result);
            } else {
                console.log(err);
            }
        });
    } catch (err) {

    }
})


// API endpoint to add to the cart
Router.post('/api/addToCart', (req, res) => {
    console.log(req.body);
    const { title, pr } = req.body;
    sqlDbconnect.query('delete from add_to_cart', function (err, result) {

    })
    var sql = `INSERT INTO add_to_cart(course_name,price)
        VALUES("${title}","${pr}")`;
    sqlDbconnect.query(sql, (err, result) => {
        if (!err) {
            res.status(200).json({ success: "ueser message send succesfully", mydata: req.body });
        } else {
            console.log(err);
        }
    });
});

Router.get("/api/Subscribe", (req, res) => {
    sqlDbconnect.query("select * from  subscribe", (err, rows) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    });
});


Router.post('/api/NewSubscribe', (req, res) => {
    const { email } = req.body;

    if (!email || !isValidEmail(email)) {
        return res.status(400).json({ success: false, message: 'Invalid email address.' });
    }

    // Check if the email already exists in the database
    const checkEmailQuery = 'SELECT * FROM subscribe WHERE email = ?';
    sqlDbconnect.query(checkEmailQuery, [email], (err, results) => {
        if (err) {
            console.error('Error checking email:', err);
            return res.status(500).json({ success: false, message: 'Internal server error.' });
        }

        if (results.length > 0) {
            // Email already exists in the database
            return res.status(200).json({ success: false, message: 'Email is already subscribed.' });
        }

        // Email does not exist, save it to the database
        const insertQuery = 'INSERT INTO subscribe (email) VALUES (?)';
        sqlDbconnect.query(insertQuery, [email], (err) => {
            if (err) {
                console.error('Error inserting into database:', err);
                return res.status(500).json({ success: false, message: 'Internal server error.' });
            }

            // Successfully subscribed
            res.status(200).json({ success: true, message: 'You have successfully subscribed for our Newsletter.' });
        });
    });
});

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}


Router.get("/api/GetContact_Details", (req, res) => {
    sqlDbconnect.query("SELECT * FROM contact_details", (err, rows) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    });
});


Router.post("/api/Contact_Details", (req, res) => {

    const username = req.body.name;
    const phone = req.body.phone;
    const email = req.body.email;
    const message = req.body.message;
    sqlDbconnect.query('insert into contact_details(name,phone,email,message)values(?,?,?,?)', [username,phone,email,message],(err, result) => {
        if(!err) {
            res.status(200).json({ success: "ueser message send succesfully" });
        } else {
            console.log(err);
        }
    });
});



module.exports = Router;