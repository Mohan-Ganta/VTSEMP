// require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const User = require("./models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const path = require("path");

const app = express();

app.use(cors());
app.use(bodyParser.json());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

const mongoUri =
  "mongodb+srv://mohan:mohan@vtsempd.mnlllbe.mongodb.net/?retryWrites=true&w=majority&appName=VTSEMPD";
mongoose
  .connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const secret =
  "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcxNjk1NTUwOSwiaWF0IjoxNzE2OTU1NTA5fQ.27ULRvW_fhBdaOrgDyjWOlrMwtDeVRe-hcrc6f4JoM4";

app.post(
    "/register",
    upload.fields([
      { name: "profilePhoto", maxCount: 1 },
      { name: "offerLetter", maxCount: 1 },
    ]),
    async (req, res) => {
      const { username, id, email, mobile, dob, doj, designation, password } = req.body;
  
      try {
        const existingUser = await User.findOne({
          $or: [{ username }, { email }],
        });
        if (existingUser) {
          return res.status(400).json({ error: "User already exists" });
        }
  
        const newUser = new User({
          username,
          employeeId: id,
          contactNumber: mobile,
          email,
          dateOfBirth: new Date(dob),
          dateOfJoining: new Date(doj),
          designation,
          profilePhoto: req.files.profilePhoto ? req.files.profilePhoto[0].path : null,
          offerLetter: req.files.offerLetter ? req.files.offerLetter[0].path : null,
          password,
        });
  
        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    }
  );

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if the user exists
        const user = await User.findOne({ username ,password  });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
         console.log(user);
       
        const token = jwt.sign({ userId: user._id }, secret, {
            expiresIn: '1h' // Token expires in 1 hour
            
        });
        res.json({ message: 'Login successful', token });

        
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

app.listen(3000, () => {
  console.log('Server is running on port ${3000}');
});