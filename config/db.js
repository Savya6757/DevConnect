const mongoose = require("mongoose");
const URL = process.env.DB_URL;

const dbConnect = async () => {
  try {
    await mongoose.connect(URL);
    console.log("MongoDb Connected");
  } catch (e) {
    console.log("error", e);
    process.exit(1);
  }
};

module.exports = dbConnect;
