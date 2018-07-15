const mongoose = require("mongoose");
const Schema = mongoose.Schema;

require("mongoose-currency").loadType(mongoose);
var Currency = mongoose.Types.Currency;

var imageSchema = new Schema({
    asset: {
        type: String
    },
    caption: {
        type: String
    },
    valid: {
        type: Boolean
    }
}, {
    timestamps: true
})

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

var orderSchema = new Schema({
    orderNumber: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    addressStreet: {
        type: String,
        required: true
    },
    addressCity: {
        type: String,
        required: true
    },
    addressState: {
        type: String,
        required: true
    },
    addressZip: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    images: [imageSchema],
    issue: {
        type: String,
        required: true
    },
    issueDetail: {
        type: String,
        default: ''
    },
    repairLoc: {
        type: String,
        required: true
    },
    repairCost: {
        type: Currency,
        default: 0
    },
    repairPaid: {
        type: Boolean
    },
    shipCost: {
        type: Currency,
        default: 0
    },
    shipPaid: {
        type: Boolean
    },
    estRepair: {
        type: Date,
        required: true
    },
    shopLoc: {
        type: String,
        required: true
    },
    notes: {
        type: String,
        default: ''
    },
    uploaded: {
        type: Boolean
    },
    uploadedDateTime: {
        type: Date
    },
    accepted: {
        type: Boolean
    },
    acceptedDateTime: {
        type: Date
    },
    shippedOffsite: {
        type: Boolean
    },
    shippedDateTime: {
        type: Date
    },
    completed: {
        type: Boolean
    },
    completedDateTime: {
        type: Date
    },
    delivered: {
        type: Boolean
    },
    deliveredDateTime: {
        type: Date
    }
}, {
    timestamps: true
});

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
    orders: [orderSchema]
}, {
    timestamps: true
});

var Companies = mongoose.model("Company", companySchema);

module.exports = Companies;