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
            
            req.session.user = data[0].email
            return res.json({ status: "success" });
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

Router.get("/api/Speaker", (req, res) => {
    sqlDbconnect.query("SELECT * FROM speaker_info", (err, rows) => {
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
Router.get("/api/Coupan", (req, res) => {
    sqlDbconnect.query("SELECT * FROM sales_promotion_coupon", (err, rows) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    });
});
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


Router.get("/api/Industary", (req, res) => {
    sqlDbconnect.query("SELECT * FROM industry", (err, rows) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    });
});

Router.get("/api/Faq_Category", (req, res) => {
    sqlDbconnect.query("SELECT * FROM faq_category", (err, rows) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    });
});

Router.get("/api/Faq_Question", (req, res) => {
    sqlDbconnect.query("SELECT * FROM faq", (err, rows) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    });
});
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

Router.get("/api/Selling", (req, res) => {

    const query = req.query.id;
    console.log(query, "<<")
    sqlDbconnect.query(`SELECT * FROM selling_options WHERE cid = ${query}`, (err, rows) => {
        console.log(rows)
        if (!err) {
            sqlDbconnect.query(`SELECT * FROM Course_detail WHERE id = ${query}`, (er, row) => {
                console.log(row)
                if (!er) {

                    res.send([row, rows]);
                } else {
                    console.log(er);
                }
            });

        } else {
            console.log(err);
        }
    });
})

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

Router.post("/api/Course_add", upload.single("file"), (req, res) => {

    function makeString(val) {
        const fields = JSON.parse(req.body.fields);
        console.log(fields, "here are the fields")
        let str = `INSERT INTO selling_options (selling_category, name, price, status, cid) VALUES`
        for (let i = 0; i < fields.length; i++) {
            if (i === 0) {
                str += ` ('${fields[i].category}','${fields[i].name}','${fields[i].price}', '${true}' , '${val}')`
            } else {
                str += `, ('${fields[i].category}','${fields[i].name}','${fields[i].price}', '${true}' , '${val}')`
            }

        }
        console.log(str)
        return str;
    }

    console.log(req.body, filename, "<<>>", filet)
    try {
        sqlDbconnect.query(`INSERT INTO course_detail (industries, speaker, title, date, time, duration, course_thumbail) VALUES ('${req.body.industry}','${req.body.speaker}','${req.body.name}', '${req.body.cstdate}' , '${req.body.time}', '${req.body.duration}', '${filename}')`, (err, rows) => {
            if (!err) {
                console.log(rows)
                sqlDbconnect.query(makeString(rows.insertId), (err, row) => {
                    if (!err) {

                        res.status(200).json({ rows, row });
                    } else {
                        console.log(err);
                    }
                });
            } else {
                console.log(err);
            }
        });


    } catch (err) {
        console.log(err)
    }

})

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


Router.get("", (req, res) => {
    sqlDbconnect.query("SELECT * FROM sales_promotion_coupon", (err, rows) => {
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