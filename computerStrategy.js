function computerHolding() {
    let ones = [];
    let twos = [];
    let threes = [];
    let fours = [];
    let fives = [];
    let sixes = [];
    let nums = [ones,twos,threes,fours,fives,sixes];
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
  
    let diceValues = [];
    for (let i = 0; i < dice.length; i++) {
      diceValues.push(dice[i].currentValue);
    }
    diceValues.sort((a, b) => a - b);
    //console.log("hello " + diceValues);
  
    if (computerScores[11] == 0) {
      for (let i = 0; i < nums.length; i++) {
        if (nums[i].length >= 4) {
          toggleComputerHold(i+1);
        }
      }
    }
  
    if (isFullHouse()) {
      for (let i = 0; i < nums.length; i++) {
        if (rollCount == 1) {
          if (nums[i].length == 3 && i != 0) {
            toggleComputerHold(i+1);
            return computerRoll();
          } else if (nums[i].length == 3 && i == 0 && computerScores[10] == 0) {
            toggleComputerHold(1);
            toggleComputerHold(2);
            toggleComputerHold(3);
            toggleComputerHold(4);
            toggleComputerHold(5);
            toggleComputerHold(6);
            return computerRoll();
          }
        } else {
          if (nums[i].length == 3 && (i != 0 && i != 1 && i != 2)) {
            toggleComputerHold(i+1);
            return computerRoll();
          } else if (nums[i].length == 3 && (i == 0 || i == 1 || i == 2) && computerScores[10] == 0) {
            toggleComputerHold(1);
            toggleComputerHold(2);
            toggleComputerHold(3);
            toggleComputerHold(4);
            toggleComputerHold(5);
            toggleComputerHold(6);
            return computerRoll();
          }
        }
      }
    }
  
    if (computerScores[8] == 0 || computerScores[9] == 0) {
      if (JSON.stringify(diceValues) == JSON.stringify([1,2,3,4,5]) || JSON.stringify(diceValues) == JSON.stringify([2,3,4,5,6])) {
        toggleComputerHold(1);
        toggleComputerHold(2);
        toggleComputerHold(3);
        toggleComputerHold(4);
        toggleComputerHold(5);
        toggleComputerHold(6);
        return computerRoll();
      }
    }
  
    if (isSmallStraight()) {
      if (JSON.stringify(diceValues) == JSON.stringify([1,2,3,4,4]) && rollCount == 1) {
        if (computerScores[3] == 0 || computerScores[6] == 0 || computerScores[7] == 0) {
          toggleComputerHold(4);
          return computerRoll();
        } else if (computerScores[8] == 0) {
          toggleComputerHold(1);
          toggleComputerHold(2);
          toggleComputerHold(3);
          toggleComputerHold(4);
          return computerRoll();
        }
      } else if (rollCount == 1 && (JSON.stringify(diceValues) == JSON.stringify([3,3,4,5,6]) || JSON.stringify(diceValues) == JSON.stringify([3,4,4,5,6]) || JSON.stringify(diceValues) == JSON.stringify([3,4,5,5,6]) || JSON.stringify(diceValues) == JSON.stringify([3,4,5,6,6]))) {
          for (let i = 2; i < nums.length; i++) {
            if (nums[i].length == 2 && (computerScores[i+1] == 0 || computerScores[6] == 0)) {
              toggleComputerHold(i+1);
              return computerRoll();
            }
          }
      } else if (computerScores[8] == 0 || computerScores[9] == 0) {
          for (let i = 0; i < nums.length; i++) {
            toggleComputerHold(i+1);
          }
          for (let i = 0; i < nums.length; i++) {
            if (nums[i].length == 2) {
              for (let j = 0; j < dice.length; j++) {
                if (dice[j].currentValue == i + 1) {
                  dice[j].hold = false;
                  $('#dice' + j).css("background-color", "#FFFFFF");
                  return computerRoll();
                }
              }
            }
          }
        }
      } else if (isSmallStraight() == false) {
        let numOfSingles = 0;
        for (let i = 0; i < nums.length; i++) {
          if (nums[i].length == 1) {
            numOfSingles++;
          }
        }
        if (numOfSingles == 5) {
          toggleComputerHold(5);
          if (rollCount > 1 && JSON.stringify(diceValues) == JSON.stringify([1,2,4,5,6])) {
            toggleComputerHold(4);
            toggleComputerHold(6);
            return computerRoll();
          }
          return computerRoll();
        }
      }
  
      let pairs = [];
      for (let i = 0; i < nums.length; i++) {
        if (nums[i].length == 2) {
          pairs.push(i);
          if (pairs.length == 2 && computerScores[10] == 0 && rollCount > 1 && ((pairs[0] == 0 && pairs[1] == 1) || (pairs[0] == 0 && pairs[1] == 2))) {
            toggleComputerHold(pairs[0]+1);
            toggleComputerHold(pairs[1]+1);
            return computerRoll();
          } else if (pairs.length == 2) {
            toggleComputerHold(i+1);
            return computerRoll();
          }
        }
      }
  
      if (isFullHouse() == false && isSmallStraight() == false) {
        for (let i = 0; i < nums.length; i++) {
          if (nums[i].length == 3) {
            toggleComputerHold(i+1);
            return computerRoll();
          }
        }
        if (pairs.length == 1) {
          if (rollCount == 1 && pairs[0] > 0) {
            toggleComputerHold(pairs[0] + 1);
            return computerRoll();
          } else if ((computerScores[8] == 0 || computerScores[9] == 0) && JSON.stringify(diceValues) == JSON.stringify([1,1,3,4,5])) {
            toggleComputerHold(3);
            toggleComputerHold(4);
            toggleComputerHold(5);
            return computerRoll();
          } else if (rollCount == 1 && pairs[0] == 0 && nums[4].length == 1) {
            toggleComputerHold(5);
            return computerRoll();
          } else if (rollCount == 1 && pairs[0] == 0 && nums[3].length == 1) {
            toggleComputerHold(4);
            return computerRoll();
          } else if (rollCount == 1 && pairs[0] == 0 && nums[5].length == 1) {
            toggleComputerHold(6);
            return computerRoll();
          }
        }
      }
      return computerRoll();
  }

  function categorySelector() {
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
    let diceValues = [];
    for (let i = 0; i < dice.length; i++) {
      diceValues.push(dice[i].currentValue);
    }
    diceValues.sort((a, b) => a - b);
  
    if (isYahtzee()) {
      if (computerScores[11] == 0) {
        computerScores[11] == 50;
        $('#CY').html(computerScores[11]);
        return playerTurn();
      } else {
        computerScores[12] += 100;
        $('#CYB').html(computerScores[12]);
        return playerTurn();
      }
    } else if (computerScores[9] == 0 && (JSON.stringify(diceValues) == JSON.stringify([1,2,3,4,5]) || JSON.stringify(diceValues) == JSON.stringify([2,3,4,5,6]))) {
      computerScores[9] = 40;
      $('#CLS').html(computerScores[9]);
      return playerTurn();
    } else if (isSmallStraight() && computerScores[8] == 0) {
      computerScores[8] = 30;
      $('#CSS').html(computerScores[8]);
      console.log("small straight category");
      return playerTurn();
    } else if (is4K()) {
      for (let i = 0; i < nums.length; i++) {
        if (nums[i].length >= 4 && computerScores[i] != 0) {
          if (computerScores[7] == 0 && diceScore() >= 18) {
            computerScores[7] = diceScore();
            $('#C4K').html(computerScores[7]);
            return playerTurn();
          } else if (computerScores[10] == 0 && diceScore() < 25) {
            computerScores[10] = 25;
            $('#CFH').html(computerScores[10]);
            return playerTurn();
          } else if (computerScores[6] == 0 && diceScore() > 22) {
            computerScores[6] = diceScore();
            $('#C3K').html(computerScores[6]);
            return playerTurn();
          } else if (computerScores[13] == 0) {
            computerScores[13] = diceScore();
            $('#CC').html(computerScores[13]);
            return playerTurn();
          } else {
            scratcher();
            return playerTurn();
          }
        } else if (nums[i].length >= 4 && computerScores[i] == 0) {
          computerScores[i] = (i+1)*(nums[i].length);
          $('#C' + (i+1)).html(computerScores[i]);
          return playerTurn();
        }
      }
    } else if (is3K()) {
      for (let i = 0; i < nums.length; i++) {
        if (nums[i].length == 3) {
          if (isFullHouse() && computerScores[10] == 0 && (i == 0 || i == 1 || i == 2)) {
            computerScores[10] = 25;
            $('#CFH').html(computerScores[10]);
            return playerTurn();
          } else if (diceScore() >= 25 && computerScores[6] == 0) {
            computerScores[6] = diceScore();
            $('#C3K').html(computerScores[6]);
            return playerTurn();
          } else if (isFullHouse() && computerScores[10] == 0) {
            computerScores[10] = 25;
            $('#CFH').html(computerScores[10]);
            return playerTurn();
          } else if (computerScores[i] == 0) {
            computerScores[i] = (i+1)*(nums[i].length);
            $('#C' + (i+1)).html(computerScores[i]);
            return playerTurn();
          } else if (computerScores[13] == 0) {
            computerScores[13] = diceScore();
            $('#CC').html(computerScores[13]);
            return playerTurn();
          } else {
            scratcher();
            return playerTurn();
          }
        }
      }
    }
    for (let i = 0; i < nums.length; i++) {
      if (nums[i].length == 2) {
        if (i < 3) {
          if (diceScore() >= 22 && computerScores[13] == 0) {
            computerScores[13] = diceScore();
            $('#CC').html(computerScores[13]);
            return playerTurn();
          } else if (computerScores[i] == 0) {
            computerScores[i] = 2*(i+1);
            $('#C' + (i+1)).html(computerScores[i]);
            return playerTurn();
          } else if (computerScores[0] == 0) {
            computerScores[0] = ones.length;
            $('#C' + (i+1)).html(computerScores[i]);
            return playerTurn();
          } else {
            scratcher();
            return playerTurn();
          }
        } else {
          if ((diceScore() >= 17 || JSON.stringify(diceValues) == JSON.stringify([2,3,4,4,6])) && computerScores[13] == 0) {
            computerScores[13] = diceScore();
            $('#CC').html(computerScores[13]);
            return playerTurn();
          } else if (computerScores[0] == 0) {
            computerScores[0] = ones.length;
            $('#C' + (i+1)).html(computerScores[i]);
            return playerTurn();
          } else if (computerScores[1] == 0) {
            computerScores[1] = twos.length;
            $('#C2').html(computerScores[1]);
            return playerTurn();
          } else {
            scratcher();
            return playerTurn();
          }
        }
      }
    }
    if (computerScores[0] == 0) {
      computerScores[0] = ones.length;
      $('#C1').html(computerScores[0]);
      return playerTurn();
    } else if (computerScores[1] == 0) {
      computerScores[1] = twos.length;
      $('#C2').html(computerScores[1]);
      return playerTurn();
    } else {
      scratcher()
      return playerTurn();
    }
    console.log("somethings not right");
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