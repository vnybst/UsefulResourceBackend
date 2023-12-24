import jwt from "jsonwebtoken";
import config from "../config";

// refreshTokens

export function generateAccessToken(user) {
  return jwt.sign(user, config.authSecretKey, { expiresIn: "15m" });
}

export function generateRefreshToken(user) {
  const refreshToken = jwt.sign(user, config.refreshSecretKey, {
    expiresIn: "20m",
  });
  return refreshToken;
}

export const verifyToken = (token, secret) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, user) => {
      console.log(token, secret, err);
      if (err) {
        reject("Token invalid");
      } else {
        resolve(user);
      }
    });
  });
};
