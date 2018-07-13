var express = require('express');
const bodyParser = require("body-parser");
var User = require("../models/user");

const Users = require("../models/user");

var router = express.Router();
router.use(bodyParser.json());

/* GET users listing. */
router.get('/', (req, res, next) => {
    Users.find(req.query)
        .then((users) => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(users);
        }, (err) => next(err))
        .catch((err) => next(err));
});

router.get('/:companyId', (req, res, next) => {
    Users.find({ 'company': req.params.companyId })
        .then((users) => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(users);
        }, (err) => next(err))
        .catch((err) => next(err));
})

router.post('/new', (req, res, next) => {
    Users.create(req.body)
        .then((user) => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(user);
        }, (err) => next(err))
        .catch((err) => next(err));
});

router.post('/validate', (req, res, next) => {
    Users.find({ 'associateID': req.body.associateID, 'company': req.body.company, 'password': req.body.password })
        .then((user) => {
            if (user.length > 0) {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(true);
            } else {
                res.statusCode = 404;
                res.setHeader("Content-Type", "application/json");
                res.json(false);
            }
        }, (err) => next(err))
        .catch((err) => next(err));
});

module.exports = router;