const { map, some, compact, shuffle } = require("lodash");

const checkMatchUps = (listOfMatches) => {
  let arr = [];
  let rnd = Math.floor(Math.random() * listOfMatches.length);
  let rnd2 = Math.floor(Math.random() * listOfMatches.length);

  while (arr.length <= 13) {
    if (rnd === rnd2) {
      rnd = Math.floor(Math.random() * listOfMatches.length);
      rnd2 = Math.floor(Math.random() * listOfMatches.length);
      continue;
    }
    const checkReverseMatch = some(arr, {
      participation_1: listOfMatches[rnd2].id,
      participation_2: listOfMatches[rnd].id,
    });
    const checkSameMatch = some(arr, {
      participation_1: listOfMatches[rnd].id,
      participation_2: listOfMatches[rnd2].id,
    });

    const checkForForthMatchUp = compact(
      map(arr, (item) => {
        if (
          item.participation_1 === listOfMatches[rnd].id ||
          item.participation_2 === listOfMatches[rnd].id
        )
          return true;
      })
    );
    const checkForForthMatchUp2 = compact(
      map(arr, (item) => {
        if (
          item.participation_1 === listOfMatches[rnd2].id ||
          item.participation_2 === listOfMatches[rnd2].id
        )
          return true;
      })
    );

    if (checkReverseMatch || checkSameMatch) {
      rnd = Math.floor(Math.random() * listOfMatches.length);
      rnd2 = Math.floor(Math.random() * listOfMatches.length);
      continue;
    } else if (checkForForthMatchUp.length === 3) {
      rnd = Math.floor(Math.random() * listOfMatches.length);
      rnd2 = Math.floor(Math.random() * listOfMatches.length);
      continue;
    } else if (checkForForthMatchUp2.length === 3) {
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
