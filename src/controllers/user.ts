import { Request, Response } from "express";
import { db } from "../database/models";

export async function getUserById(req: Request, res: Response) {
  const { id } = req.params;
  const user = await db.UserDetails.findByPk(id, {
    attributes: ["id", "name", "email", "createdAt"],
  });
  if (!user) return res.status(404).json({ message: "User does not exists !" });

  return res.status(200).json(user);
}

export function updateUser() {
  return { status: "success" };
}
export function deleteUser() {
  return { status: "success" };
}

export async function createUser(req: Request, res: Response) {
  const { email, name } = req.body;
  const user = { user: email, name };
  const isUserPresent = await db.UserDetails.findOne({ where: { email } });
  if (!isUserPresent) {
    await db.UserDetails.create({ email, name });
    return res.status(201).send(user);
  }
  return res.status(400).json({ message: "User already exists !" });
}
