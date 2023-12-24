import { Request, Response } from "express";
import { db } from "../database/models";
import { createTokenForNewUser } from "../auth/authServer";

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
  const isUserPresent = await db.UserDetails.findOne({
    where: { email },
    attributes: ["id", "name", "email", "accessToken", "refreshToken"],
  });
  if (!isUserPresent) {
    const createdUser = await db.UserDetails.create({ email, name });
    console.log(createdUser.getDataValue("id"));
    const { accessToken, refreshToken } = await createTokenForNewUser(email);
    await db.UserDetails.update(
      { accessToken, refreshToken },
      { where: { email } }
    );
    return res
      .status(201)
      .send({
        ...user,
        id: createdUser.getDataValue("id"),
        accessToken,
        refreshToken,
      });
  }

  return res.status(400).json(isUserPresent);
}
