const { map, some, compact, shuffle } = require("lodash");

const checkMatchUps = (listOfMatches) => {
  let arr = [];
  let rnd = Math.floor(Math.random() * listOfMatches.length);
  let rnd2 = Math.floor(Math.random() * listOfMatches.length);

  while (rnd === rnd2) {
    rnd = Math.floor(Math.random() * listOfMatches.length);
    rnd2 = Math.floor(Math.random() * listOfMatches.length);
  }
  while (arr.length <= 15) {
    const checkReverseMatch = some(arr, {
      participation_1: listOfMatches[rnd].id,
      participation_2: listOfMatches[rnd2].id,
    });
    const checkForForthMatchUp = compact(
      map(arr, (item) => {
        if (!item.participation_1 == item.id || item.participation_2 == item.id)
          return true;
      })
    );

    if (checkReverseMatch || checkForForthMatchUp.length > 3) {
      rnd = Math.floor(Math.random() * listOfMatches.length);
      rnd2 = Math.floor(Math.random() * listOfMatches.length);
      continue;
    }

    arr = [
      ...shuffle(arr),
      {
        participation_1: listOfMatches[rnd].id,
        participation_2: listOfMatches[rnd2].id,
      },
    ];
  }

  return arr;
};

module.exports = checkMatchUps;
