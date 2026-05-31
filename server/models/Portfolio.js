const mongoose = require("mongoose");

const portfolioSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    name: String,
    title: String,
    about: String,
    skills: String,

    github: String,
    linkedin: String,

    profileImage: String,
    resume: String,

    education: {
      college: String,
      degree: String,
      branch: String,
      cgpa: String,
      graduationYear: String,
    },

    experience: {
      role: String,
      organization: String,
      duration: String,
      description: String,
    },

    projects: [
      {
        title: String,
        description: String,
        techStack: String,
        githubLink: String,
        demoLink: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Portfolio",
  portfolioSchema
);