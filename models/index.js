const Sequelize = require("sequelize");

const DB_NAME = "postgres"
const USERNAME = "postgres"
const PASSWORD = "flowerpower"

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: '35.202.174.119',
  username: USERNAME,
  password: PASSWORD,
  database: DB_NAME
});

// import models into sequelize
const Like = sequelize.import("./Like");
const Message = sequelize.import("./Message");
const User = sequelize.import("./User");
const Layouts = sequelize.import("./layouts")

// setup associations between models
User.hasMany(Message);
User.hasMany(Layouts)

Message.belongsTo(User);
Message.hasMany(Like);

Layouts.belongsTo(User)

Like.belongsTo(User);
Like.belongsTo(Message);

module.exports = {
  sequelize,
  Like,
  Message,
  User,
  Layouts
};
