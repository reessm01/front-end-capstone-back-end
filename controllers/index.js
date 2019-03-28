const users = require("./users");
const messages = require("./messages");
const likes = require("./likes");
const layouts = require("./layouts")
const { router } = require("./auth");

module.exports = {
  auth: router,
  likes,
  messages,
  users,
  layouts
};
