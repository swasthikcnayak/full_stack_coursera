const express = require("express");
const bodyParser = require("body-parser");


const Promotions = require('../models/promotions');
const promoRouter = express.Router();
promoRouter.use(bodyParser.json());

promoRouter
  .route("/")

  .get((req, res, next) => {
    Promotions.find({})
      .then((promotion) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotion)
      }, (err) =>
        next(err))
      .catch((err) => next(err))
  })

  .post((req, res, next) => {
    Promotions.create(req.body)
      .then((promotion) => {
        console.log('promotion created ' + promotion);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotion);
      }, (err) => next(err))
      .catch((err) => next(err))
  })

  .put((req, res, next) => {
    res.statusCode = 404;
    res.end("put operation is not supported on /promotions");
  })

  .delete((req, res, next) => {
    Promotions.remove({})
      .then((response) => {
        console.log('Deleting all the promotions');
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
      }, (err) => next(err))
      .catch((err) => next(err))
  });

promoRouter
  .route('/:promoId')

  .get((req, res, next) => {
    Promotions.findById(req.params.promoId)
      .then((promotion) => {
        if (promotion != null) {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(promotion)
        }
        else {
          err = new Error("Promotion " + req.params.promoId + " not found");
          err.statusCode = 404;
          return next(err);
        }
      }, (err) =>
        next(err))
      .catch((err) => next(err))
  })


  .post((req, res, next) => {
    res.statusCode = 403;
    res.end("post operation is not supported on promotions/" + req.params.promoId);
  })

  .put((req, res, next) => {
    Promotions.findById(req.params.promoId)
      .then((promotion) => {
        if (promotion != null) {
          if (req.body.name)
            promotion.name = req.body.name;
          if (req.body.image)
            promotion.image = req.body.image;
          if (req.body.label)
            promotion.label = req.body.label;
          if (req.body.price)
            promotion.price = req.body.price;
          if (req.body.description)
            promotion.description = req.body.description;
          if (req.body.featured)
            promotion.featured = req.body.featured;
          promotion.save()
            .then((promotion) => {
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.json(promotion);
            }, (err) =>
              next(err));
        }
        else {
          err = new Error("Promotion " + req.params.promoId + " not found");
          err.statusCode = 404;
          return next(err);
        }
      }, (err) =>
        next(err))
      .catch((err) => next(err))
  })

  .delete((req, res, next) => {
    Promotions.findByIdAndRemove(req.params.promoId)
      .then((promotion) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotion);
      }, (err) =>
        next(err))
      .catch((err) => next(err))
  })



module.exports = promoRouter;
