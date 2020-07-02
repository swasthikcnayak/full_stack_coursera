const express = require("express");
const bodyParser = require("body-parser");
const authenticate = require('../authenticate');
const multer = require('multer');

const storage = multer.diskStorage(
    {
        destination: (req, file, cb) => {
            cb(null, 'public/images');
        },

        filename: (req, file, cb) => {
            cb(null, file.originalname)
        }
    }

);

const imageFileFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error('Cannot accept non image file', false))
    }
    else {
        cb(null, true)
    }
}

const uplaod = multer({ fileFilter: imageFileFilter, storage: storage })

const uploadRouter = express.Router();
uploadRouter.use(bodyParser.json());


uploadRouter
    .route("/")
    .put(authenticate.verifyUser, (req, res, next) => {
        res.statusCode = 403;
        res.end("put operation is not supported on /imageUpload");
    })
    .get(authenticate.verifyUser, (req, res, next) => {
        res.statusCode = 403;
        res.end("get operation is not supported on /imageUpload");
    })
    .delete(authenticate.verifyUser, (req, res, next) => {
        res.statusCode = 403;
        res.end("delete operation is not supported on /imageUpload");
    })
    .post(authenticate.verifyUser, authenticate.verifyAdmin, uplaod.single('imageFile'), (req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(req.file);
    })

module.exports = uploadRouter;