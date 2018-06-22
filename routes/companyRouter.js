const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const Companies = require("../models/companies");

const companyRouter = express.Router();

companyRouter.use(bodyParser.json());

companyRouter.route("/")
    .get((req, res, next) => {
        Companies.find({})
            .then((companies) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(companies);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post((req, res, next) => {
        Companies.create(req.body)
            .then((companies) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(companies);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end("PUT operation not supported on /companies");
    })
    .delete((req, res, next) => {
        Companies.remove({})
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

companyRouter.route("/:companyId")
    .get((req, res, next) => {
        Companies.findById(req.params.companyId)
            .then((company) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(company);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post((req, res, next) => {
        res.statusCode = 403;
        res.end("POST operation not supported on /companies/" + companyId);
    })
    .put((req, res, next) => {
        Companies.findByIdAndUpdate(req.params.companyId, {
                $set: req.body
            }, { new: true })
            .then((company) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(company);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .delete((req, res, next) => {
        Companies.findByIdAndRemove(req.params.companyId)
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

module.exports = companyRouter;