import connectDb from "../../utils/connectDb";
import User from "../../models/User";
import sha1 from "sha1";
import jwt from "jsonwebtoken";
import isEmail from "validator/lib/isEmail";
import isLength from "validator/lib/isLength";

connectDb();

/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */

export default async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!isLength(name, { min: 3, max: 20 })) {
      return res.status(422).send("Nombre debe tener entre 3 y 20 caracteres");
    } else if (!isLength(password, { min: 6 })) {
      return res.status(422).send("La contraseña debe tener al menos 6 caracteres");
    } else if (!isEmail(email)) {
      return res.status(422).send("Email invalido");
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(422).send(`Ya existe un usuario con este email: ${email}`);
    }
    const hash = await sha1(password);
    const newUser = await new User({
      name,
      email,
      password: hash
    }).save();
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d"
    });
    res.status(201).json(token);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creando usuario");
  }
};
