const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const writerRoutes = require("./routes/writer-route");
const userRoutes = require("./routes/user-route");
const publisherRoutes = require("./routes/publisher-route");
const bookRoutes = require("./routes/book-route");

const db = require("./models");

app.use(express.json());

// Basic CORS headers
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
});
app.get('/', (req, res) => {
  res.json({ status: 'ok', name: 'express-backend' });
});
app.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
});

app.use("/users", userRoutes);
app.use("/writers", writerRoutes);
app.use("/publishers", publisherRoutes);
app.use("/books", bookRoutes);

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ message: 'Not Found' });
});

// Centralized error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({ message: err.message || 'Internal Server Error' });
});
db.sequelize.sync().then(() => {
  console.log("Drop and Resync Db");

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}).catch(err => {
  console.log(err);
});
