import * as express from "express";

declare global {
  namespace Express {
    interface Request {
      user?: any; // or define a specific type if you have one
    }
  }
}
