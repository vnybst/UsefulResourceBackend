import express from "express";
import { login, logout, refreshToken } from "../auth/authServer";

export default function authRouter() {
  return express
    .Router()
    .post("/login", login)
    .post("/refreshToken", refreshToken)
    .delete("/logout", logout);
}
