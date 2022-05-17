import * as lib from './computerStrategy.js';

let rollCount = 0;
let rounds = 0;
let holdButtons = document.getElementsByClassName('holdButtons');
let diceHoldOn = true;
let categorySelectionOn = false;
let dice = [
  {currentValue: 0, hold: false},
  {currentValue: 0, hold: false},
  {currentValue: 0, hold: false},
  {currentValue: 0, hold: false},
  {currentValue: 0, hold: false}
]
let computerScores = [0,0,0,0,0,0,0,0,0,0,0,0,0,0];

function toggleHold(diceNum, diceID) {
  if (diceHoldOn) {
    if (dice[diceNum].currentValue != 0 && dice[diceNum].hold == false) {
      dice[diceNum].hold = true;
      $('#' + diceID).css("background-color", "#BFBFBF");
    } else if (dice[diceNum].hold == true) {
      dice[diceNum].hold = false;
      $('#' + diceID).css("background-color", "#FFFFFF");
    }
  }
}

function roll() {
  if (rollCount < 3) {
    rollCount++;
    for (let i = 0; i < dice.length; i++) {
      if (dice[i].hold == false) {
        dice[i].currentValue = Math.floor(Math.random() * dice.length) + 1;
      }
    }
    $('#dice0').html(dice[0].currentValue);
    $('#dice1').html(dice[1].currentValue);
    $('#dice2').html(dice[2].currentValue);
    $('#dice3').html(dice[3].currentValue);
    $('#dice4').html(dice[4].currentValue);
    $('#rollNum').html("Roll number = " + rollCount);
    console.log(dice);
    if (rollCount == 3) {
      for (let i = 0; i < dice.length; i++) {
        dice[i].hold = false;
        $('#' + holdButtons[i].id).css("background-color", "#FFFFFF");
      }
      diceHoldOn = false;
      document.getElementById('rollButton').setAttribute('disabled', '');
      categorySelectionOn = true;
      $('#rollNum').html("Select a Category!");
    }
  }
}

function computerTurn() {
  alert("Computers turn now!");
  for (let i = 0; i < dice.length; i++) {
    dice[i].currentValue = 0;
    dice[i].hold = false;
  }
  rollCount = 0;
  $('#dice0').html(dice[0].currentValue);
  $('#dice1').html(dice[1].currentValue);
  $('#dice2').html(dice[2].currentValue);
  $('#dice3').html(dice[3].currentValue);
  $('#dice4').html(dice[4].currentValue);
  computerRoll();
}

function computerRoll() {
   setTimeout(function() {
    if (rollCount < 3) {
      for (let i = 0; i < dice.length; i++) {
        if (dice[i].hold == false) {
          dice[i].currentValue = Math.floor(Math.random() * dice.length) + 1;
        }
      }
      for (let i = 0; i < dice.length; i++) {
        dice[i].hold = false;
        $('#dice' + i).css("background-color", "#FFFFFF");
      }
      rollCount++;
      $('#dice0').html(dice[0].currentValue);
      $('#dice1').html(dice[1].currentValue);
      $('#dice2').html(dice[2].currentValue);
      $('#dice3').html(dice[3].currentValue);
      $('#dice4').html(dice[4].currentValue);
      $('#rollNum').html("Computer roll number = " + rollCount);
    }
    if (rollCount < 3) {
      lib.computerHolding();
    } else {
      lib.categorySelector();
    }
  }, 3000);
  /* if (rollCount < 3) {
    rollCount++;
    rollCount++;
    dice[0].currentValue = 1;
    dice[1].currentValue = 1;
    dice[2].currentValue = 2;
    dice[3].currentValue = 3;
    dice[4].currentValue = 4;
    $('#dice0').html(dice[0].currentValue);
    $('#dice1').html(dice[1].currentValue);
    $('#dice2').html(dice[2].currentValue);
    $('#dice3').html(dice[3].currentValue);
    $('#dice4').html(dice[4].currentValue);
    computerHolding();
  } */
}

function toggleComputerHold(diceValue) {
  for (let i = 0; i < dice.length; i++) {
    if (dice[i].currentValue == diceValue && dice[i].hold == false) {
      dice[i].hold = true;
      console.log("holding: " + diceValue);
      $('#dice' + i).css("background-color", "#EA3C53");
    }
  }
}

function diceScore() {
  let diceScore = 0;
  for (let i = 0; i < dice.length; i++) {
    diceScore += dice[i].currentValue;
  }
  return diceScore;
}

function isFullHouse() {
  let diceValues = [];
  for (let i = 0; i < dice.length; i++) {
    diceValues.push(dice[i].currentValue);
  }
  diceValues.sort((a, b) => a - b);
  if (diceValues[0] == diceValues[1] && diceValues[2] == diceValues[3] && diceValues[2] == diceValues[4]) {
    return true;
  } else if (diceValues[0] == diceValues[1] && diceValues[1] == diceValues[2] && diceValues[3] == diceValues[4]) {
    return true;
  } else {
    return false;
  }
}

function isSmallStraight() {
  let diceValues = [];
  let isSmallStraight = false;
  let everySmallStraight = [
    [1,1,2,3,4],
    [1,2,2,3,4],
    [1,2,3,3,4],
    [1,2,3,4,4],
    [1,2,3,4,5],
    [1,2,3,4,6],
    [2,2,3,4,5],
    [2,3,3,4,5],
    [2,3,4,4,5],
    [2,3,4,5,5],
    [1,3,4,5,6],
    [2,3,4,5,6],
    [3,3,4,5,6],
    [3,4,4,5,6],
    [3,4,5,5,6],
    [3,4,5,6,6]
    ];
  for (let i = 0; i < dice.length; i++) {
    diceValues.push(dice[i].currentValue);
  }
  diceValues.sort((a, b) => a - b);
  for (let i = 0; i < everySmallStraight.length; i++) {
    if (JSON.stringify(diceValues) == JSON.stringify(everySmallStraight[i])) {
      isSmallStraight = true;
    }
  }
  return isSmallStraight;
}

function isYahtzee() {
  let ones = [];
  let twos = [];
  let threes = [];
  let fours = [];
  let fives = [];
  let sixes = [];
  for (let i = 0; i < dice.length; i++) {
    switch (dice[i].currentValue) {
      case 1:
        ones.push(dice[i].currentValue);
        break;
      case 2:
        twos.push(dice[i].currentValue);
        break;
      case 3:
        threes.push(dice[i].currentValue);
        break;
      case 4:
        fours.push(dice[i].currentValue);
        break;
      case 5:
        fives.push(dice[i].currentValue);
        break;
      case 6:
        sixes.push(dice[i].currentValue);
        break;
    }
  }
  let nums = [ones,twos,threes,fours,fives,sixes];
  for (let i = 0; i < nums.length; i++) {
    if (nums[i].length == 5) {
      return true;
      console.log("computer yahtzee!");
    }
  }
  return false;
}

function is4K() {
  let ones = [];
  let twos = [];
  let threes = [];
  let fours = [];
  let fives = [];
  let sixes = [];
  for (let i = 0; i < dice.length; i++) {
    switch (dice[i].currentValue) {
      case 1:
        ones.push(dice[i].currentValue);
        break;
      case 2:
        twos.push(dice[i].currentValue);
        break;
      case 3:
        threes.push(dice[i].currentValue);
        break;
      case 4:
        fours.push(dice[i].currentValue);
        break;
      case 5:
        fives.push(dice[i].currentValue);
        break;
      case 6:
        sixes.push(dice[i].currentValue);
        break;
    }
  }
  let nums = [ones,twos,threes,fours,fives,sixes];
  for (let i = 0; i < nums.length; i++) {
    if (nums[i].length >= 4) {
      return true;
    }
  }
  return false;
}

function is3K() {
  let ones = [];
  let twos = [];
  let threes = [];
  let fours = [];
  let fives = [];
  let sixes = [];
  for (let i = 0; i < dice.length; i++) {
    switch (dice[i].currentValue) {
      case 1:
        ones.push(dice[i].currentValue);
        break;
      case 2:
        twos.push(dice[i].currentValue);
        break;
      case 3:
        threes.push(dice[i].currentValue);
        break;
      case 4:
        fours.push(dice[i].currentValue);
        break;
      case 5:
        fives.push(dice[i].currentValue);
        break;
      case 6:
        sixes.push(dice[i].currentValue);
        break;
    }
  }
  let nums = [ones,twos,threes,fours,fives,sixes];
  for (let i = 0; i < nums.length; i++) {
    if (nums[i].length >= 3) {
      return true;
      console.log("computer 3k!!");
    }
  }
  return false;
}

function scratcher() {
  if (computerScores[1] == 0 && twos.length >= 1) {
    computerScores[1] = twos.length;
    $('#C2').html(computerScores[1]);
  } else if (computerScores[13] == 0) {
    computerScores[13] = diceScore();
    $('#CC').html(computerScores[13]);
  } else if (computerScores[11] == 0) {
    computerScores[13] = "s";
    $('#CY').html(computerScores[13]);
  } else if (computerScores[9] == 0) {
    computerScores[9] = "s";
    $('#CLS').html(computerScores[9]);
  } else if (computerScores[7] == 0) {
    computerScores[7] = "s";
    $('#C4K').html(computerScores[7]);
  } else if (computerScores[8] == 0) {
    computerScores[8] = "s";
    $('#CSS').html(computerScores[8]);
  } else if (computerScores[6] == 0) {
    computerScores[6] = "s";
    $('#C3K').html(computerScores[6]);
  } else if (computerScores[10] == 0) {
    computerScores[10] = "s";
    $('#CFH').html(computerScores[10]);
  } else if (computerScores[2] == 0) {
    computerScores[2] = "s";
    $('#C3').html(computerScores[2]);
  } else if (computerScores[3] == 0) {
    computerScores[3] = "s";
    $('#C4').html(computerScores[3]);
  } else if (computerScores[4] == 0) {
    computerScores[4] = "s";
    $('#C5').html(computerScores[4]);
  } else if (computerScores[5] == 0) {
    computerScores[5] = "s";
    $('#C6').html(computerScores[5]);
  }
  console.log("scratched something!");
}

function playerTurn() {
  setTimeout(function() {
    for (let i = 0; i < dice.length; i++) {
      dice[i].currentValue = 0;
      dice[i].hold = false;
    }
    rollCount = 0;
    rounds++;
    diceHoldOn = true;
    document.getElementById('rollButton').removeAttribute('disabled', '');
    $('#dice0').html(dice[0].currentValue);
    $('#dice1').html(dice[1].currentValue);
    $('#dice2').html(dice[2].currentValue);
    $('#dice3').html(dice[3].currentValue);
    $('#dice4').html(dice[4].currentValue);
    $('#rollNum').html("Roll number = " + rollCount);
 }, 6000);
}
