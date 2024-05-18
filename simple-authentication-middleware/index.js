const express = require("express");
const app = express();
const PORT = 5000;

const userInfo = [];

function loggingMiddleware(req, res, next) {
  console.log("Logging middleware activated");
  const userExists = userInfo.find(
    (elem) =>
      req.body.email === elem.email && req.body.password === elem.password
  );
  if (userExists) {
    next();
  } else {
    res.status(401).json({
      error: "INVALID CREDENTIALS",
    });
  }
}

app.use(express.json());

app.post("/signUp", (req, res) => {
  console.log("Sign Up Route Hit");
  userInfo.push(req.body);
  res.status(201).json({
    email: "amanmulla167@gmail.com",
    password: "Amanulla Iqbal Mulla",
  });
});

app.post("/signIn", loggingMiddleware, (req, res) => {
  console.log("Sign In Route Hit");
  res.status(200).json({
    message: "Sign in as Amanulla ",
  });
});

app.use("/*", (req, res) => {
  res.status(404).json({
    error: "Path not found",
  });
});

app.listen(PORT, () => {
  console.log(`Express server up and running at port ${PORT}`);
});
