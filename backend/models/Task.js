const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    user: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: true 
    },

    title: { 
      type: String, 
      required: true, 
      trim: true 
    },

    description: {              // ✅ ADDED
      type: String,
      default: "",
      trim: true
    },

    important: {               // ✅ ADDED (you use this in frontend)
      type: Boolean,
      default: false
    },

    completed: { 
      type: Boolean, 
      default: false 
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);