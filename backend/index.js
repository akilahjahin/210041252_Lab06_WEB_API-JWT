const express = require('express');
const mongoose = require('mongoose');
const Student = require("./models/Student.model");

const app = express();
app.use(express.json()); // express by default, doesn't parse incoming jsonRequest-bodies: By this line, MIDDLEWARE used which parses the jsonRequest-bodies before reaching the route-handlers, PREVIOUSLY< req-bpdy was "undefined" in the route handlers; since Express didn't automatically parse the request payload;
// NOW (after using this line) : line acting as MIDDLEWARE, INTERCEPTS the incoming json req payload and attaches it to the previosuly undefined req-body which makes the req-bpdy defined to the route handlers...

app.get('/', function (req, res) {
  res.send('Hello World Miah');
});

app.get("/api/students", async (req, res) => {
  // error - handling:
  Student.find().then ((students) => {
    res.status(200).send(students); // status 200 means everything's fine
  }).catch((err) => {
    res.status(500).send({ // status 500 means error
      message:
      err.message || "Some error occurred while retrieving students.",
    });
  });

}); // async ensures time isn't wasted while we are returning the data from mongodb atlas: i.e. we can do other tasks meanwhile


// getting student by particular ID, get 1 particular student info
app.get("/api/student/:id", async (req, res) => { // whenever we receve request:req from the server, we bring the response:res
  const id = req.params.id;
  Student.findOne({idStudent: id}) // findById ; instead we used 'findOne' to find one specific instance of something ; in this case (if 'findOne' used) we need to specify one property: the particular propperty that was defined in our schema, here, idStudent -> (property has specific value =) id
    .then((student) => {
      if(!student) {
        return res.status(404).send({
          message:
          "Student not found with id " + id,
        });
      }

      // id successfully found in the Database, the return that particular student's information only
      res.status(200).send(student);
    })
    .catch((err) => {
      return res.status(500).send({
        message:
        "Error retreiving student with id " + id,
      });
    });
});


// How to send info to the table? We'll be using POST : to send info to the Database
app.post("/api/student", async (req, res) => {

  Student.create(req.body) // creating body from the schema predefined
  .then((student) => {
    res.status(201).send(student);
  }).catch((err) => {
    res.status(500).send({
      message:
      err.message || "Some error occurred while creating NEW Student.",
  });
  // const student = new Student({
  //   idStudent: req.body.idStudent,
  //   name: req.body.name,
  //   age: req.body.age,
  //   cgpa: req.body.cgpa,
  //   department: req.body.department,
  // });

  // student
  //   .save() // saving this info to the db
  //   .then((data) => {
  //     res.status(201).send(data); // returning the saved sata
  //   })
  //   .catch((err) => {
  //     res.status(500).send({
  //       message:
  //       err.message || "Some error occurred while creating NEW Student.",
  //     });
  });
});


app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

mongoose.connect("mongodb+srv://akilah_252:123abc@cluster0.yjzqylp.mongodb.net/IUT?retryWrites=true&w=majority&appName=Cluster0").then (() => {
  console.log("Connected to MongoDB sucessfully.");
}).catch ((err) => {
  console.log("Failed to connect to MongoDB\n", err);
});