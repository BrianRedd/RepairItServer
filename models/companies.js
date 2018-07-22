const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const orderSchema = require("./orders");

var deviceSchema = new Schema({
    deviceModel: {
        type: String
    },
    deviceOS: {
        type: String
    },
    deviceType: {
        type: String
    },
    deviceUUID: {
        type: String
    },
    deviceScreen: {
        type: String
    }
})

var companySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    code: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    logo: {
        type: String,
        default: '[default_logo]'
    },
    colors: {
        type: Array,
        default: ['#006A5C', '#7C0044', '#0053A7']
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
        type: String,
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
    },
    licenses: {
        type: Number,
        default: 5
    },
    devices: [deviceSchema],
    orders: [orderSchema.schema]
}, {
    timestamps: true
});

var Companies = mongoose.model("Company", companySchema);

module.exports = Companies;