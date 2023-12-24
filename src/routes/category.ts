import express from "express";
import { getAllCategory, getCategoryById } from "../controllers/category";
const router = express.Router();

export const categoryRouter = () =>
  router.get("/", getAllCategory).get("/:id", getCategoryById);
