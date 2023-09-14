var express = require("express");
var router = express.Router();

const { Worker } = require("worker_threads");
const path = require("path");
var Jimp = require("jimp");


/* GET home page. */
router.get("/", function (req, res, next) {
	res.render("index", { title: "Express" });
});

// This will not block the main thread
router.get("/non-blocking", (req, res) => {
	res.status(200).send("This page is non-blocking");
});

// This will block the main thread
router.get("/blocking", (req, res) => {
  // Jimp.read() is used to read an image file located in the images folder.
	Jimp.read(path.join(__dirname, "..", "public", "images", "image.tif"))
		.then((img) => {
      // Adjust image quality and save it
			img.quality(95).write(path.join(__dirname,"..","public","images","image_compressed.jpg"), (error, val) => {
				if (error) {
					return res.status(500).send(error);
				}
        res.status(200).json({"status":"success", "message":"Image compressed."});
			});
		})
		.catch((err) => {
			res.status(500).send(err);
		});
});

//Used Worker threads here
router.get("/workers", (req, res) => {
	const worker = new Worker("./routes/workers.js");

	worker.on("message", (data) => {
		res.status(200).send(data);
	});

	worker.on("error", (error) => {
		res.status(404).send(`Error is ${error}`);
	});
});

module.exports = router;
