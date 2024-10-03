import express, { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

// Dummy user data (You should use a database in a real app)
const users: { [key: string]: { password: string } } = {};

// Environment variable for JWT secret (use a real secret in production)
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

// Register route
router.post("/register", async (req: Request<{}>, res: Response) => {
  const { username, password } = req.body;

  if (users[username]) {
    res.status(400).json({ message: "User already exists" });
    return;
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);
  users[username] = { password: hashedPassword };

  res.status(201).json({ message: "User registered successfully" });
});

// Login route
router.post("/login", async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = users[username];

  if (!user) {
    res.status(400).json({ message: "Invalid username or password" });
    return;
  }

  // Compare hashed password
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    res.status(400).json({ message: "Invalid username or password" });
    return;
  }

  // Create JWT token
  const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "1h" });
  res.json({ token });
});

router.post("/test", async (req: Request, res: Response) => {
  res.json({
    message: "working",
  });
});

export default router;
