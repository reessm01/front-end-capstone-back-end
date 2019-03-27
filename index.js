const express = require("express")
const morgan = require("morgan");
const cors = require("cors")
const passport  = require("passport")
const { Strategy } = require("passport-jwt")
const controllers = require("./controllers")
const { jwtOptions, authMiddleware } = require("./controllers/auth")

const app = express()

app.set("port", process.env.PORT || 3000)

app.use(cors())
app.use(morgan("tiny"))
app.use(express.json())

passport.use(
    new Strategy(jwtOptions, (payload, done) => {
      User.findById(payload.id).then(user => done(null, user || false));
    })
  );
  app.use(passport.initialize())

app.use("/auth", controllers.auth)
app.use("/users", controllers.users)
app.use("/messages", controllers.messages)
app.use("/likes", authMiddleware, controllers.likes)
app.use("/layouts", controllers.layouts)