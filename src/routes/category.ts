import express from "express";
import { getAllCategory, getCategoryById } from "../controllers/category";

export default function categoryRouter() {
  return express.Router().get("/", getAllCategory).get("/:id", getCategoryById);
}
