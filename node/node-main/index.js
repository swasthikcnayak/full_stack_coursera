const express = require("express");
const http = require("http");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const hostname = "localhost";
const port = 3000;

const app = express();

app.use(morgan("dev"));
app.use(bodyParser.json());

app.all("/dishes", (req, res, next) => {
  res.statusCode = 200;
  res.setHeader("content-type", "plain/text");
  next();
});

app.get("/dishes", (req, res, next) => {
  res.end("Will send all the dishes to you");
});

app.post("/dishes", (req, res, next) => {
  res.end(
    "Will add to the dish " +
      req.body.name +
      " with details " +
      req.body.description
  );
});

app.put("/dishes", (req, res, next) => {
  res.statusCode = 403;
  res.end("put operation is not supported on dishes");
});

app.delete("/dishes", (req, res, next) => {
  res.end("delete all dishes");
});



app.get("/dishes:dishId", (req, res, next) => {
  res.end("Will send details of the dish " + req.params.dishId + " to you");
});

app.post("/dishes:dishId", (req, res, next) => {
    res.statusCode = 403;
  res.end("post operation is not supported on dishes/" + req.params.dishId);
});

app.put("/dishes:dishId", (req, res, next) => {
    res.write('Updating the dish '+req.params.dishId+ "\n");
    res.end('Will update  the dish '+req.body.name+' with details '+req.body.description);
});

app.delete("/dishes:dishId", (req, res, next) => {
  res.end("Deleting dish : "+req.params.dishId);
});



app.use(express.static(__dirname + "/public"));

const server = http.createServer(app);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
