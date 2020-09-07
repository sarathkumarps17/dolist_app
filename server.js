const express = require("express");
const connect = require("./config/db/db");

const app = express();
connect();
app.use(express.json({ extended: false }));

const routes = require("./routes/routes");

app.use(routes);

const PORT = 5000 || process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
