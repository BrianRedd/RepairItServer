var express = require('express');
const bodyParser = require("body-parser");

const Associates = require("../models/associates");

const associateRouter = express.Router();

associateRouter.use(bodyParser.json());

/*ADMIN ONLY*/
associateRouter.get('/', (req, res, next) => {
    Associates.find(req.query)
        .then((associates) => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(associates);
        }, (err) => next(err))
        .catch((err) => next(err));
});

/*Standard use: Verify existing Associates for a company (returns just associateID's)*/
associateRouter.get('/verify/:companyId', (req, res, next) => {
    Associates.find({ 'company': req.params.companyId })
        .then((associates) => {
            let response = associates.map((associate) => {return associate.associateID});
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(response);
        }, (err) => next(err))
        .catch((err) => next(err));
})

/*Standard use: Gets existing Associate for a company (full JSON)*/
associateRouter.get('/:companyId/:associateId', (req, res, next) => {
    Associates.findOne({ 'company': req.params.companyId, 'associateID': req.params.associateId })
        .then((associate) => {
            if (associate !== null) {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(associate);
            } else {
                err = new Error("Associate " + req.params.associateId + " not found for Company " + req.params.companyId);
                err.status = 404;
                return next(err);
            }
        }, (err) => next(err))
        .catch((err) => next(err));
})

/*Standard use: new Associate*/
associateRouter.post('/new', (req, res, next) => {
    Associates.create(req.body)
        .then((associate) => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(associate);
        }, (err) => next(err))
        .catch((err) => next(err));
});

/*Standard user: updating existing Associate*/
associateRouter.put('/update/:companyId/:associateId', (req, res, next) => {
    Associates.findOne({ 'company': req.params.companyId, 'associateID': req.params.associateId })
        .then((associate) => {
            if (associate !== null) {
                if (req.body.password) {
                    associate.password = req.body.repairPaid;
                }
                if (req.body.firstname) {
                    associate.firstname = req.body.firstname;
                }
                if (req.body.lastname) {
                    associate.lastname = req.body.lastname;
                }
                if (req.body.devices) {
                    associate.devices.push(req.body.devices);
                }
                associate.save()
                    .then((associate) => {
                        res.statusCode = 200;
                        res.setHeader("Content-Type", "application/json");
                        res.json(associate);
                    }, (err) => next(err));
            } else {
                err = new Error("Associate " + req.params.associateId + " not found for Company " + req.params.companyId);
                err.status = 404;
                return next(err);
            }
        }, (err) => next(err))
        .catch((err) => next(err));
})

/*Company Admins Only (from web portal)*/
associateRouter.delete('/remove/:companyId/:associateId', (req, res, next) => {
    Associates.findOneAndRemove({ 'company': req.params.companyId, '_id': req.params.associateId })
        .then((response) => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(response);
        }, (err) => next(err))
        .catch((err) => next(err));
});

module.exports = associateRouter;