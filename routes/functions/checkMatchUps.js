const { shuffle, random, sortBy, isEqual } = require("lodash");
const { map, some } = require("lodash/fp");

const checkMatchUps = (listOfMatches) => {
  let matches = [];

  const limit = listOfMatches.length - 1;

  const listOfIds = map("id")(listOfMatches);

  let rnd = random(limit);
  let rnd2 = random(limit);

  while (matches.length < 15) {
    if (rnd === rnd2) {
      rnd = random(limit);
      rnd2 = random(limit);
      continue;
    }

    let setExist = some((set) =>
      isEqual(sortBy(set), sortBy([listOfIds[rnd], listOfIds[rnd2]]))
    )(matches);

    const idExist = (id) =>
      map((set) => set[0] === id || set[1] === id)(matches).filter(
        (item) => item !== false
      );

    console.log(idExist(1));

    if (setExist) {
      rnd = random(limit);
      rnd2 = random(limit);
      continue;
    }

    if (idExist(listOfIds[rnd]).length >= 3) {
      rnd = random(limit);
      continue;
    }

    if (idExist(listOfIds[rnd2]).length >= 3) {
      rnd2 = random(limit);
      continue;
    }

    matches = [...shuffle(matches), shuffle([listOfIds[rnd], listOfIds[rnd2]])];
  }

  return matches;
};

module.exports = checkMatchUps;
