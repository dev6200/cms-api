import express from "express";
// import authRoutes from "./routes/auth";
import songRoutes from "./routes/songs";
import { authMiddleware } from "./middleware/authMiddleware";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Authentication routes
// app.use("/api/auth", authRoutes);

app.use("/songs", songRoutes);

// Protected route example
app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({ message: "This is a protected route" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
