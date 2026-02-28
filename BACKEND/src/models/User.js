const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    dni: {
      type: String,
      required: [true, "El DNI es obligatorio"],
      unique: true,
      trim: true
    },
    name: {
      type: String,
      required: [true, "El nombre es obligatorio"]
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false
    },
    role: {
      type: String,
      enum: ["admin", "supervisor", "tecnico"],
      default: "tecnico"
    },
    active: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

// esto sirve para encriptar la contraseña
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

// validacion de comparacion de la contraseña
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};