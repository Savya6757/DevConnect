if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const dbConnect = require("./config/db");
const usersRoute = require("./routes/api/users");
const profileRoute = require("./routes/api/profile");
const postsRoute = require("./routes/api/posts");
const authRoute = require("./routes/api/auth");
const path = require("path");
const compression = require("compression");

dbConnect();

app.use(express.json({ extended: false }));
app.use(compression());

app.use("/api/user", usersRoute);
app.use("/api/profile", profileRoute);
app.use("/api/posts", postsRoute);
app.use("/api/auth", authRoute);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`listening to port ${PORT}`);
});
