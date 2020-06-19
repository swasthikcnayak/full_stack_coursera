const express = require("express");
const bodyParser = require("body-parser");
const promoRouter = express.Router();
promoRouter.use(bodyParser.json());



promoRouter
.route("/")
.all((req, res, next) => {
  res.statusCode = 200;
  res.setHeader("content-type", "plain/text");
  next();
})

.get((req, res, next) => {
  res.end("Will send the details of the promtions to you");
})

.post((req, res, next) => {
  res.end(
    "Will add the promotions with name " +
      req.body.name +
      " and with details " +
      req.body.description
  );
})
.put((req, res, next) => {
  res.statusCode = 403;
  res.end("put operation is not supported on promotions");
})

.delete((req, res, next) => {
  res.end("deleting all promotions");
});

promoRouter
  .route('/:promoId')

  .all((req,res,next)=>
  {
      res.statusCode = 200;
      res.setHeader('content-type','text/plain');
      next();
  })
  .get((req, res, next) => {
    res.end("Will send details of the promotions " + req.params.promoId + " to you");
  })

  .post((req, res, next) => {
    res.statusCode = 403;
    res.end("post operation is not supported on promotions/" + req.params.promoId);
  })

  .put((req, res, next) => {
    res.write("Updating the promotions" + req.params.promoId + "\n");
    res.end(
      "Will update  the promotions with " +
        req.body.name +
        " with details " +
        req.body.description
    );
  })

  .delete((req, res, next) => {
    res.end("Deleting promotions : " + req.params.promoId);
  });



module.exports = promoRouter;
