const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient;
const { USERNAME, PASSWORD } = require('./config.js');

const PORT = 3000;
let db;

MongoClient.connect('mongodb://DisasterTracker:LearningFuze718@ds035693.mlab.com:35693/disaster-tracker', { useNewUrlParser: true }, (err, client) => {
    if (err) {
        console.log(err)
        return;
    }
    db = client.db('disaster-tracker')
    app.listen(PORT, () => {
        console.log('This is your captain speaking, we are listening at PORT: ', PORT)
    })
})

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(express.static("public"))

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: USERNAME,
        pass: PASSWORD
    }
});


app.get('/returndata', (req, res) => {
    db.collection('data').find().toArray((err, results) => {
        if (err) {
            res.status(500).send({ success: false, error: 'Unable to save data to db' });
            return;
        }
        console.log("get request activated")
        res.send({ success: true, message: 'Here is your data!', results });
    })
})

app.post('/form', (req, res) => {
    console.log('BODY:', req.body);
    db.collection('data').save(req.body, (err, result) => {
        if (err) {
            res.status(500).send({ success: false, error: 'Unable to save data to db' });
            return;
        }

        console.log("saved to database")
        res.send({ success: true, message: 'Your data was saved' });
    })
})

// HTTP POST route to accept POST data from
app.post('/email', (req, res) => {
    const { email, disaster } = req.body; //from html?

    const mailOptions = {
        from: 'DisasterTrackerEmail@gmail.com',
        to: email,  //TODO: change this to subscriber email, how to pass in email and location information from front end javascript
        subject: 'Disaster Tracker: Disaster Found in Area You Specified',
        html: `<h1>${disaster.title}</h1><br> <p>${disaster.body}</p><br> <a href="${disaster.url}">Click here to read more</a>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent successfully' + info.response);
        }
    });
    res.end();
});


//TODO: unsubscribe option
// app.delete('/quotes', (req, res) => {
//     db.collection('quotes').findOneAndDelete({name: req.body.name}, (err, result) => {
//       if (err) return res.send(500, err)
//       res.send('A darth vadar quote got deleted')
//     })
//   })
