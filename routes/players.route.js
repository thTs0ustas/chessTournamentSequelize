var express = require("express");
var router = express.Router();
const db = require("../models");
const checkMatchUps = require("./functions/checkMatchUps");
const { Player, Match, Participation } = db.sequelize.models;

/* GET users listing. */
router.get("/list", async function (req, res) {
  const participation = await Participation.findAll({
    include: [Player],
  });

  res.render("participations/list", {
    title: "List of participations",
    list: participation,
  });
});

router.get("/add", async (req, res) => {
  await Player.findAll({ raw: true }).then((data) => {
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

  await player.createParticipation();

  res.redirect("/players/list");
});

router.get("/matches/setUp", async (req, res) => {
  const part = await Participation.findAll({});
  const matchesSetUp = checkMatchUps(part).map((item) =>
    Match.create({
      participationId_1: item.participation_1,
      participationId_2: item.participation_2,
    })
  );

  await Promise.all(matchesSetUp);

  setImmediate(() => res.redirect("/players/matches"));
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
