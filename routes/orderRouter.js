const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const Companies = require("../models/companies");

const orderRouter = express.Router();

orderRouter.use(bodyParser.json());

orderRouter.route("/:companyId")
    .get((req, res, next) => {
        Companies.findById(req.params.companyId)
            .then((company) => {
                if (company !== null) {
                    res.statusCode = 200;
                    res.setHeader("Content-Type", "application/json");
                    res.json(company.orders);
                } else {
                    err = new Error("Company " + req.params.companyId + " not found");
                    err.status = 404;
                    return next(err);
                }
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post((req, res, next) => {
        Companies.findById(req.params.companyId)
            .then((company) => {
                if (company !== null) {
                    company.orders.push(req.body);
                    company.save()
                        .then((company) => {
                            res.statusCode = 200;
                            res.setHeader("Content-Type", "application/json");
                            res.json(company);
                        }, (err) => next(err));
                } else {
                    err = new Error("Company " + req.params.companyId + " not found");
                    err.status = 404;
                    return next(err);
                }
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end("PUT operations not supported on /company/" + req.params.companyId + "/orders");
    })
    .delete((req, res, next) => {
        Companies.findById(req.params.companyId)
            .then((company) => {
                if (company !== null) {
                    for (var i = (company.orders.length - 1); i >= 0; i--) {
                        company.orders.id(company.orders[i]._id).remove();
                    }
                    company.save()
                        .then((company) => {
                            res.statusCode = 200;
                            res.setHeader("Content-Type", "application/json");
                            res.json(company);
                        }, (err) => next(err));
                } else {
                    err = new Error("Company " + req.params.companyId + " not found");
                    err.status = 404;
                    return next(err);
                }
            }, (err) => next(err))
            .catch((err) => next(err));
    });

orderRouter.route("/:companyId/:orderId")
    .get((req, res, next) => {
        Companies.findById(req.params.companyId)
            .then((company) => {
                if (company !== null && company.orders.id(req.params.orderId) !== null) {
                    res.statusCode = 200;
                    res.setHeader("Content-Type", "application/json");
                    res.json(company.orders.id(req.params.orderId));
                } else if (company === null) {
                    err = new Error("company " + req.params.companyId + " not found");
                    err.status = 404;
                    return next(err);
                } else {
                    err = new Error("order " + req.params.orderId + " not found");
                    err.status = 404;
                    return next(err);
                }
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post((req, res, next) => {
        res.statusCode = 403;
        res.end("PUT operations not supported on /companies/" + req.params.companyId + "/orders/" + req.params.orderId);
    })
    .put((req, res, next) => {
        Companies.findById(req.params.companyId)
            .then((company) => {
                if (company !== null && company.orders.id(req.params.orderId) !== null) {
                    if (req.body.repairPaid) {
                        company.orders.id(req.params.orderId).repairPaid = req.body.repairPaid;
                    }
                    if (req.body.shipPaid) {
                        company.orders.id(req.params.orderId).shipPaid = req.body.shipPaid;
                    }
                    if (req.body.uploaded) {
                        company.orders.id(req.params.orderId).uploaded = req.body.uploaded;
                    }
                    if (req.body.uploadedDateTime) {
                        company.orders.id(req.params.orderId).uploadedDateTime = req.body.uploadedDateTime;
                    }
                    if (req.body.shippedOffsite) {
                        company.orders.id(req.params.orderId).shippedOffsite = req.body.shippedOffsite;
                    }
                    if (req.body.shippedDateTime) {
                        company.orders.id(req.params.orderId).shippedDateTime = req.body.shippedDateTime;
                    }
                    if (req.body.completed) {
                        company.orders.id(req.params.orderId).completed = req.body.completed;
                    }
                    if (req.body.completedDateTime) {
                        company.orders.id(req.params.orderId).completedDateTime = req.body.completedDateTime;
                    }
                    if (req.body.delivered) {
                        company.orders.id(req.params.orderId).delivered = req.body.delivered;
                    }
                    if (req.body.deliveredDateTime) {
                        company.orders.id(req.params.orderId).deliveredDateTime = req.body.deliveredDateTime;
                    }
                    company.save()
                        .then((company) => {
                            res.statusCode = 200;
                            res.setHeader("Content-Type", "application/json");
                            res.json(company.orders.id(req.params.orderId));
                        }, (err) => next(err));
                } else if (company === null) {
                    err = new Error("company " + req.params.companyId + " not found");
                    err.status = 404;
                    return next(err);
                } else {
                    err = new Error("order " + req.params.orderId + " not found");
                    err.status = 404;
                    return next(err);
                }
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .delete((req, res, next) => {
        Companies.findById(req.params.companyId)
            .then((company) => {
                if (company !== null && company.orders.id(req.params.orderId) !== null) {
                    company.orders.id(req.params.orderId).remove();
                    company.save()
                        .then((company) => {
                            res.statusCode = 200;
                            res.setHeader("Content-Type", "application/json");
                            res.json(company);
                        }, (err) => next(err));
                } else if (company === null) {
                    err = new Error("company " + req.params.companyId + " not found");
                    err.status = 404;
                    return next(err);
                } else {
                    err = new Error("order " + req.params.orderId + " not found");
                    err.status = 404;
                    return next(err);
                }
            }, (err) => next(err))
            .catch((err) => next(err));
    });

module.exports = orderRouter;