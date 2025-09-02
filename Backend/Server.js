// backend/server.js
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Contact form route
app.post("/contact", async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ msg: "All fields are required" });
    }

    // Nodemailer transporter
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER, // your Gmail
            pass: process.env.EMAIL_PASS  // App Password
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        replyTo: email, // user email
        to: process.env.EMAIL_USER,   // your Gmail
        subject: `New message from ${name}`,
        text: message,
        html: `<p><strong>Name:</strong> ${name}</p>
               <p><strong>Email:</strong> ${email}</p>
               <p><strong>Message:</strong><br/>${message}</p>`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ msg: "Message sent successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Failed to send message" });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
