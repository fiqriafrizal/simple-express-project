const express = require("express");
const app = express();
const port = 3000;
const userRoutes = require("./routes/user-route");
const db = require("./models");


app.use(express.json());
app.use("/users", userRoutes);


db.sequelize.sync().then(() => {
  console.log("Drop and Resync Db");

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}).catch(err => {
  console.log(err);
});
