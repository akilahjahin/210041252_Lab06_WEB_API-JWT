const mongoose = require ("mongoose");
const Schema = mongoose.Schema;

const User = new Schema({
    idUser: { type: Number, required: true, unique: true },
    name: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    height: { type: Number },
    colorGroup: { type: String, enum: ["Red", "Black", "Green", "Blue", "White"] },
});

module.exports = mongoose.model("User", User);