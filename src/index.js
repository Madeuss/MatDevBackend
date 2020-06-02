const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const creds = require("../config/config.js");
const app = express();

app.use((request, response, next) => {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.post("/send", (req, res) => {
  let data = req.body;

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: creds.USER,
      pass: creds.PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  // setup email data with unicode symbols
  let mailOptions = {
    from: "Someone", // sender address
    to: "mateus1two3@gmail.com", // list of receivers
    subject: "A Postcard For You!", // Subject line
    html: `
          <h3>Informations</h3>
            <ul>
              <li>Name: ${data.name}</li>
              <li>Email: ${data.email}</li>
            </ul>

            <h3>Message</h3>
            <p>${data.message}</p>

        `, // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    }
    console.log("Message sent");
  });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
