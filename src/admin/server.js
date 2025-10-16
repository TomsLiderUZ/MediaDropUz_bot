const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = 3000;

const usersPath = path.join(__dirname, "..", "users-base", "users.json");
const ADMIN_PASSWORD = "123456"; // O'zingiz xohlagan parol

app.use(express.json());
app.use(express.static(path.join(__dirname)));

let isLoggedIn = false;

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "logn.html"));
});

app.post("/login", (req, res) => {
  if (req.body.password === ADMIN_PASSWORD) {
    isLoggedIn = true;
    res.sendStatus(200);
  } else {
    res.sendStatus(401);
  }
});

app.get("/admin", (req, res) => {
 // if (!isLoggedIn) return res.redirect("/");
   res.sendFile(path.join(__dirname, "admin.html")
  // );
});

app.get("/api/users", (req, res) => {
  const data = JSON.parse(fs.readFileSync(usersPath));
  res.json(data);
});

app.put("/api/users/:id", (req, res) => {
  const id = req.params.id;
  const { role } = req.body;
  const users = JSON.parse(fs.readFileSync(usersPath));
  const user = users.find(u => u.id == id);
  if (user) {
    user.role = role;
    fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});

app.listen(PORT, () => {
  console.log(`Admin panel: http://localhost:${PORT}`);
});
