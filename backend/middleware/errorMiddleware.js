const res = require("express/lib/response");

const errorHandler = (err, res, req, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  res.json({
    message: err.message,
    stark: process.env.NODE_ENV === "production" ? null : err.stark
  });
};
