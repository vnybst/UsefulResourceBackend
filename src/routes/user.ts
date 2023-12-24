import express from "express";
import {
  createUser,
  deleteUser,
  getUserById,
  updateUser,
} from "../controllers/user";
import { validateToken } from "../auth/authServer";

export default function userRouter() {
  return express
    .Router()
    .get("/:id", validateToken, getUserById)
    .post("/createUser", createUser)
    .patch("/:id", validateToken, updateUser)
    .delete("/:email", validateToken, deleteUser);
}
