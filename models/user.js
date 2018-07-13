const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var User = new Schema({
    associateID: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        default: ''
    },
    firstname: {
        type: String,
        default: ''
    },
    lastname: {
        type: String,
        default: ''
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",
        required: true
    },
    admin: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("User", User);