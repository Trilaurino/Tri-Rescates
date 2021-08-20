import connectDb from "../../utils/connectDb";
import User from "../../models/User";
import sha1 from "sha1";
import jwt from "jsonwebtoken";

connectDb();
/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */

export default async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(404).send("No hay usuarios con ese email");
    }
    const passwordsMatch = await sha1(password) === user.password;
    if (passwordsMatch) {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d"
      });
      res.status(200).json(token);
    } else {
      res.status(401).send("Las contraseñas no coinciden");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error iniciando sesion");
  }
};
