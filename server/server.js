const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const path = require("path");
const session = require("express-session");

const app = express();
const PORT = 5000;

app.use(
  session({
    secret: "bash", // Used to sign the session ID
    resave: false, // Avoids resaving unchanged sessions
    saveUninitialized: false, // Prevents saving empty sessions
    cookie: { secure: false }, // Set to true if using HTTPS
  })
);

app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(express.json());

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "lib",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
  var sql =
    "CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT PRIMARY KEY, username TEXT, email VARCHAR(255) UNIQUE, password VARCHAR(255))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
});

app.get("/profile", (req, res) => {
  if (!req.session.user) {
    return res.send({ user: "" });
  } else {
    return res.send({ user: req.session.user });
  }
});

app.get("/signout", (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.send({ status: "failed" });
    res.send({ status: "success" });
  });
});

app.post("/sign_up", (req, res) => {
  sql = "INSERT INTO users (username, email, password) VALUES (?,?,?);";
  const values = [req.body.name, req.body.email, btoa(req.body.password)];
  con.query(sql, values, (err, result) => {
    if (err) return res.json({ message: "Something went wrong" });

    req.session.user = result.username;
    res.send("Account created");
    return res.json({ success: "Account created" });
  });
});

app.post("/login", (req, res) => {
  sql = "SELECT * FROM users WHERE email=?";
  const values = [req.body.email, req.body.password];
  con.query(sql, values[0], (err, result) => {
    if (err) return res.json({ message: "Something went wrong" });
    if (result[0].email && atob(result[0].password) == values[1]) {
      req.session.user = result[0].username;
      return res.json({ success: true });
    } else {
      return res.json({ success: false });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
