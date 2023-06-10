/**
 * Module dependencies.
 */
const express = require("express");
const { static } = require('express');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

const config = require("./config");
const apollo = require("./apollo");

//Storj.io dependencies

// //include the Node.js-Storj bindings module
// const storj = require("../node_modules/uplink-nodejs");
// //Object for all the function for uplink
// const libUplink = new storj.Uplink();
// //Object for all error for uplink
// const uplinkError = storj.errorhandle;


//Storj (V3) configuration
var storjConfig = {
  apiKey    : "change-me-to-the-api-key-created-in-satellite-gui",
  satelliteURL   : "change-me-to-desired-satellite-url",
  encryptionPassphrase  : "you'll never guess this",
  bucketName   : "change-me-to-desired-bucket-name",
  uploadPath   : "optionalpath/requiredfilename",
};

/**
 * exports from the module
 */
module.exports = async function () {
  try {
    const app = express();
    app.use('/uploads', express.static('uploads'))

    // enable cors
    app.use(cors(config.cors));
    app.options("*", cors(config.cors));

    // cookie parser
    app.use(cookieParser());

    app.get("/", (req, res) => {
      console.log("default route called");
      res.status(200).send("Hello, from Tulp Backend!").end();
    });

    app.get("/_health", (req, res) => {
      console.log("_health route called");
      res.status(200).send("Tulp Backend up and running").end();
    });

    //Multer image upload methods

    // enable files upload
    var storage = multer.diskStorage({
      destination: function (req, file, callback) {
        callback(null, "./uploads");
      },
      filename: function (req, file, callback) {
        let extension = path.extname(file.originalname);
        callback(null, `tulp_${new Date().getTime()}${extension}`);
      },
    });

    var upload = multer({ storage: storage }).single("file");

    app.post("/upload-file", async (req, res) => {
      upload(req, res, function (err) {
        if (err) {
          console.log(err);
          return res.end("Error uploading file.");
        }
        // res.end("File is uploaded successfully!");
        return res.json({
          success: true,
          filePath: res.req.file.path,
          fileName: res.req.file.filename,
        });
      });
    });

    // initialize apollo graphql
    await apollo(app);

    // listen to the configured host, port
    const { port } = config.server;
    const server = app.listen({ port });
    server.on("listening", () =>
      console.log(`Tulp Backend listening at ${port}`)
    );
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
};
