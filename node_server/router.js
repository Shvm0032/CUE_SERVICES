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
const { json } = require("body-parser");
const { sendEmail } = require("./lib/mail");
const { sendInvoiceEmail } = require("./lib/invoiceEmail");
const util = require('util');
const moment = require('moment');
// const { Route } = require("react-browser-router");
dotenv.config();

var filename = "";
var filet = "";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, "./public")
    },
    filename: function (req, file, cb) {
        filename = crypto.randomBytes(10).toString('hex') + '_' + file.originalname
        //file = file;
        return cb(null, filename)
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
var path = require('path');
Router.use(express.static(path.join(__dirname, 'public')));


// admin login

Router.post('/api/admin_login', (req, res) => {
    try {
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
    }
    catch (err) {
        console.log(err);
        res.status(502).json({ error: 'Internal Server Error' });
    }
});



// Login route
Router.post('/api/getLogin', (req, res) => {
    try {
        const { email, password } = req.body;

        // Basic validation
        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }

        const sqlQuery = "SELECT * FROM  registration WHERE email = ? AND password = ?";
        sqlDbconnect.query(sqlQuery, [req.body.email, req.body.password], (err, data) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ success: false, error: 'Internal Server Error' });
            }
            if (data.length > 0) {

                let jwtSecretKey = process.env.JWT_SECRET_KEY;
                let dataToken = {
                    time: Date(),
                    userId: data[0].id,
                }
                const token = jwt.sign(dataToken, jwtSecretKey, { expiresIn: 7200 });
                return res.json({ success: true, data: token, message: "you are logged in." });
            } else {
                return res.json({ success: false, message: "No record Existed" });
            }
        });
    }
    catch (err) {
        console.log(err);
        res.status(502).json({ error: 'Internal Server Error' });
    }
});


Router.post('/api/logout', (req, res) => {
    try {
        // Destroy the session
        req.session.destroy(err => {
            if (err) {
                console.error('Error destroying session:', err);
                return res.status(500).json({ success: false, message: 'Internal server error' });
            }

            // Respond with success
            return res.json({ success: true, message: 'Logout successful' });
        });
    }
    catch (err) {
        console.log(err);
        res.status(502).json({ error: 'Internal Server Error' });
    }
});

Router.get('/Dashboard', (req, res) => {
    try {
        // Check if the user is authenticated (session exists)
        if (req.session && req.session.user) {
            // Render your dashboard page or send a response indicating success
            return res.json({ success: true, message: 'Dashboard page' });
        } else {
            // Redirect to the login page if the user is not authenticated
            return res.redirect('/login');
        }
    }
    catch (err) {
        console.log(err);
        res.status(502).json({ error: 'Internal Server Error' });
    }
});

Router.get("/", (req, res) => {
    res.send({ message: "hello" });

});

Router.get("/api/Course", (req, res) => {
    try {
        sqlDbconnect.query("select * from  course_detail where status = 1", (err, rows) => {
            console.log(rows)
            if (!err) {
                res.send(rows);
            } else {
                console.log(err);
            }
        });
    }
    catch (err) {
        console.log(err);
        res.status(502).json({ error: 'Internal Server Error' });
    }
});



Router.delete("/api/delete_course", async (req, res) => {
    try {
        const queryAsync = util.promisify(sqlDbconnect.query).bind(sqlDbconnect);
        console.log(req.query.id, "<<>>");

        const itemValuesU = [
            0,
            req.query.id
        ];

        const updateCourseQueryc = ` UPDATE course_detail SET status = ? WHERE id = ?`;
        let response = await queryAsync(updateCourseQueryc, itemValuesU);
        if (!response) {
            return res.send({ rows, row });

        } else {
            return res.send({ error: "course not deleted" });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(502).json({ error: 'Internal Server Error' });
    }
});

Router.get('/api/coursesData', (req, res) => {
    try {
        const moment = require('moment-timezone');
        const query = `SELECT * FROM course_detail LEFT OUTER JOIN speaker_info ON course_detail.speaker = speaker_info.speaker_id;`;

        sqlDbconnect.query(query, (error, results) => {
            if (error) {
                console.error(error);
                res.status(500).send('Internal Server Error');
            } else {
                

                let updatedResults = results.map(res=>{
                    const timeIST = moment.tz(res.time, 'HH:mm:ss', 'Asia/Kolkata');
                    const timeEST = timeIST.clone().tz('America/New_York');
                    const timeCST = timeIST.clone().tz('America/Chicago');
                    const timeMST = timeIST.clone().tz('America/Denver');
                    const timePST = timeIST.clone().tz('America/Los_Angeles');
                    res.est_time = timeEST.format('HH:mm:ss A');
                    res.cst_time = timeCST.format('HH:mm:ss A');
                    res.mst_time = timeMST.format('HH:mm:ss A');
                    res.pst_time = timePST.format('HH:mm:ss A');
                    return res;
                });
                console.log(results,'results')
                res.json(updatedResults);

            }
        });
    }
    catch (err) {
        console.log(err);
        res.status(502).json({ error: 'Internal Server Error' });
    }
});

Router.get('/api/coursesData/:id', (req, res) => {
    const courseId = req.params.id;
    try {
        const query = `SELECT * FROM course_detail 
                       LEFT OUTER JOIN speaker_info ON course_detail.speaker = speaker_info.speaker_id
                       WHERE course_detail.id = ?`;

        sqlDbconnect.query(query, [courseId], (error, results) => {
            if (error) {
                console.error(error);
                res.status(500).send('Internal Server Error');
            } else {
                if (results.length > 0) {
                    res.json(results[0]); // Assuming you want to send the first row if found
                } else {
                    res.status(404).json({ error: 'Course not found' });
                }
            }
        });
    } catch (err) {
        console.log(err);
        res.status(502).json({ error: 'Internal Server Error' });
    }
});


Router.get('/api/coursesData', (req, res) => {
    try {
        const query = `SELECT * FROM course_detail LEFT OUTER JOIN speaker_info ON course_detail.speaker = speaker_info.speaker_id;`;

        sqlDbconnect.query(query, (error, results) => {
            if (error) {
                console.error(error);
                res.status(500).send('Internal Server Error');
            } else {
                console.log(results,'results');
                res.json(results);

            }
        });
    }
    catch (err) {
        console.log(err);
        res.status(502).json({ error: 'Internal Server Error' });
    }
});


Router.post("/api/Course_add", upload.single("file"), async (req, res) => {

    try {
        
       
        const { industry, speaker, name, description, duration, time, cstdate, fields, slug } = req.body;
        const filename = req.file.filename; // Assuming your file is uploaded correctly
        const fieldsData = JSON.parse(fields);
        console.log(fieldsData, 'fieldsData');
        // Extracting selling options data from fieldsData
        let sellingOptions = fieldsData.map(option => ({
            id: option.id,
            category: option.category,
            name: option.name,
            price: option.price
        }));
        // sellingOptions = JSON.stringify(sellingOptions);
        // Inserting data into the database, including the new selling_option column
        const insertQuery = `INSERT INTO course_detail (industries, speaker,title, description, date, time, duration, course_thumbail, selling_option,slug) 
                             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const insertValues = [industry, speaker, name, description, cstdate, time, duration, filename, JSON.stringify(sellingOptions), slug];

        const rows = await new Promise((resolve, reject) => {
            sqlDbconnect.query(insertQuery, insertValues, (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        });

        console.log(rows)
        // Fetching the inserted row including selling_option
        const fetchedRow = await new Promise((resolve, reject) => {
            sqlDbconnect.query(`SELECT * FROM course_detail WHERE id = ?`, [rows.insertId], (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        });

        const fetchedSellingOptions = JSON.parse(fetchedRow[0].selling_option);
        // Sending response to the client
        res.status(200).json({ message: 'Course added successfully', rows, fetchedSellingOptions });
    } catch (err) {
        console.log(err);
        res.status(502).json({ error: 'Internal Server Error' });
    }
});


Router.get("/api/edit/:course_id", (req, res) => {
    try {
        const id = req.params.course_id;
        const query = "SELECT * FROM course_detail WHERE id = ? AND status IN (?)";
        sqlDbconnect.query(query, [id, [1, 2]], (err, result) => {
            if (err) return res.json({ Error: err });
            return res.json(result);
        });
    }
    catch (err) {
        console.log(err);
        res.status(502).json({ error: 'Internal Server Error' });
    }

});


Router.post('/api/update/:course_id', upload.single('file'), async (req, res) => {
    try {

        const courseId = req.params.course_id;
        const { industry, speaker, title, description, duration, time, date, fields } = req.body;
        //const course_thumbnail = req.course_thumbnail ? req.course_thumbnail.buffer : null; // Assuming 'thumbnail' is the name of the file input in your form
        const course_thumbnail = req?.file?.filename || null;
        let updateCourseQuery = `
      UPDATE course_detail
      SET industries = ?, speaker = ?, title = ?, description = ?, duration = ?, time = ?, date = ?, selling_option = ?
      WHERE id = ?
    `;

        const fieldsData = JSON.parse(fields);
        console.log(req.body, 'fieldsData');
        console.log(req.file, 'thumbnail')
        // Extracting selling options data from fieldsData
        const sellingOptions = fieldsData.map(option => ({
            category: option.category,
            name: option.name,
            price: option.price
        }));
        valueArray = [
            industry,
            speaker,
            title,
            description,
            duration,
            time,
            date,
            JSON.stringify(sellingOptions),
            courseId
        ];
        if (course_thumbnail) {
            updateCourseQuery = `
      UPDATE course_detail
      SET industries = ?, speaker = ?, title = ?, description = ?, duration = ?, time = ?, date = ?,course_thumbail = ?, selling_option = ?
      WHERE id = ?
    `;
            valueArray = [
                industry,
                speaker,
                title,
                description,
                duration,
                time,
                date,
                course_thumbnail,
                JSON.stringify(sellingOptions),
                courseId
            ];
        }
        await sqlDbconnect.query(updateCourseQuery, valueArray);

        res.status(200).send('Course updated successfully!');
    } catch (error) {
        console.error('Error updating course:', error);
        res.status(502).send('Internal Server Error');
    }
});







// end courses



// all speaker components 


Router.get("/api/Speaker", (req, res) => {
    try {
        sqlDbconnect.query("SELECT * FROM speaker_info WHERE status = 1", (err, rows) => {
            if (!err) {
                return res.json({ success: true, data: rows, message: "getting all speaker" });
                // res.send(rows);
            } else {
                return res.json({ success: false });
                console.log(err);
            }
        });
    }
    catch (error) {
        console.error('Error updating course:', error);
        res.status(502).send('Internal Server Error');
    }
});

Router.post("/api/Speaker_add", upload.single("file"), (req, res) => {
    try {
        // insert data in contact form
        const username = req.body.name;
        const phone = req.body.phone;
        const email = req.body.email;
        const bio = req.body.bio;
        const designation = req.body.designation;
        const experience = req.body.experience;

        // Get the original name of the uploaded file
        const filename = req.file ? req.file.filename : null;

        console.log(req.body, "<<<<");
        console.log("File Name is =  " + filename);

        // Use parameterized query to prevent SQL injection
        const insertQuery = "INSERT INTO speaker_info (name, email, phone_no, bio, images, designation, experience) VALUES (?, ?, ?, ?, ?, ?, ?)";

        sqlDbconnect.query(insertQuery, [username, email, phone, bio, filename, designation, experience], (err, rows) => {
            if (!err) {
                res.json({ success: true, message: 'Speaker added successfully!' });
            } else {
                console.log(err);
                res.status(500).json({ success: false, message: 'Internal Server Error' });
            }
        });
    }
    catch (error) {
        console.error('Error updating course:', error);
        res.status(502).send('Internal Server Error');
    }
});


Router.delete("/api/delete_speaker", async (req, res) => {
    try {
        const queryAsync = util.promisify(sqlDbconnect.query).bind(sqlDbconnect);
        console.log(req.query.id, "<<>>");

        const itemValuesU = [
            0,
            req.query.id
        ];
        const updateCourseQueryc = `UPDATE speaker_info SET status = ? WHERE speaker_id = ?`;
        let response = await queryAsync(updateCourseQueryc, itemValuesU);
        if (response.affectedRows > 0) {
            return res.status(200).send({ success: true, message: "Speaker deleted successfully" });
        } else {
            return res.status(404).send({ success: false, error: "Speaker not found or not deleted" });
        }
    }
    catch (error) {
        console.error('Error updating course:', error);
        res.status(502).send('Internal Server Error');
    }
})



// edit speaker
Router.get("/api/speaker/edit/:speaker_id", (req, res) => {
    try {
        const id = req.params.speaker_id;
        console.log(id, 'id');
        const query = "SELECT * FROM speaker_info WHERE speaker_id = ? AND status =1";
        sqlDbconnect.query(query, [id, [1, 2]], (err, result) => {
            if (err) return res.json({ Error: err });
            return res.json(result);
        });
    }
    catch (error) {
        console.error('Error updating course:', error);
        res.status(502).send('Internal Server Error');
    }

});



Router.get("/api/profile", (req, res) => {
    try {
        let token = req.headers.authorization;
        if (token && token.startsWith('Bearer ')) {
            token = token.slice(7, token.length);
        }
        let jwtSecretKey = process.env.JWT_SECRET_KEY;
        const decoded = jwt.verify(token, jwtSecretKey);

        if (!decoded) {
            return res.json([]);
        }
        //const jwt = require('jsonwebtoken');


        const id = decoded.userId;
        console.log(id, 'headers');
        const query = "SELECT * FROM registration WHERE id = ?";

        sqlDbconnect.query(query, [id], (err, result) => {
            if (err) return res.json({ error: err.message });
            console.log(result);
            return res.json(result);
        });
    }
    catch (error) {
        console.error('Error updating course:', error);
        res.status(502).send('Internal Server Error');
    }

});

// update speaker
Router.post('/api/update_speaker/:speaker_id', upload.single('image'), async (req, res) => {
    try {
        const { speaker_id } = req.params;
        const { name, email, phone_no, bio, designation, experience } = req.body;
        console.log(res.body)
        // Handle file upload
        const image = req.file ? req.file.filename : null;

        let updateQuery = `
        UPDATE speaker_info
        SET name=?, email=?, phone_no=?, bio=?, designation=?, experience=?
        WHERE speaker_id=?`;
        valueArray = [name, email, phone_no, bio, designation, experience, speaker_id];
        
        if (image) {
            updateQuery = `
        UPDATE speaker_info
        SET name=?, email=?, phone_no=?, bio=?, designation=?, experience=?, images=?
        WHERE speaker_id=?`;
            valueArray = [name, email, phone_no, bio, designation, experience, image, speaker_id];
        }

        //  console.log(valueArray,'valueArray');
        sqlDbconnect.query(
            updateQuery,
            valueArray,
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
    }
    catch (error) {
        console.error('Error updating course:', error);
        res.status(502).send('Internal Server Error');
    }
});


// end speaker component


// start copan


Router.post('/api/check-coupon', (req, res) => {
    try {
        const { couponCode } = req.body;

        // Query the database to check if the coupon code exists
        sqlDbconnect.query(
            'SELECT * FROM sales_promotion_coupon WHERE coupon_code = ?',
            [couponCode],
            (err, results) => {
                if (err) {
                    console.error('MySQL query error:', err);
                    res.status(500).send('Internal Server Error');
                }
                else {
                    if (results.length > 0) {
                        // Coupon code exists
                        res.json({ valid: true, discount: results[0].discount });
                    } else {
                        // Coupon code does not exist
                        res.json({ valid: false });
                    }
                }
            }
        );
    }
    catch (error) {
        console.error('Error updating course:', error);
        res.status(502).send('Internal Server Error');
    }
});



Router.get("/api/Coupan", (req, res) => {
    try {
        sqlDbconnect.query("SELECT * FROM sales_promotion_coupon where status = 1", (err, rows) => {
            if (!err) {
                res.send(rows);
            } else {
                console.log(err);
            }
        });
    }
    catch (error) {
        console.error('Error updating course:', error);
        res.status(502).send('Internal Server Error');
    }
});

// edit copon
Router.get("/api/cu_edit/:id", (req, res) => {
    try {
        const id = req.params.id;
        const query = "SELECT * FROM sales_promotion_coupon WHERE id = ?";

        sqlDbconnect.query(query, [id], (err, result) => {
            if (err) return res.json({ error: err.message });
            return res.json(result);
        });
    } catch (error) {
        console.error('Error updating course:', error);
        res.status(502).send('Internal Server Error');
    }

});

// update coppan
Router.post('/api/update_Coupon/:id', (req, res) => {
    try {
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
    }
    catch (error) {
        console.error('Error updating course:', error);
        res.status(502).send('Internal Server Error');
    }
});

// delet coopan
Router.delete("/api/delete_Coupans", async (req, res) => {
    try {
        const queryAsync = util.promisify(sqlDbconnect.query).bind(sqlDbconnect);
        console.log(req.query.id, "<<>>");

        const itemValuesU = [
            0,
            req.query.id
        ];
        const updateIndustryQuery = `UPDATE sales_promotion_coupon SET status = ? WHERE id = ?`;
        let response = await queryAsync(updateIndustryQuery, itemValuesU);
        if (response.affectedRows > 0) {
            return res.status(200).send({ success: true, message: " Coupan deleted successfully" });
        } else {
            return res.status(404).send({ success: false, error: "Coupan not found or not deleted" });
        }

    }
    catch (error) {
        console.error('Error updating course:', error);
        res.status(502).send('Internal Server Error');
    }
})

Router.post('/api/InsertCoupons', (req, res) => {
    try {
        const { couponName, discountType, startDate, expiryDate, coupanlimit, status } = req.body;

        sqlDbconnect.query('INSERT INTO sales_promotion_coupon (coupon_code,discount,start_date,expire_date,coupons_limit,coupons_status)VALUES (?, ?, ?, ?,?, ?)',
            [couponName, discountType, startDate, expiryDate, coupanlimit, status], (err, result) => {
                if (err) {
                    console.error('Error inserting data into MySQL:', err);
                    res.status(500).json({ error: 'Internal Server Error' });
                } else {
                    console.log('Form data inserted into MySQL:', result);
                    res.json({ message: 'Form data received and stored successfully' });
                }
            });
    }
    catch (error) {
        console.error('Error updating course:', error);
        res.status(502).send('Internal Server Error');
    }
});


// end copon



Router.get("/api/Industary", (req, res) => {

    try {

        sqlDbconnect.query("SELECT * FROM industry where status = 1", (err, rows) => {
            if (!err) {
                res.send(rows);
            } else {
                console.log(err);
            }
        });
    }
    catch (error) {
        console.error('Error updating course:', error);
        res.status(502).send('Internal Server Error');
    }
});


Router.delete("/api/delete_industry", async (req, res) => {
    try {
        const queryAsync = util.promisify(sqlDbconnect.query).bind(sqlDbconnect);
        console.log(req.query.id, "<<>>");

        const itemValuesU = [
            0,
            req.query.id
        ];
        const updateIndustryQuery = `UPDATE industry SET status = ? WHERE id = ?`;
        let response = await queryAsync(updateIndustryQuery, itemValuesU);
        if (response.affectedRows > 0) {
            return res.status(200).send({ success: true, message: "Industry deleted successfully" });
        } else {
            return res.status(404).send({ success: false, error: "Industry not found or not deleted" });
        }
    } catch (err) {
        console.error(err);
        return res.status(502).json({ error: 'Internal Server Error' });
    }
});

Router.post("/api/Industary_add", upload.single("file"), (req, res) => {
    try {
        // insert data in contact form
        const industry_name = req.body.industry_name;
        const filename = req.file.filename; // Assuming you are trying to get the uploaded file name

        console.log(req.body, "<<<<");
        console.log("File Name is = " + filename);

        sqlDbconnect.query(
            `INSERT INTO industry (industry_name, image) VALUES ('${industry_name}', '${filename}')`,
            (err, result) => {
                if (!err) {
                    res.json({ success: true, message: "Industry added successfully", data: result });
                } else {
                    console.error(err);
                    res.status(500).json({ error: "Internal Server Error" });
                }
            }
        );
    }
    catch (error) {
        console.error('Error updating course:', error);
        res.status(502).send('Internal Server Error');
    }
});

Router.post('/api/edite_industry/:id', upload.single('image'), (req, res) => {
    try {
        const industryId = req.params.id;
        const { industry_name } = req.body;
        const image = req.file ? req.file.filename : null; // The uploaded image file

        if (!industry_name || typeof industry_name !== 'string') {
            return res.status(400).json({ error: 'Invalid industry data' });
        }

        let query = `UPDATE industry SET industry_name = ? WHERE id = ?`;
        valueArray = [industry_name, industryId]


        if (image) {
             query = `UPDATE industry SET industry_name = ?, image = ? WHERE id = ?`;
            valueArray = [industry_name, image, industryId]


        }

        sqlDbconnect.query(query, valueArray, (error, result) => {
            if (error) {
                console.error('Error updating industry:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            } else {
                if (result.affectedRows > 0) {
                    res.json({ success: true, message: 'Industry updated successfully' });
                } else {
                    res.status(404).json({ error: 'Industry not found or no changes made' });
                }
            }
        });
    } catch (error) {
        console.error('Error updating industry:', error);
        res.status(502).json({ error: 'Internal Server Error' });
    }
});



// start faq category

Router.get("/api/Faq_Category", (req, res) => {
    try {
        sqlDbconnect.query("SELECT * FROM faq_category where status=1", (err, rows) => {
            if (!err) {
                res.send(rows);
            } else {
                console.log(err);
            }
        });
    }
    catch (error) {
        console.error('Error updating industry:', error);
        res.status(502).json({ error: 'Internal Server Error' });
    }
});

// edit faq category

Router.post('/api/Add_Category', (req, res) => {
    try {
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
    }
    catch (error) {
        console.error('Error updating industry:', error);
        res.status(502).json({ error: 'Internal Server Error' });
    }
});

// update category
Router.post('/api/Update_Category/:id', (req, res) => {
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
        res.status(502).json({ error: 'Internal Server Error' });
    }
});

// end faq category

// start faq question

Router.get("/api/Faq_Question", (req, res) => {
    try {
        sqlDbconnect.query("SELECT * FROM faq where status = 1 ", (err, rows) => {
            if (!err) {
                res.send(rows);
            } else {
                console.log(err);
            }
        });
    } catch (error) {
        console.error('Error updating category:', error);
        res.status(502).json({ error: 'Internal Server Error' });
    }
});

// Delete FAQ Category
Router.delete("/api/delete_FaqCategory", async (req, res) => {
    try {
        const queryAsync = util.promisify(sqlDbconnect.query).bind(sqlDbconnect);
        console.log(req.query.id, "<<>>");

        const itemValuesU = [
            0,
            req.query.id
        ];
        const updateIndustryQuery = `UPDATE faq_category SET status = ? WHERE id = ?`;
        let response = await queryAsync(updateIndustryQuery, itemValuesU);
        if (response.affectedRows > 0) {
            return res.status(200).send({ success: true, message: "Faq Catagory deleted successfully" });
        } else {
            return res.status(404).send({ success: false, error: "Faq Catagory not found or not deleted" });
        }

    }
    catch (error) {
        console.error('Error updating course:', error);
        res.status(502).send('Internal Server Error');
    }
})


// Delete FAQ question
Router.delete("/api/delete_FaqQuestion", async (req, res) => {
    try {
        const queryAsync = util.promisify(sqlDbconnect.query).bind(sqlDbconnect);
        console.log(req.query.id, "<<>>");

        const itemValuesU = [
            0,
            req.query.id
        ];
        const updateIndustryQuery = `UPDATE faq SET status = ? WHERE id = ?`;
        let response = await queryAsync(updateIndustryQuery, itemValuesU);
        if (response.affectedRows > 0) {
            return res.status(200).send({ success: true, message: " Question deleted successfully" });
        } else {
            return res.status(404).send({ success: false, error: "Question not found or not deleted" });
        }

    }
    catch (error) {
        console.error('Error updating course:', error);
        res.status(502).send('Internal Server Error');
    }
})



Router.post('/api/Add_question', (req, res) => {
    try {
        const { question, answer, category_id } = req.body;


        const sql = 'INSERT INTO faq (category_id,question,answer) VALUES (?,?,?)';
        sqlDbconnect.query(sql, [category_id, question, answer], (err, result) => {
            if (err) {
                console.error('Error inserting data into MySQL:', err);
                return res.status(500).json({ success: false, error: 'Internal Server Error', errorMessage: err.message });
            } else {
                console.log('Data inserted successfully');
                return res.json({ success: true, message: 'Data inserted successfully' });
            }
        });
    } catch (error) {
        console.error('Error updating category:', error);
        res.status(502).json({ error: 'Internal Server Error' });
    }
});

// edit and update  question
Router.post('/api/Update_Question/:id', (req, res) => {
    try {
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
    }
    catch (error) {
        console.error('Error updating category:', error);
        res.status(502).json({ error: 'Internal Server Error' });
    }
});

//   end faq question

Router.get("/api/faq/Get", (req, res) => {
    try {

        let sql = `SELECT * FROM faq_category LEFT OUTER JOIN faq ON faq_category.id = faq.category_id;`;

        sqlDbconnect.query(sql, (err, rows) => {
            if (!err) {
                // Transform the data
                const transformedData = transformData(rows);

                // Send the transformed data in the response
                res.send(transformedData);
            } else {
                console.log(err);
            }
        });
    }
    catch (error) {
        console.error('Error updating category:', error);
        res.status(502).json({ error: 'Internal Server Error' });
    }
});

// Function to transform the data
function transformData(data) {

    console.log(data, 'data');
    const transformedResult = [];

    // Group data by category_id
    const groupedData = data.reduce((acc, item) => {
        const category_id = item.category_id;

        if (!acc[category_id]) {
            acc[category_id] = [];
        }

        acc[category_id].push({
            question: item.question || '',
            answer: item.answer || ''
        });

        return acc;
    }, {});

    // Create the final transformed result
    for (const category_id in groupedData) {
        const categoryData = groupedData[category_id];
        const categoryInfo = data.find(item => item.category_id === category_id);
        if (categoryInfo) {
            transformedResult.push({
                category: categoryInfo.category || '',
                items: categoryData
            });
        }

    }
    return transformedResult;


}



Router.get("/api/Order_Details", (req, res) => {
    try {
        sqlDbconnect.query("SELECT * FROM order_details", (err, rows) => {
            console.log(rows)
            if (!err) {
                res.send(rows);
            } else {
                console.log(err);
            }
        });
    }
    catch (error) {
        console.error('Error updating category:', error);
        res.status(502).json({ error: 'Internal Server Error' });
    }
});
Router.get('/api/order_details/:id', (req, res) => {
    const Id = req.params.id;
    try {
        const query = `SELECT * FROM order_details WHERE id = ?`;

        sqlDbconnect.query(query, [Id], (error, results) => {
            if (error) {
                console.error(error);
                res.status(500).send('Internal Server Error');
            } else {
                if (results.length > 0) {
                    res.json(results[0]); // Assuming you want to send the first row if found
                } else {
                    res.status(404).json({ error: 'Course not found' });
                }
            }
        });
    } catch (err) {
        console.log(err);
        res.status(502).json({ error: 'Internal Server Error' });
    }
});



// Selling_option

Router.post('/api/AddSellingOption', (req, res) => {
    try {
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
    }
    catch (error) {
        console.error('Error updating category:', error);
        res.status(502).json({ error: 'Internal Server Error' });
    }
});

// Endpoint to get all selling options
Router.get('/api/GetsellingOptions', (req, res) => {
    try {
        const sql = 'SELECT * FROM selling_options where status = 1';
        sqlDbconnect.query(sql, (err, result) => {
            if (err) {
                console.error('Error fetching data from MySQL:', err);
                res.status(500).json({ success: false, error: err.message });
            } else {
                res.json(result);
            }
        });
    }
    catch (error) {
        console.error('Error updating category:', error);
        res.status(502).json({ error: 'Internal Server Error' });
    }
});

// Delete FAQ question
Router.delete("/api/DeleteSellingOption", async (req, res) => {
    try {
        const queryAsync = util.promisify(sqlDbconnect.query).bind(sqlDbconnect);
        console.log(req.query.id, "<<>>");

        const itemValuesU = [
            0,
            req.query.id
        ];
        const updateIndustryQuery = `UPDATE selling_options SET status = ? WHERE id = ?`;
        let response = await queryAsync(updateIndustryQuery, itemValuesU);
        if (response.affectedRows > 0) {
            return res.status(200).send({ success: true, message: "Selling Option deleted successfully" });
        } else {
            return res.status(404).send({ success: false, error: "Selling Option not found or not deleted" });
        }

    }
    catch (error) {
        console.error('Error updating Selling Option:', error);
        res.status(502).send('Internal Server Error');
    }
})


// edit selling coopan
Router.get("/api/selling_edit/:id", (req, res) => {
    try {
        const id = req.params.id;
        const query = "SELECT * FROM selling_options WHERE id = ?";

        sqlDbconnect.query(query, [id], (err, result) => {
            if (err) return res.json({ error: err.message });
            return res.json(result);
        });
    }
    catch (error) {
        console.error('Error updating category:', error);
        res.status(502).json({ error: 'Internal Server Error' });
    }
});

Router.post('/api/update_option/:id', (req, res) => {
    try {
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
    }
    catch (error) {
        console.error('Error updating category:', error);
        res.status(502).json({ error: 'Internal Server Error' });
    }
});

// end selling option

Router.get("/api/Testimonial", (req, res) => {
    try {
        sqlDbconnect.query("SELECT * FROM testimonial", (err, rows) => {
            if (!err) {
                res.send(rows);
            } else {
                console.log(err);
            }
        });
    }
    catch (error) {
        console.error('Error updating category:', error);
        res.status(502).json({ error: 'Internal Server Error' });
    }
});

Router.get("/api/Registration", (req, res) => {

    try {
        sqlDbconnect.query("SELECT * FROM registration", (err, rows) => {
            if (!err) {
                res.send(rows);
            } else {
                console.log(err);
            }
        });
    }
    catch (error) {
        console.error('Error updating category:', error);
        res.status(502).json({ error: 'Internal Server Error' });
    }
});
Router.get("/api/Registration/:id", (req, res) => {
    try {
        const { id } = req.params;
        sqlDbconnect.query(`SELECT * FROM registration WHERE ID=?`, [id
        ], (err, result) => {
            if (!err) {
                res.send(result[0]);

            } else {
                console.log(err);
            }
        });
    }
    catch (error) {
        console.error('Error updating category:', error);
        res.status(502).json({ error: 'Internal Server Error' });
    }
});
// Endpoint for user registration


Router.post('/api/NewRegistration', (req, res) => {
    try {
        const { firstName, lastName, username, email, phone, gender, pincode, address1, address2, country, state, city, password } = req.body;

        // Basic validation
        if (!firstName || !lastName || !username || !email || !phone || !gender || !pincode || !address1 || !address2 || !country || !state || !city || !password) {
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
            sqlDbconnect.query('INSERT INTO registration (fname, lname, uname, email,phone,gender,pincode,address1,address2,country,state,city, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [firstName, lastName, username, email, phone, gender, pincode, address1, address2, country, state, city, password],
                (insertError) => {
                    if (insertError) {
                        console.error('Error inserting user data:', insertError);
                        return res.status(500).json({ success: false, message: 'Internal server error' });
                    }

                    console.log('User registered:', { firstName, lastName, username, email, phone, gender, pincode, address1, address2, country, state, city });
                    let emailObject = {
                        user_name: username,
                        receiver: email,
                        subject: 'Account Created successfully.',
                        content: '',
                        login: process.env.LOGIN_URL
                    };
                    sendEmail(emailObject);
                    // Respond with success
                    res.status(200).json({ success: true, message: 'Registration successful' });
                });
        });
    }
    catch (error) {
        console.error('Error updating category:', error);
        res.status(502).json({ error: 'Internal Server Error' });
    }
});



Router.get("/api/User_message", (req, res) => {
    try {
        sqlDbconnect.query("SELECT * FROM user_message", (err, rows) => {
            if (!err) {
                res.send(rows);
            } else {
                console.log(err);
            }
        });
    }
    catch (error) {
        console.error('Error updating category:', error);
        res.status(502).json({ error: 'Internal Server Error' });
    }
});


Router.post("/api/user_message", (req, res) => {
    try {

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
    }
    catch (error) {
        console.error('Error updating category:', error);
        res.status(502).json({ error: 'Internal Server Error' });
    }
});


Router.post("/api/add_user", (req, res) => {
    try {
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
    }
    catch (error) {
        console.error('Error updating category:', error);
        res.status(502).json({ error: 'Internal Server Error' });
    }

})







Router.post("/api/user_info", (req, res) => {
    try {

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
    }
    catch (error) {
        console.error('Error updating category:', error);
        res.status(502).json({ error: 'Internal Server Error' });
    }
});

// profile editor//

Router.post('/api/save-image', async (req, res) => {
    try {
        let token = req.headers.authorization;
        if (token && token.startsWith('Bearer ')) {
            token = token.slice(7, token.length);
        }
        let jwtSecretKey = process.env.JWT_SECRET_KEY;
        const decoded = jwt.verify(token, jwtSecretKey);

        if (!decoded) {
            return res.json([]);
        }

        const id = decoded.userId;
        const { image_content } = req.body;
        console.log(image_content, 'image_content');
        sqlDbconnect.query(`UPDATE registration SET image = "${image_content}" WHERE id =${id}`, (err, results) => {
            if (err) {
                console.error('Error saving image to MySQL:', err);
                res.status(500).send('Internal Server Error');
            } else {
                console.log('Image saved to MySQL successfully');
                res.status(200).send('Image saved successfully');
            }
        });
    } catch (error) {
        console.error('Error processing image:', error);
        res.status(502).send('Internal Server Error');
    }
});



//Subscribe//

Router.get("/api/Subscribe", (req, res) => {
    try {
        sqlDbconnect.query("select * from  subscribe where status=1", (err, rows) => {
            if (!err) {
                res.send(rows);
            } else {
                console.log(err);
            }
        });
    }
    catch (error) {
        console.error('Error processing image:', error);
        res.status(502).send('Internal Server Error');
    }
});

//delete subscriber
Router.delete("/api/delete_Subscribe", async (req, res) => {
    try {
        const queryAsync = util.promisify(sqlDbconnect.query).bind(sqlDbconnect);
        console.log(req.query.id, "<<>>");

        const itemValuesU = [
            0,
            req.query.id
        ];
        const updateIndustryQuery = `UPDATE subscribe SET status = ? WHERE id = ?`;
        let response = await queryAsync(updateIndustryQuery, itemValuesU);
        if (response.affectedRows > 0) {
            return res.status(200).send({ success: true, message: "Industry deleted successfully" });
        } else {
            return res.status(404).send({ success: false, error: "Industry not found or not deleted" });
        }
    } catch (err) {
        console.error(err);
        return res.status(502).json({ error: 'Internal Server Error' });
    }
});



//New Subscribe//
Router.post('/api/NewSubscribe', (req, res) => {
    try {
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
    }
    catch (error) {
        console.error('Error processing image:', error);
        res.status(502).send('Internal Server Error');
    }
});


//isvalid email//
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Get Contact DEtails//
Router.get("/api/GetContact_Details", (req, res) => {
    try {
        sqlDbconnect.query("SELECT * FROM contact_details", (err, rows) => {
            if (!err) {
                res.send(rows);
            } else {
                console.log(err);
            }
        });
    }
    catch (error) {
        console.error('Error processing image:', error);
        res.status(502).send('Internal Server Error');
    }
});

//Contact Details//
Router.post("/api/Contact_Details", (req, res) => {
    try {

        const username = req.body.name;
        const phone = req.body.phone;
        const email = req.body.email;
        const message = req.body.message;
        sqlDbconnect.query('insert into contact_details(name,phone,email,message)values(?,?,?,?)', [username, phone, email, message], (err, result) => {
            if (!err) {
                res.status(200).json({ success: "ueser message send succesfully" });
            } else {
                console.log(err);
            }
        });
    }
    catch (error) {
        console.error('Error processing image:', error);
        res.status(502).send('Internal Server Error');
    }
});


// backend to dashboard profile //






// Update Profile data

Router.post('/api/updateprofile', (req, res) => {
    try {
        let token = req.headers.authorization;
        if (token && token.startsWith('Bearer ')) {
            token = token.slice(7, token.length);
        }
        let jwtSecretKey = process.env.JWT_SECRET_KEY;
        const decoded = jwt.verify(token, jwtSecretKey);

        if (!decoded) {
            return res.json([]);
        }
        //const jwt = require('jsonwebtoken');
        const id = decoded.userId;
        const { fname, lname, uname, email, phone, gender, pincode, address1, address2, country, state, city, password } = req.body;
        console.log(req.body, '-----');
        sqlDbconnect.query('UPDATE registration  SET fname = ?, lname = ?, uname = ?, email = ?, phone = ?, gender = ?, pincode = ?, address1 = ?, address2 = ?, country = ?,state =?, city = ?, password = ? WHERE id = ? ', [fname, lname, uname, email, phone, gender, pincode, address1, address2, country, state, city, password, id], (err, result) => {
            if (err) {
                console.error('Error updating profile:', err);
                res.status(500).json({ message: 'Internal Server Error' });
                return;
            }
            console.log(req.body);
            res.status(200).json({ result, message: 'Profile updated successfully' });
        });
    }
    catch (error) {
        console.error('Error processing image:', error);
        res.status(502).send('Internal Server Error');
    }
});


// testing api//
// Router.get("/api/testing", async (req, res) => {
//     const queryAsync = util.promisify(sqlDbconnect.query).bind(sqlDbconnect);

//     try {

//     }
//     catch (error) {
//         console.error('Error processing image:', error);
//         res.status(502).send('Internal Server Error');
//     }
// });

//Get Order//
Router.get("/api/Order/get", (req, res) => {
    try {
        let token = req.headers.authorization;
        if (token && token.startsWith('Bearer ')) {
            token = token.slice(7, token.length);
        }
        let jwtSecretKey = process.env.JWT_SECRET_KEY;
        const decoded = jwt.verify(token, jwtSecretKey);

        const id = decoded.userId ? decoded.userId : 0;

        const checkEmailQuery = "SELECT * FROM order_details WHERE order_status in ('Paid','Failed') and user_id = ?";
        sqlDbconnect.query(checkEmailQuery, [id], (err, result) => {
            if (!err) {
                res.status(200).json(result);
            } else {
                console.log(err);
            }
        });
    } catch (error) {
        console.error('Error processing image:', error);
        res.status(502).send('Internal Server Error');
    }
})


//admin panel dashbord page total record show
Router.get('/api/get_total_lengths', async (req, res) => {
    try {
        const queryAsync = util.promisify(sqlDbconnect.query).bind(sqlDbconnect);

        // Define queries to get the total length of each table
        const query1 = 'SELECT COUNT(*) AS total1 FROM course_detail';
        const query2 = 'SELECT COUNT(*) AS total2 FROM order_details';
        const query3 = 'SELECT COUNT(*) AS total3 FROM registration';
        const query4 = 'SELECT COUNT(*) AS total4 FROM speaker_info';
        const query5 = 'SELECT COUNT(*) AS total5 FROM user_message';
        const query6 = 'SELECT COUNT(*) AS total6 FROM subscribe';
        const query7 = 'SELECT SUM(grand_total) AS total7 FROM order_details';

        // Execute the queries asynchronously using Promise.all
        const [result1, result2, result3, result4, result5, result6, result7] = await Promise.all([
            queryAsync(query1),
            queryAsync(query2),
            queryAsync(query3),
            queryAsync(query4),
            queryAsync(query5),
            queryAsync(query6),
            queryAsync(query7),
        ]);

        // Extract the total lengths from the query results
        const total1 = result1[0].total1;
        const total2 = result2[0].total2;
        const total3 = result3[0].total3;
        const total4 = result4[0].total4;
        const total5 = result5[0].total5;
        const total6 = result6[0].total6;
        const total7 = result7[0].total7;

        // Send JSON response with the total lengths
        res.json({
            total_Course_table1: total1,
            total_Orders_table2_: total2,
            total_Register_users_table3: total3,
            total_Speaker_table4: total4,
            total_user_message_table5: total5,
            total_New_Subscribe_table6: total6,
            total_Amount_of_items_ordered_today__: total7,
        });
    } catch (error) {
        console.error('Error fetching total lengths:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
// email check in checkout page
Router.post('/api/check-email', async (req, res) => {
    const queryAsync = util.promisify(sqlDbconnect.query).bind(sqlDbconnect);
    const { email } = req.body;
    console.log(email);
    try {
        const result = await queryAsync('SELECT Count(*) AS count from  registration WHERE email = ? ', [email]);
        if (result[0].count > 0) {
            res.json({ exists: true });
        } else {
            res.json({ exists: false })
        }

    } catch (error) {
        console.error('Error checking email:', error);
        res.status(500).json({ error: 'Internal server error' });

    }
});

//
Router.get('/api/user/invoice', async (req, res) => {
    try {
        const queryAsync = util.promisify(sqlDbconnect.query).bind(sqlDbconnect);
        let token = req.headers.authorization;
        let order_id = req.query.order_id;
        if (token && token.startsWith('Bearer ')) {
            token = token.slice(7, token.length);
        }
        let jwtSecretKey = process.env.JWT_SECRET_KEY;
        const decoded = jwt.verify(token, jwtSecretKey);
        const id = decoded.userId ? decoded.userId : 0;
        const UserOrder = await queryAsync('Select * from order_details where order_id = ? and user_id ', [order_id, id]);

        if (UserOrder.length > 0) {

        }
        else {
            return res.status(200).send({ success: false, message: "Invoice not found" });
        }

        //getting data from  user info from user_id
        const resultInfo = await queryAsync('SELECT * from registration WHERE id =? ', [id]);
        console.log(resultInfo);
        if (resultInfo) {
            const datetime = new Date(UserOrder[0].trans_date);
            const date = moment(datetime).format('YYYY-MM-DD');
            //ALL data that will be fetch in invoice pdf
            let FinnalInvoiceData = {
                //company ditaile for company
                CompanyName: 'CUE SERVICES',
                Companywebsite: 'ceutrainers.com',
                CompanywebsitePolice: 'ceu-trainers.com/privacy-policy',
                CompanyAddress: 'Company Addess',
                CompanyEmail: 'info@ceutrainers.com',
                CompanyZip: 'info@ceutrainers.com',
                //User detail for invoice
                OrderId: UserOrder[0]?.id || null,
                User_Fname: UserOrder[0]?.FName || null,
                User_lname: UserOrder[0]?.lName || null,
                InvoiceNumber: UserOrder[0]?.order_id || null,
                hash_id: UserOrder[0]?.hash_id || null,
                OrderDate: date,
                Country: UserOrder[0]?.Country || null,
                State: UserOrder[0]?.State || null,
                Zip: UserOrder[0]?.Zip || null,
                City: UserOrder[0]?.City || null,
                Phone: UserOrder[0]?.Phone || null,
                Email: UserOrder[0]?.Email || null,
                Course_quantity: UserOrder[0]?.course_quantity || null,
                TotalAmount: UserOrder[0]?.grand_total || null,
                Discount: UserOrder[0]?.discount || 0,
                CourseDetail: UserOrder[0]?.card_detail || null,
            }

            res.status(200).send({ success: true, data: FinnalInvoiceData });
            console.log(resultInfo, 'resultInfo');
        }
        else {
            return res.status(200).send({ success: false, message: "Invoice not found" });
        }

    } catch (error) {
        console.error('Error processing image:', error);
        res.status(502).send('Internal Server Error');
    }
});


module.exports = Router;