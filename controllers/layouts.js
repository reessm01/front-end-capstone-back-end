const express = require("express");
const router = express.Router();
const { Layouts } = require("../models");
const { authMiddleware } = require("./auth");
const Sequelize = require("sequelize");

// create a layouts
router.post("/", authMiddleware, (req, res) => {
    Layouts.create({
        layout: req.body.layout,
        userId: req.user.get("id"),
        name: req.body.name
    })
        .then(layout => res.json({ layout }))
        .catch(err => {
            if (err instanceof Sequelize.ValidationError) {
                return res.status(400).send({ errors: err.errors });
            }
            console.log(err)
            res.status(500).send();
        });
});

// read all layouts
router.get("/", (req, res) => {
    Layouts.findAll({
        limit: req.query.limit || 100,
        offset: req.query.offset || 0,
        order: [["createdAt", "DESC"]]
    })
    .then(layouts => res.json({ layouts }))
    .catch(err=>{
        console.log(err)
        res.status(500).send({error:err})
    });;
});

// read layouts by id
router.get("/:id", (req, res) => {
    Layouts.findAll({
        where: { userId: req.params.id }
    })
        .then(layouts => res.json({ layouts }))
        .catch(err=>{
            console.log(err)
            res.status(500).send({error:err})
        });
});

// update layouts by id
router.patch("/:id", authMiddleware, (req, res) => {
    Layouts.update(req.body, {
        where: {
            id: req.params.id
        }
    })
    .then(layout => res.json({ layout }))
    .catch(err=>{
        console.log(err)
        res.status(500).send({error:err})
    });
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