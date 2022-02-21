const express = require("express");
const app = express();
const dbConnect = require("./config/db");
const usersRoute = require("./routes/api/users");
const profileRoute = require("./routes/api/profile");
const postsRoute = require("./routes/api/posts");
const authRoute = require("./routes/api/auth");

dbConnect();

app.get("/", (req, res) => {
  res.send("Api Running");
});

app.use("/api/users", usersRoute);
app.use("/api/profile", profileRoute);
app.use("/api/posts", postsRoute);
app.use("/api/auth", authRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`listening to port ${PORT}`);
});
