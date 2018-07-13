const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const Setup = require("../models/setup");

const setupRouter = express.Router();

setupRouter.use(bodyParser.json());

setupRouter.route("/")
    .get((req, res, next) => {
        Setup.find(req.query)
            .populate("company")
            .then((accounts) => {
                console.log("req.query", req.query.code);
                if (req.query.code === undefined && req.query.company === undefined) {
                    res.statusCode = 403;
                    res.end("GET operation not supported on /setup without Query String");
                } else {
                    res.statusCode = 200;
                    res.setHeader("Content-Type", "application/json");
                    res.json(accounts);
                }
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post((req, res, next) => {
        Setup.create(req.body)
            .then((accounts) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(accounts);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end("PUT operation not supported on /setup");
    })
    .delete((req, res, next) => {
        Setup.remove({})
            .then(() => {
                Setup.find({})
                    .then((setup) => {
                        res.statusCode = 200;
                        res.setHeader("Content-Type", "application/json");
                        res.json(setup);
                    }, (err) => next(err))
            })
            .catch((err) => next(err));
    });


module.exports = setupRouter;