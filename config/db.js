const mongoose = require("mongoose");


const uri = require("./env").MongoDB_URL

const connectDb = async () => {
  console.log("connecting to db....");

  return await mongoose
    .connect(uri, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .catch((err) => {
      if (err.message.indexOf("ECONNREFUSED") !== -1) {
        console.error(
          "Error: The server was not able to reach MongoDB. Maybe it's not running?"
        );
        process.exit(1);
      } else {
        throw err;
      }
    });
};
module.exports = { connectDb };
