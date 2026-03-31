import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  const isProduction = process.env.NODE_ENV === "production";

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in ms
    httpOnly: true, // prevent XSS attacks
    // In production (cross-origin on Vercel), must use "none" + secure:true
    // In development (same-origin localhost), "lax" works fine
    sameSite: isProduction ? "none" : "lax",
    secure: isProduction, // "none" requires secure:true
  });

  return token;
};
