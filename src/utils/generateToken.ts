import jwt from "jsonwebtoken";

function generateAccessToken(user: object) {
  /*   const privateKey = Math.random().toString(36).slice(-10);
   */ const privateKey = `${process.env.ACCESS_TOKEN_SECRET}`;

  return jwt.sign(user, privateKey, { expiresIn: "15m" });
}

export default generateAccessToken;
