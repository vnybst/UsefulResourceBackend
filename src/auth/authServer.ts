import { NextFunction, Request, Response } from "express";
import { db } from "../database/models";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
} from "../utils/auth";
import config from "../config";

let refreshTokens: string[] = [];

export async function login(req: Request, res: Response) {
  const { email } = req.body;
  const user = await db.UserDetails.findOne({ where: { email } });
  if (!user) return res.status(400).json({ message: "User does not exists !" });

  const accessToken = generateAccessToken({ user: email });
  const refreshToken = generateRefreshToken({ user: email });
  refreshTokens.push(refreshToken);

  await db.UserDetails.update(
    { accessToken, refreshToken },
    { where: { email } }
  );
  return res.status(200).json({
    accessToken: accessToken,
    refreshToken: refreshToken,
  });
}

export async function refreshToken(req: Request, res: Response) {
  const { email, token } = req.body;
  if (!refreshTokens.includes(token))
    return res.status(400).json({ message: "Invalid refresh token !" });
  refreshTokens = refreshTokens.filter((c) => c != req.body.token);

  const accessToken = generateAccessToken({ user: email });
  const refreshToken = generateRefreshToken({ user: email });

  await db.UserDetails.update(
    { accessToken, refreshToken },
    { where: { email } }
  );
  return res
    .status(200)
    .json({ accessToken: accessToken, refreshToken: refreshToken });
}

export async function logout(req: Request, res: Response) {
  const { token } = req.body;
  refreshTokens = refreshTokens.filter((c) => c != token);
  return res.status(200).json({ message: "Logged out successfully !" });
}

export async function validateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.headers["authorization"];
    const bearerToken = authHeader?.split(" ");
    if (!Array.isArray(bearerToken))
      return res.status(400).json({ message: "Token not present !" });

    const token = bearerToken[1];
    if (!token)
      return res.sendStatus(400).json({ message: "Token not present !" });

    const user = await verifyToken(token, config.authSecretKey);
    req["user"] = user;
    next();
  } catch (error) {
    console.log(error);
    if (error instanceof Error)
      return res.status(403).json({ message: error.message });
    return res.status(403).json({ message: error });
  }
}
