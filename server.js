const express = require("express");
const connect = require("./config/db/db");

const path = require("path");

const app = express();
connect();
app.use(express.json({ extended: false }));

const routes = require("./routes/routes");

app.use(routes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
