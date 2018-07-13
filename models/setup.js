const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var setupSchema = new Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company"
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Setup", setupSchema);