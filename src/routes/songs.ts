import express, { Request, Response } from "express";

const router = express.Router();

router.get("/", async (req, res) => {
  res.json({
    message: "Songs",
  });
});

export default router;
