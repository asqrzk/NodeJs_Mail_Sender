const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
const port = 3000;

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail', // e.g., Gmail, Outlook, etc.
  host: 'smtp.gmail.com',
  port: 465,
    secure: true,
  auth: {
    user: 'moneymakerasq@gmail.com',
    pass: 'elmsaanpmhzpjlww',
  },
});

// API endpoint to send an email
app.post('/sendEmail', (req, res) => {
    //console.log(req);
    //console.log(req.body);
  const { to, content } = req.body;
  //console.log("We got to as ",to);

  // Email configuration
  const mailOptions = {
    from: 'moneymakerasq@gmail.com',
    to: to,
    subject: 'Mail GPT for you',
    text: content,
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email:', error);
      res.status(500).json({ error: 'Failed to send email' });
    } else {
      console.log('Email sent:', info.response);
      res.status(200).json({ message: 'Email sent successfully' });
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
