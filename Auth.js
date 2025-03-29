const express = require('express');
const mongoose = require('mongoose');
const Student = require("./models/Student.model");
const bcrypt = require("bcrypt"); // used to hash the password before sending it the the database so that it can't be exactly visible in the database

const app = express();
app.use(express.json());


// login API
app.post("/login", async (req, res) => {
    const student = await Student.findOne({ email: req.body.email}) // login successful only if user and password matches

    if(student) {
        const matched = await bcrypt.compare(req.body.password, student.password); // compare the password entered by the user with the hashed password in the database

        if (matched) {
            console.log("Login successful.");
            res.status(200).send(student);
        }
        else {
            console.log("Incorrect password, try again.");
            res.status(401).send("Student found but password didn't match.");
        }
    }
    else {
        console.log("Email doesn't exist, please register.");
        res.status(404).send("Student not found.");
    }
});


// register API
app.post("/register", async (req, res) => {
    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(req.body.password, 10); // 10 is the number of salt-rounds to hash the password
    req.body.password = hashedPassword; // replacing the password with the hashed password
    // checking if the email already exists in the database

    // NOTE: 1. Rainbow Table Attacks : attacker PRE-computes the a massive list of common password hashes which the attacker can loop up to for finding the corresponding password. #rounds of hashing is important to make it difficult for the attacker to find the password. Here, we are using 10 rounds of hashing.
    //       2. Brute Force Attacks : attacker tries all possible combinations of passwords until the correct one is found. UNIQUE salt for each password is used to make it difficult for the attacker to find the password, even same passwords have diff salts for which diff hashes are generated.


    Student.create(req.body)
    .then((user) => {
        res.status(201).send(user);
    })
     .catch((error) => {
        console.log(error)
    });
});


app.listen(4000, () => {
    console.log("Server is running on port 4000");
});

mongoose
    .connect("mongodb+srv://akilah_252:123abc@cluster0.yjzqylp.mongodb.net/IUT_USERS?retryWrites=true&w=majority&appName=Cluster0")
    .then (() => {
    console.log("Connected to MongoDB sucessfully.");
    })
    .catch ((err) => {
    console.log("Failed to connect to MongoDB\n", err);
    });