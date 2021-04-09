import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    projectName: {
      type: String,
      required: true,
    },
    projectDeadline: {
      type: Date,
      required: true,
      default: new Date(),
    },
    projectCreateDate: {
      type: Date,
      required: true,
      default: new Date(),
    },
    projectResponsible: {
      type: mongoose.Types.ObjectId,
      ref: "Agent",
      required: true,
    },
    tasks: {
      type: Array,
      default: []
    },
    status : {
      type : String,
      default : "onHold"
    }
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model("Project", projectSchema);

export default Project;
