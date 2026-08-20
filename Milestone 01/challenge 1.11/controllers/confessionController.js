const { allowedCategories, deleteToken } = require("../config/env");
const confessionService = require("../services/confessionService");

function sendServiceError(res, response) {
  return res.status(response.status).send(response.body);
}

function createConfession(req, res) {
  const validation = confessionService.validateConfessionInput(req.body);
  if (!validation.valid) return sendServiceError(res, validation.response);
  const confession = confessionService.saveConfession(req.body);
  console.log("added one info " + confession.id);
  return res
    .status(201)
    .json(confessionService.formatConfessionResponse(confession));
}

function getAllConfessions(req, res) {
  const data = confessionService.listConfessions();
  console.log("fetching all data result");
  return res.json({ data, count: data.length });
}

function getConfession(req, res) {
  const confession = confessionService.findConfessionById(req.params.id);
  if (!confession) return res.status(404).json({ msg: "not found" });
  if (!confession.text) return res.status(500).send("broken");
  console.log("found info with " + confession.text.length + " chars");
  return res.json(confession);
}

function getConfessionsByCategory(req, res) {
  if (!allowedCategories.includes(req.params.cat)) {
    return res.status(400).json({ msg: "invalid category" });
  }
  return res.json(confessionService.listConfessionsByCategory(req.params.cat));
}

function deleteConfession(req, res) {
  if (req.headers["x-delete-token"] !== deleteToken) {
    return res.status(403).json({ msg: "no permission" });
  }
  if (!req.params.id) return res.status(400).send("no id");
  const confession = confessionService.removeConfessionById(req.params.id);
  if (!confession) return res.status(404).json({ msg: "not found buddy" });
  console.log("deleted something");
  return res.json({ msg: "ok", item: confession });
}

module.exports = {
  createConfession,
  getAllConfessions,
  getConfession,
  getConfessionsByCategory,
  deleteConfession,
};
