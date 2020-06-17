const express = require("express");
const bodyParser = require("body-parser");
const leaderRouter = express.Router();
leaderRouter.use(bodyParser.json());



leaderRouter
.route("/")
.all((req, res, next) => {
  res.statusCode = 200;
  res.setHeader("content-type", "plain/text");
  next();
})

.get((req, res, next) => {
  res.end("Will send the details of the leader to you");
})

.post((req, res, next) => {
  res.end(
    "Will add the leader with name " +
      req.body.name +
      " and with details " +
      req.body.description
  );
})
.put((req, res, next) => {
  res.statusCode = 403;
  res.end("put operation is not supported on leaders");
})

.delete((req, res, next) => {
  res.end("deleting all leaders");
});

leaderRouter
  .route('/:leaderId')

  .all((req,res,next)=>
  {
      res.statusCode = 200;
      res.setHeader('content-type','text/plain');
      next();
  })
  .get((req, res, next) => {
    res.end("Will send details of the leader " + req.params.leaderId + " to you");
  })

  .post((req, res, next) => {
    res.statusCode = 403;
    res.end("post operation is not supported on leaders/" + req.params.leaderId);
  })

  .put((req, res, next) => {
    res.write("Updating the leader " + req.params.leaderId + "\n");
    res.end(
      "Will update  the leader with " +
        req.body.name +
        " with details " +
        req.body.description
    );
  })

  .delete((req, res, next) => {
    res.end("Deleting leader : " + req.params.leaderId);
  });



module.exports = leaderRouter;
