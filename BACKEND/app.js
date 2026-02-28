const express = require("express");
const app = express();

app.use(express.json());

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

// conecta la ruta al server
app.listen(3000, () => console.log("Servidor corriendo"));