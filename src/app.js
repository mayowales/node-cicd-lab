
const express = require("express");
const { filterUsers } = require("./utils");

const app = express();

app.use(express.json());

const users = [
  { id: 1, name: "Alice", email: "alice@example.com", role: "admin", active: true },
  { id: 2, name: "Bob", email: "bob@example.com", role: "user", active: true },
];

app.get("/api/users", (req, res) => {
  const { role, status } = req.query;
  const result = filterUsers(users, role, status);

  if (result.length === 0) {
    return res.status(404).json({ message: "No users found" });
  }

  return res.json(result);
});

app.get("/api/users/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const user = users.find((u) => u.id === id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  return res.json(user);
});

app.post("/api/users", (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: "Name and email are required" });
  }

  const newUser = {
    id: users.length + 1,
    name,
    email,
    role: "user",
    active: true,
  };

  users.push(newUser);
  return res.status(201).json(newUser);
});

app.post("/api/login", (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  // Never log sensitive credentials
  console.log(`Login attempt for: ${email}`);
  return res.json({ token: "fake-jwt-token" });
});

module.exports = app;
