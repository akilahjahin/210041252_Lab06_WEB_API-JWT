const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Student = new Schema({
    idStudent: { type: Number, required: true, unique: true },
    name: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    cgpa: { type: Number },
    department: { type: String, enum: ["CSE", "TVE"] },
});

module.exports = mongoose.model("Student", Student);