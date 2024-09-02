import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const USERS_FILE = path.join(__dirname, "users.json");

app.use(cors());
app.use(express.json());

const readUsersFromFile = () => {
  if (!fs.existsSync(USERS_FILE)) {
    return [];
  }
  const data = fs.readFileSync(USERS_FILE, "utf-8");
  return JSON.parse(data);
};

const writeUsersToFile = (users) => {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
};

app.post("/signup", (req, res) => {
  const { email, password, name, target, preferredActivity } = req.body;
  const users = readUsersFromFile();

  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const newUser = { email, password, name, target, preferredActivity };
  users.push(newUser);
  writeUsersToFile(users);

  res.status(201).json(newUser);
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const users = readUsersFromFile();

  const existingUser = users.find(
    (user) => user.email === email && user.password === password
  );
  if (!existingUser) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  res.status(200).json(existingUser);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
