const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// esto es la logica del login

exports.login = async (req, res) => {
  try {
    const { dni, password } = req.body;

    // 1️⃣ Buscar usuario por DNI
    const user = await User.findOne({ dni });

    if (!user) {
      return res.status(400).json({ message: "Usuario no encontrado" });
    }

    // 2️⃣ Verificar contraseña
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Contraseña incorrecta" });
    }

    // 3️⃣ Crear token
    const token = jwt.sign(
      { id: user._id },
      "secreto_super_seguro",
      { expiresIn: "1h" }
    );

    res.json({ token });

  } catch (error) {
    res.status(500).json({ message: "Error en login" });
  }
};