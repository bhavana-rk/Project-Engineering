require("dotenv").config();

const allowedCategories = ["bug", "deadline", "imposter", "vibe-code"];

module.exports = {
  allowedCategories,
  deleteToken: process.env.DELETE_TOKEN || "supersecret123",
  port: Number(process.env.PORT) || 3000,
};
