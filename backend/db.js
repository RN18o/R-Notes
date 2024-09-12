// const mongoose = require("mongoose");

// async function connectoMongoDB(auth,notes){
//     return mongoose.connect(auth,notes);
// }

// module.exports = {
//     connectoMongoDB
// }
// const mongoose = require('mongoose');

// const mongoURI = "mongodb://localhost:27017/inotebook?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false"

// const connectToMongo = ()=>{
//     mongoose.connect(mongoURI, ()=>{
//         console.log("Connected to Mongo Successfully");
//     })
// }

// module.exports = connectToMongo;

const mongoose = require("mongoose");
// const colors = require("colors");
const dotenv = require("dotenv");
dotenv.config();

const connectToMongo = async () => {
  try {
    const conn = await mongoose.connect(
      // "mongodb://0.0.0.0:27017/inotebook",
      process.env.MONGODB_URL,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Exit with a non-zero status code to indicate an error
  }
};

module.exports = connectToMongo;
