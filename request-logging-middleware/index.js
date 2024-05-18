const express = require("express");
const fs = require("fs");
const PORT = 5000;

function loggerMiddleware(req, res, next) {
  fs.appendFileSync(
    "LogDetails.txt",
    `Hey Amanulla Request received in ${req.url} with ${
      req.method
    } method from ${req.ip} at Timestamp: ${new Date().toISOString()}  \n `
  );
  next();
}

const app = express();

app.use(loggerMiddleware);

app.get("/mydata", (req, res) => {
  res.status(200).json({
    message: "Will add data soon",
  });
});

app.use("/*", (req, res) => {
  res.status(400).json({
    error: "Path not found",
  });
});

app.listen(PORT, () => {
  console.log(`Express server up and running at port ${PORT}`);
});
