const mongoose = require("mongoose");
const Schema = mongoose.Schema;

require("mongoose-currency").loadType(mongoose);
var Currency = mongoose.Types.Currency;


var imageSchema = new Schema({
    localpath: {
        type: String
    },
    filename: {
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

var orderSchema = new Schema({
    orderId: {
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
    contactMethod: {
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

var Orders = mongoose.model("Order", orderSchema);

module.exports = Orders;