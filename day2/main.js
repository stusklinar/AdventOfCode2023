let blueReg = /(.*\d) (blue)/;
let greenReg = /(.*\d) (green)/;
let redReg = /(.*\d) (red)/;

const totalRed = 12;
const totalGreen = 13;
const totalBlue = 14;

const fs = require("node:fs");
fs.readFile(
  "/Users/stu.sklinar/code/AdventOfCode2023/day2/input.txt",
  "utf8",
  (err, data) => {
    var lines = data.split("\n");
    let rollingTotal = 0;

    lines.forEach((line) => {
      let number = Number(getGameNumber(line));
      let sets = getAllSets(line);

      let isGameValid = checkValid(sets);

      if (isGameValid) {
        rollingTotal += number;
      }
    });
    console.log(rollingTotal);

  }

);

function getGameNumber(line) {
  let gameIdx = line.indexOf("Game");
  let gameNumberIdx = line.indexOf(":");
  let gameNumber = line.substring(gameIdx + 4, gameNumberIdx);
  return gameNumber;
}

function checkValid(sets) {
  var isGameValid = true;

  sets.forEach((set) => {
    let workingSet = getSet(set);
    let blueCount = getColourFromSet(workingSet, "blue");
    let greenCount = getColourFromSet(workingSet, "green");
    let redCount = getColourFromSet(workingSet, "red");

    if (blueCount > totalBlue) {
      isGameValid = false;
    }

    if (greenCount > totalGreen) {
      isGameValid = false;
    }

    if (redCount > totalRed) {
      isGameValid = false;
    }
  });
  return isGameValid;
}

function getSet(set) {
  return set.trim().split(",");
}

function getColourFromSet(set, colour) {
  let result = 0;
  set.forEach((row) => {
    if (row.indexOf(colour) > 0) {
      result = Number(row.replace(colour, "").trim());
    }
  });
  return result;
}

function getAllSets(line) {
  let sets = [];
  let setStart = line.indexOf(":");
  sets = line.substring(setStart + 1, line.length - setStart).split(";");

  return sets;
}
