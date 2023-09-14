var Jimp = require("jimp");
const fs = require("fs");
const { parentPort } = require("worker_threads");
const path = require("path");


module.exports = Jimp.read(
	path.join(__dirname, "..", "public", "images", "image.tif")
).then((img) => {
		img.quality(95).write(
			path.join(__dirname,"..","public","images","image_compressed.jpg"),
			(error, val) => {
				if (error) {
          if(parentPort) parentPort.postMessage({"status":"error", "message":"Could not perform image compression."});
          return
				}
        if(parentPort) parentPort.postMessage({"status":"success", "message":"Image compressed."});
			}
		);
	})
	.catch((err) => {
		console.error(err);
	});





// fs.readFile(path.join(__dirname,"..","public","images","image_compressed.jpg"),(err, data) => {
//   // 
//   if (!err && data) {
//     if (parentPort) {
//       parentPort.postMessage({"status":"success", "message":"Image compressed."});
//     }
//   } else {
//     if (parentPort) {
//       // TODO
//       parentPort.postMessage({"status":"error", "message":"Could not fetch image."});
//     }
//   }
// }
// );
