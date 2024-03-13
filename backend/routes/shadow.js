const router = require("express").Router();
const Shadow = require("../models/shadow.model.js");

router.route("/add").post((req, res) => {
    const board = req.body.board;
    const score = req.body.score;
    const shape = req.body.shape;

    const newShadow = new Shadow({
        board, 
        score, 
        shape
    });

    newShadow.save()
        .then(() => res.json("New Shadow Added!"))
        .catch(err => res.status(400).json("Error: " + err));
});

router.route("/get-all-shadows").get((req, res) => {
    Shadow.find()
        .then(item => res.json(item))
        .catch(err => res.status(400).json("Error: " + err));
});

router.route("/delete-all-shadows").delete((req, res) => {
    Shadow.deleteMany({})
        .then(() => res.json("All items deleted successfully"))
        .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;