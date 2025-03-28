const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Student = new Schema({
    idStudent: { type: Number, required: true, unique: true },
    name: { type: String, require: true },
    age: { type: Number },
    cgpa: { type: Number },
    date: { type: Date, default: Date.now },
    department: { type: String, enum: ["CSE", "TVE"] },
});

module.exports = mongoose.model("Student", Student);