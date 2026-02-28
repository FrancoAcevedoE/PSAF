

exports.createUser = async (req, res) => {
  try {
    const { dni, name, password, role } = req.body;

    const userExists = await User.findOne({ dni });
    if (userExists) {
      return res.status(400).json({ message: "El DNI ya existe" });
    }

    const user = await User.create({
      dni,
      name,
      password,
      role
    });

    res.status(201).json({ message: "Usuario creado correctamente" });

  } catch (error) {
    res.status(500).json({ message: "Error al crear usuario" });
  }
};


protect,
authorize("admin")