const express = require("express");
const bodyParser = require("body-parser");
const authenticate = require('../authenticate');
const Leaders = require("../models/leaders");
const promotions = require("../models/promotions");
const leaderRouter = express.Router();
leaderRouter.use(bodyParser.json());



leaderRouter
  .route("/")

  .get((req, res, next) => {
    Leaders.find({})
      .then((leader) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leader);
      })
      .catch((err) =>
        next(err))
  })

  .post(authenticate.verifyUser,(req, res, next) => {
    Leaders.create(req.body)
      .then((leader) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leader);
      }, (err) => next(err))
      .catch((err) => next(err))
  })

  .put(authenticate.verifyUser,(req, res, next) => {
    res.statusCode = 403;
    res.end("put operation is not supported on /leaders");
  })

  .delete(authenticate.verifyUser,(req, res, next) => {
    Leaders.remove({})
      .then((leader) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'applicatoin/json');
        res.json(leader);
      }, (err) => next(err))
      .catch((err) => next(err))
  });


leaderRouter
  .route('/:leaderId')

  .get((req, res, next) => {
    Leaders.findById(req.params.leaderId)
      .then((leader) => {
        if (leader != null) {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(leader);
        }
        else {
          err = new Error("Leaders " + req.params.leaderId + " not found");
          err.statusCode = 404;
          return next(err);
        }
      }, (err) => next(err))
      .catch((err) => next(err))
  })

  .post(authenticate.verifyUser,(req, res, next) => {
    res.statusCode = 403;
    res.end("post operation is not supported on leaders/" + req.params.leaderId);
  })

  .put(authenticate.verifyUser,(req, res, next) => {
    Leaders.findById(req.params.leaderId)
      .then((leader) => {
        if (leader != null) {
          if (req.body.name)
            leader.name = req.body.name;
          if (req.body.image)
            leader.image = req.body.image;
          if (req.body.designation)
            leader.designation = req.body.designation;
          if (req.body.abbr)
            leader.abbr = req.body.abbr;
          if (req.body.description)
            leader.description = req.body.description;
          if (req.body.featured)
            leader.featured = req.body.featured;
          leader.save()
            .then((leader) => {
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.json(leader);
            }, (err) => next(err))
        }
        else {
          err = new Error("Leaders " + req.params.leaderId + " not found")
          err.statusCode = 404;
          return next(err);
        }
      })
      .catch((err) => next(err))
  })

  .delete(authenticate.verifyUser,(req, res, next) => {
    Leaders.findByIdAndRemove(req.params.leaderId)
      .then((leader) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leader);
      }, (err) => next(err))
      .catch((err) => next(err))
  });



module.exports = leaderRouter;
