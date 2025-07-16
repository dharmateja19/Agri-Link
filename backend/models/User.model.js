import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required."],
    minlength: [2, "Name must be at least 2 characters long."],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required."],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/\S+@\S+\.\S+/, "Please enter a valid email."],
  },
  password: {
    type: String,
    required: [true, "Password is required."],
    minlength: [6, "Password must be at least 6 characters."],
  },
  mobile: {
    type: String,
    required: [true, "Mobile number is required."],
    unique: true,
    validate: {
      validator: function (v) {
        return /^[6-9]\d{9}$/.test(v.toString());
      },
      message: "Enter a valid 10-digit Indian mobile number.",
    },
  },
  role: {
    type: String,
    enum: {
      values: ["farmer", "buyer", "admin"],
      message: "Role must be farmer, buyer, or admin.(case-sensitive)",
    },
    required: [true, "Role is required."],
  },
  location: {
    type: String,
    required: [true, "Location is required."],
    minlength: [2, "Location must be at least 2 characters."],
  },
}, {timestamps: true});

const User = mongoose.model("User", UserSchema);
export default User;
