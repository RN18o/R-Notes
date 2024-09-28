const connectToMongo = require("./db");
const express = require("express");
var cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();

connectToMongo();
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Available Routes
app.use("/check", () => {
  console.log("welcome");
});
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

// Use the Frontend App
const __dirname1 = path.resolve();
console.log(__dirname1);
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "dist")));

  // Rander frontend for any path
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname1, "dist", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("Only api is Running");
  });
}
app.listen(port, () => {
  console.log(` backend listening at http://localhost:${port}`);
});
