const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var companySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    logo: {
        type: String,
        required: true
    },
    colors: {
        type: Array,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    website: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ''
    },
    password: {
        type: String,
        required: true
    },
    street: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    zip: {
        type: Number,
        required: true
    },
    issues: {
        type: Array,
        required: true
    },
    locations: {
        type: Array,
        required: true
    },
    initialOrderNumber: {
        type: Number,
        default: 1000
    },
    productType: {
        type: String,
        required: true
    },
    requiredPhotos: {
        type: Array,
        required: true
    }
}, {
    timestamps: true
});

var Companies = mongoose.model("Company", companySchema);

module.exports = Companies;