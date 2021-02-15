const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();

//Connection with DB

mongoose
  .connect(process.env.DB_CONNECT, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Database is connected sucessfully...");
  })
  .catch((err) => {
    console.log(err);
  });

//Body Parser
app.use(express.json());

//User Router

app.use("/users", require("./routes/users"));

//Private Router
app.use("/private", require("./routes/private"));
//Default Router

app.get("/", (req, res) => {
  res.send("Hello");
});

//PORT

PORT = process.env.PORT || 3000;

//Running the server

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}...`);
});
