var express = require("express");
var router = express.Router();
const db = require("../models");
const checkMatchUps = require("./functions/checkMatchUps");
const { Player, Match, Participation } = db.sequelize.models;

/* GET users listing. */
router.get("/list", async function (req, res) {
  const participation = await Participation.findAll({
    attributes: ["id"],
    include: [Player],
  });

  res.render("participations/list", {
    title: "List of participations",
    list: participation,
  });
});

router.get("/add", async (req, res) => {
  await Player.findAll({ attributes: ["id"], raw: true }).then((data) => {
    if (data.length === 10)
      res.render("participations/notEmpty", {
        title: "Add new Player",
        message: "No more empty spots!!",
      });
    else
      res.render("participations/createParticipation", {
        title: "Add new Player",
        message: "Add new player participation",
        remaining: 10 - data.length,
      });
  });
});

router.post("/create", async (req, res) => {
  const player = await Player.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  });
  try {
    await player.createParticipation();

    res.redirect("/players");
  } catch (e) {
    res.send("Participation exists");
  }
});

router.post("/matches", async (req, res) => {
  const part = await Participation.findAll({
    attributes: ["id", "playerId"],
  });
  try {
    for (const item of checkMatchUps(part)) {
      await Match.create({
        participationId_1: item.participation_1,
        participationId_2: item.participation_2,
      });
    }
    res.redirect("/players/matches");
  } catch (e) {
    res.send(e);
  }
});

router.get("/matches", async (req, res) => {
  const matches = await Match.findAll({
    attributes: ["participationId_1", "participationId_2"],
    include: [
      {
        model: Participation,
        attributes: ["id"],
        as: "Participation1",
        include: [Player],
      },
      {
        model: Participation,
        attributes: ["id"],
        as: "Participation2",
        include: [Player],
      },
    ],
  });

  res.render("participations/matches", {
    title: "List of Matches",
    list: matches,
  });
});

module.exports = router;
