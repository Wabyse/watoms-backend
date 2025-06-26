require("dotenv").config({ path: `${process.cwd()}/.env` });
const express = require("express");
const cors = require("cors"); //to let a front-end project uses the apis
const authRoutes = require("./routes/authRoutes");
const formRoutes = require("./routes/formRoutes");
const filesRoutes = require("./routes/filesRoutes");
const tasksRoutes = require("./routes/tasksRoutes");
const usersRoutes = require("./routes/usersRoutes");
const trainersRoutes = require("./routes/trainersRoutes");
const dataRoutes = require("./routes/dataRoutes");
const errorHandler = require("./middleware/errorMiddleware");
const { sequelize } = require("./db/models");

const app = express();

app.use(
  cors({
    origin: process.env.FRONT_BASEURL || "http://localhost:3001",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true })); //parses URL-encoded data from the request body

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/forms", formRoutes);
app.use("/api/v1/files", filesRoutes);
app.use("/api/v1/tasks", tasksRoutes);
app.use("/api/v1/users", usersRoutes);
app.use("/api/v1/teachers", trainersRoutes);
app.use("/api/v1/data", dataRoutes);

app.use("*", (req, res) => {
  res.status(404).json({
    status: "fail",
    message: "invalid endpoint",
  });
});

app.use(errorHandler);

const syncDatabase = async () => {
  try {
    await sequelize.authenticate(); //checking the connection
    console.log("Database connected successfully.");
    await sequelize.sync({ alter: false }); //syncronize the database with the model and alter any required alteration (true for dev, false for production)
    console.log("Database synchronized successfully");
  } catch (error) {
    console.error("Error synchronizing database:", error);
  }
};
syncDatabase();

const PORT = process.env.APP_PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
