exports.createTask = async (req, res) => {
  try {
    const { machineId, description, scheduledDate } = req.body;

    // 1️⃣ Verificar que la máquina exista
    const machine = await Machine.findById(machineId);
    if (!machine) {
      return res.status(404).json({ message: "Máquina no encontrada" });
    }

    // 2️⃣ Crear tarea
    const task = await Task.create({
      machine: machineId,
      createdBy: req.user.id,
      description,
      scheduledDate
    });

    res.status(201).json(task);

  } catch (error) {
    res.status(500).json({ message: "Error al crear tarea" });
  }
};