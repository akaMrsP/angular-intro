const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
require('dotenv').config();
// const Message = require('./message');

const app = express();

// allows us to parse the json
app.use(bodyParser.json());

// used to allow us to parse urlencoded data, extended: false for default features
//app.use(bodyParser.urlencoded({ extended: false }));

// middleware to allow outside clients to use our APIs
app.use((req, res, next) => {
  // Setting ACAO to '*' means no matter *which domain* the client runs on, it is allowed access to our resources
  res.setHeader('Access-Control-Allow-Origin', '*');  // key-value pair to modify the response header for the browser

  // above we allowed all domains - here we *allow extra headers* beyond the default
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

  // here we control *which http verbs* can be used in a request
  //      OPTIONS is an implicit request used to check that a POST request is valid *before* executing the POST request
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');

  next(); // don't forget to pass on to the next middleware!
});

app.post('/api/contact', (req, res, next) => {
  // const contactMessage = new Message({
  //   name: req.body.name,
  //   email: req.body.email,
  //   subject: req.body.subject,
  //   description: req.body.description
  // });
  const contactMessage = req.body;
  contactMessage.subject = req.body.name + ' - PezEngr WebForm - Subject: ' + req.body.subject;
  console.log(contactMessage);

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  transporter.sendMail({
    from: contactMessage.email,
    to: process.env.EMAIL_RECIPIENT,
    subject: contactMessage.subject,
    text: contactMessage.description
  }, (error, info) => {
    if (error) {
      res.status(404).json({ message: 'Message not sent!', error });
    } else {
      res.status(201).json({ message: 'Message sent', info });
    }
  });
});

// Export the *entire* app (includes all the middleware)
module.exports = app;
