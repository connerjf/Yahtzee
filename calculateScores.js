function calculateOnes() {
    if (categorySelectionOn) {
      categorySelectionOn = false;
      console.log("Yay");
      let oneScore = 0;
      for (let i = 0; i < dice.length; i++) {
        if (dice[i].currentValue == 1) {
          oneScore++;
        }
      }
      $('#Y1').html(oneScore);
      computerTurn();
    }
  }
  
  function calculateTwos() {
    if (categorySelectionOn) {
      categorySelectionOn = false;
      let twoScore = 0;
      for (let i = 0; i < dice.length; i++) {
        if (dice[i].currentValue == 2) {
          twoScore += 2;
        }
      }
      $('#Y2').html(twoScore);
      computerTurn();
    }
  }
  
  function calculateThrees() {
    if (categorySelectionOn) {
      categorySelectionOn = false;
      let threeScore = 0;
      for (let i = 0; i < dice.length; i++) {
        if (dice[i].currentValue == 3) {
          threeScore += 3;
        }
      }
      $('#Y3').html(threeScore);
      computerTurn();
    }
  }
  
  function calculateFours() {
    if (categorySelectionOn) {
      categorySelectionOn = false;
      let fourScore = 0;
      for (let i = 0; i < dice.length; i++) {
        if (dice[i].currentValue == 4) {
          fourScore += 4;
        }
      }
      $('#Y4').html(fourScore);
      computerTurn();
    }
  }
  
  function calculateFives() {
    if (categorySelectionOn) {
      categorySelectionOn = false;
      let fiveScore = 0;
      for (let i = 0; i < dice.length; i++) {
        if (dice[i].currentValue == 5) {
          fiveScore += 5;
        }
      }
      $('#Y5').html(fiveScore);
      computerTurn();
    }
  }
  
  function calculateSixes() {
    if (categorySelectionOn) {
      categorySelectionOn = false;
      let sixScore = 0;
      for (let i = 0; i < dice.length; i++) {
        if (dice[i].currentValue == 6) {
          sixScore++;
        }
      }
      $('#Y6').html(sixScore);
      computerTurn();
    }
  }
  
  function calculate3K() {
    if (categorySelectionOn) {
      categorySelectionOn = false;
      let threeKScore = 0;
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
  
      for (let i = 0; i < nums.length; i++) {
        if (nums[i].length >= 3) {
          for (let j = 0; j < dice.length; j++) {
            threeKScore += dice[j].currentValue;
          }
        }
      }
      $('#Y3K').html(threeKScore);
      computerTurn();
    }
  }
  
  function calculate4K() {
    if (categorySelectionOn) {
      categorySelectionOn = false;
      let fourKScore = 0;
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
  
      for (let i = 0; i < nums.length; i++) {
        if (nums[i].length >= 4) {
          for (let j = 0; j < dice.length; j++) {
            fourKScore += dice[j].currentValue;
          }
        }
      }
      $('#Y4K').html(fourKScore);
      computerTurn();
    }
  }
  
  function calculateSmallStraight() {
    if (categorySelectionOn) {
      categorySelectionOn = false;
      let smallStraightScore;
      if (isSmallStraight()) {
        smallStraightScore = 30;
      } else {
        smallStraightScore = 0;
      }
      $('#YSS').html(smallStraightScore);
      computerTurn();
    }
  }
  
  function calculateLargeStraight() {
    if (categorySelectionOn) {
      categorySelectionOn = false;
      let diceValues = [];
      let isLargeStraight = false;
      let largeStraightScore = 0;
      let everyLargeStraight = [
        [1,2,3,4,5],
        [2,3,4,5,6],
      ];
      for (let i = 0; i < dice.length; i++) {
        diceValues.push(dice[i].currentValue);
      }
      diceValues.sort((a, b) => a - b);
      console.log(diceValues);
      for (let i = 0; i < everyLargeStraight.length; i++) {
        if (JSON.stringify(diceValues) == JSON.stringify(everyLargeStraight[i])) {
          isLargeStraight = true;
        }
      }
      if (isLargeStraight) {
        largeStraightScore = 40;
      } else {
        largeStraightScore = 0;
      }
      $('#YLS').html(largeStraightScore);
      computerTurn();
    }
  }
  
  function calculateFullHouse() {
    if (categorySelectionOn) {
      categorySelectionOn = false;
      if (isFullHouse()) {
        $('#YFH').html('25');
      } else {
        $('#YFH').html('0');
      }
  
      computerTurn();
    }
  }
  
  function calculateYahtzee() {
    if (categorySelectionOn) {
      categorySelectionOn = false;
      let diceValues = [];
      for (let i = 0; i < dice.length; i++) {
        diceValues.push(dice[i].currentValue);
      }
      if (diceValues[0] == diceValues[1] && diceValues[0] == diceValues[2] && diceValues[0] == diceValues[3] && diceValues[0] == diceValues[4]) {
        $('#YY').html('50');
      }
      computerTurn();
    }
  }
  
  function calculateChance() {
    if (categorySelectionOn) {
      categorySelectionOn = false;
      $('#YC').html(diceScore());
      computerTurn();
    }
  }