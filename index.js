const path = require("path");
const express = require("express");
// const rateLimit = require("express-rate-limit");
// const helmet = require("helmet");
// const xss = require("xss-clean");
// const hpp = require("hpp");
// const cookieParser = require("cookie-parser");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const userRouter = require("./routes/userRoutes");

const app = express();

app.use(express.static(path.join(__dirname, "public")));

// const limiter = rateLimit({
//   max: 100,
//   windowMs: 60 * 60 * 1000,
//   message: "Too many requests from this IP, please try again in an hour!",
// });

app.use(limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: "10kb" }));
// app.use(cookieParser());

// Data sanitization against XSS
// app.use(xss());

app.get("/", (req, res) => {
  res.status(200).json({
    status: "sucess",
    message: "tours-mada static files",
  });
});

// 3) ROUTES
app.use("/users", userRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server! `, 404));
});

app.use(globalErrorHandler);

const PORT = process.env.PORT || 3100;

const server = app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
