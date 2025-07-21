const express = require("express");
const cors = require("cors");

const docgiaRouter = require("./app/routes/docgia.route");
const nhanvienRouter = require("./app/routes/nhanvien.route");
const sachRouter = require("./app/routes/sach.route");
const nxbRouter = require("./app/routes/nxb.route");
const theodoimuonsachRouter = require("./app/routes/theodoimuonsach.route");

const ApiError = require("./app/api-error");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/reader", docgiaRouter);
app.use("/nhanvien", nhanvienRouter);
app.use("/sach", sachRouter);
app.use("/nxb", nxbRouter);
app.use("/theodoimuonsach", theodoimuonsachRouter);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to contact book application." });
});

app.use((req, res, next) => {
  return next(new ApiError(404, "Resource not found"));
});

app.use((err, req, res, next) => {
  res.status(err.statusCode || 3000).json({
    message: err.message || "Internall Server Error",
  });
});

module.exports = app;
