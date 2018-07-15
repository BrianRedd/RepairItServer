const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const Companies = require("../models/companies");

const setupRouter = express.Router();

setupRouter.use(bodyParser.json());

setupRouter.route("/")
    .get((req, res, next) => {
        Companies.find(req.query)
            .then((account) => {
                if (req.query.code === undefined && req.query.company === undefined) {
                    res.statusCode = 403;
                    res.end("GET operation not supported on /setup without Query String");
                } else {
                    res.statusCode = 200;
                    res.setHeader("Content-Type", "application/json");
                    if(account.length > 0) {
                        var response = {
                            "name" : account[0].name,
                            "code": account[0].code,
                            "password": account[0].password,
                            "_id" : account[0]._id
                        };
                        res.json(response);
                    } else {
                        res.json(account);
                    }
                }
            }, (err) => next(err))
            .catch((err) => next(err));
    })


module.exports = setupRouter;