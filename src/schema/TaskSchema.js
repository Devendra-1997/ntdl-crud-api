import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  task_name: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    default: "easy",
  },
  time_to_complete: {
    type: Number,
    required: true,
  },
  priority: {
    type: String,
    default: "low",
  },
});

export default mongoose.model("Task", TaskSchema);
