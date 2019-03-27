const express = require("express");
const router = express.Router();
const { layouts } = require("../models");
const { authMiddleware } = require("./auth");
const Sequelize = require("sequelize");

// create a layouts
router.post("/layouts", authMiddleware, (req, res) => {
    layouts.create({
        layouts: req.body.layout,
        userId: req.user.get("id")
    })
        .then(layouts => res.json({ layouts }))
        .catch(err => {
            if (err instanceof Sequelize.ValidationError) {
                return res.status(400).send({ errors: err.errors });
            }
            res.status(500).send();
        });
});

// read all layouts
router.get("/layouts", (req, res) => {
    layouts.findAll({
        include: [{}],
        limit: req.query.limit || 100,
        offset: req.query.offset || 0,
        order: [["createdAt", "DESC"]]
    }).then(layouts => res.json({ layouts }));
});

// read layouts by id
router.get("/:id", (req, res) => {
    layouts.findById(req.params.id, {})
    .then(layouts => res.json({ layouts }));
});

// update layouts by id
router.patch("/:id", authMiddleware, (req, res) => {
  layouts.update(req.body, {
    where: {
      id: req.params.id
    }
  }).then(layouts => res.json({ layouts }));
});

// // delete layouts
// router.delete("/:id", authMiddleware, (req, res) => {
//   layouts.destroy({
//     where: {
//       id: req.params.id,
//       userId: req.user.id
//     }
//   }).then(destroyedCount => {
//     if (destroyedCount === 0) {
//       return res.status(400).send({ error: "layouts does not exist" });
//     }
//     res.json({ id: req.params.id });
//   });
// });

module.exports = router;