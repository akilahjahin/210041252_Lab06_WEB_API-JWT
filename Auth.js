const express = require('express');
const mongoose = require('mongoose');
const Student = require("./models/Student.model");

const app = express();
app.use(express.json());


// login API
app.post("/login", async (req, res) => {
    Student.findOne({ email: req.body.email, password: req.body.password }) // login successful only if user and password matches
    .then((student) => {
        if (student) {
            console.log("Login successful");
            res.status(200).send(student);
        } else {
            res.status(404).send("Student NOT found.");
        }
    })
    .catch((error) => {
        console.log(error);
    });
});


// register API
app.post("/register", async (req, res) => {
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