const { allowedCategories } = require("../config/env");

const confessions = [];
let nextConfessionId = 0;

function validateConfessionInput(confessionData) {
  if (!confessionData)
    return { valid: false, response: { status: 400, body: { msg: "bad" } } };
  if (!confessionData.text)
    return {
      valid: false,
      response: { status: 400, body: { msg: "need text" } },
    };
  if (confessionData.text.length >= 500) {
    return {
      valid: false,
      response: {
        status: 400,
        body: {
          error: "text too big, must be less than 500 characters long buddy",
        },
      },
    };
  }
  if (confessionData.text.length <= 0)
    return { valid: false, response: { status: 400, body: "too short" } };
  if (!allowedCategories.includes(confessionData.category)) {
    return {
      valid: false,
      response: { status: 400, body: "category not in stuff" },
    };
  }
  return { valid: true };
}

function saveConfession(confessionData) {
  const confession = {
    id: ++nextConfessionId,
    text: confessionData.text,
    category: confessionData.category,
    created_at: new Date(),
  };
  confessions.push(confession);
  return confession;
}

function formatConfessionResponse(confession) {
  return {
    id: confession.id,
    text: confession.text,
    category: confession.category,
    created_at: confession.created_at,
  };
}

function listConfessions() {
  // Sort a copy so a read does not mutate the repository's insertion order.
  return [...confessions].sort(
    (first, second) => second.created_at - first.created_at,
  );
}

function findConfessionById(confessionId) {
  return confessions.find(
    (confession) => confession.id === parseInt(confessionId),
  );
}

function listConfessionsByCategory(category) {
  // Reverse insertion order to keep category results newest-first, matching the starter.
  return confessions
    .filter((confession) => confession.category === category)
    .reverse();
}

function removeConfessionById(confessionId) {
  const confessionIndex = confessions.findIndex(
    (confession) => confession.id === parseInt(confessionId),
  );
  if (confessionIndex === -1) return null;
  return confessions.splice(confessionIndex, 1)[0];
}

module.exports = {
  findConfessionById,
  formatConfessionResponse,
  listConfessions,
  listConfessionsByCategory,
  removeConfessionById,
  saveConfession,
  validateConfessionInput,
};
