var admin = require("firebase-admin");
const { getStorage } = require("firebase-admin/storage");
const { Storage } = require("@google-cloud/storage");
var serviceAccount = require("../../google-credentials.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "smartupdeal.appspot.com",
});
// Creates a client using Application Default Credentials
const storage = new Storage();
// Import Node.js stream
const stream = require("stream");
const bucket = getStorage().bucket();
async function uploadFile(base64, filename) {
  const image = base64.split(",").pop();
  const extension = base64.substring(
    "data:image/".length,
    base64.indexOf(";base64")
  );

  const file = bucket.file(filename);

  var bufferStream = new stream.PassThrough();
  bufferStream.end(Buffer.from(image, "base64"));
  bufferStream
    .pipe(
      file.createWriteStream({
        metadata: {
          contentType: `image/${extension}`,
          metadata: {
            custom: "metadata",
          },
        },
        public: false,
        validation: "md5",
      })
    )
    .on("error", function (err) {})
    .on("finish", async function () {
      // The file upload is complete.
      await bucket.file(filename).makePublic();
    });
}

exports.uploadFileGC = async (base64, filename) => {
  await uploadFile(base64, filename);
};

exports.deleteFileGC = async (filename) => {
  await bucket.file(filename).delete();
};
