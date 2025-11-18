import jwt, { decode } from "jsonwebtoken";

const secret_key = process.env.SECRET_KEY;

const isLogin = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ success: false, message: "No token" });
    }

    const decoded = jwt.verify(token, secret_key);
    req.user = decoded;
    next();

  } catch (err) {
    res
      .status(401)
      .json({
        success: false,
        message: "Invalid token",
      });
  }
};

export default isLogin;
