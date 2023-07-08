let readline = require('readline-sync');

const WINNING_MOVES = {
  rock: ['lizard', 'scissors'],
  paper: ['rock', 'Spock'],
  scissors: ['paper', 'lizard'],
  Spock: ['scissors', 'rock'],
  lizard: ['Spock', 'paper']
};

function createPlayer() {
  return {
    move: null,
    score: 0,
    history: [],

    historyToString() {
      return this.history.join(', ');
    }
  };
}

// eslint-disable-next-line max-lines-per-function
function createHuman() {
  let playerObject = createPlayer();

  let humanObject = {
    choose() {
      let choice;

      while (true) {
        console.log('____________________________________________________\n');
        console.log('Please choose: rock, paper, scissors, Spock, lizard');
        choice = this.convertShorthand(readline.question());
        if (['rock', 'paper', 'scissors', 'Spock', 'lizard'].includes(choice)) break;
        console.log(`Sorry, invalid choice. \nTry the CASE SENSATIVE initial:
          "r" for "rock
          "S" for "Spock
          "l" for "lizard"...`);
      }

      this.move = choice;
      this.history.push(this.move);
    },

    convertShorthand(choice) {
      switch (choice) {
        case 'r':
          return 'rock';
        case 'p':
          return 'paper';
        case 's':
          return 'scissors';
        case 'S':
        case 'spock':
          return 'Spock';
        case 'l':
          return 'lizard';
      }
      return choice;
    },
  };

  return Object.assign(playerObject, humanObject);
}

// eslint-disable-next-line max-lines-per-function
function createComputer() {
  let playerObject = createPlayer();

  let computerObject = {
    AI: {
      altChoices: [],

      compMovesLog: {
        rock: 0,
        paper: 0,
        scissors: 0,
        Spock: 0,
        lizard: 0,
      },

      advantageNum: null,

      msgNums: {
        1: '"I think I see a pattern..."',
        2: '"I think I have you!"'
      },

      say() {
        console.log(`\n...${this.msgNums[this.advantageNum]}\n`);
      },

      remember(winner, computerMove) {
        if (winner === 'computer') {
          ++this.compMovesLog[computerMove];
        } else if (winner === 'human') {
          --this.compMovesLog[computerMove];
        }
      },

      advantage1(aMoveAgo, altChoices) {
        this.advantageNum = 1;
        for (let atk in WINNING_MOVES) {
          if (!WINNING_MOVES[aMoveAgo].includes(atk) && atk !== aMoveAgo) {
            altChoices.push(atk);
          }
        }
        return altChoices;
      },

      advantage2(altChoices) {
        this.advantageNum = 2;
        for (let atk in this.compMovesLog) {
          if (this.compMovesLog[atk] > -2) altChoices.push(atk);
          if (this.compMovesLog[atk] > -1) altChoices.push(atk);
          if (this.compMovesLog[atk] > 0) altChoices.push(atk, atk);
        }
        return altChoices;
      },

      createAdvantage(hHistory, cHistory) {
        let aMoveAgo = hHistory[hHistory.length - 2];
        let twoMovesAgo = hHistory[hHistory.length - 3];
        let altChoices = [];

        if (aMoveAgo === twoMovesAgo && aMoveAgo !== undefined) {
          return this.advantage1(aMoveAgo, altChoices);

        } else if (cHistory.length > 2) {
          return this.advantage2(altChoices);

        } else {
          this.advantageNum = null;
          return false;
        }
      },
    },

    choose(hHistory, cHistory) {
      let altChoices = this.AI.createAdvantage(hHistory, cHistory);
      let choices = altChoices.length ? altChoices : Object.keys(WINNING_MOVES);

      let randomIndex = Math.floor(Math.random() * choices.length);
      this.move = choices[randomIndex];
      this.history.push(this.move);
    },
  };

  return Object.assign(playerObject, computerObject);
}

const RPSGame = {
  human: createHuman(),
  computer: createComputer(),
  onlyOneRound: true,
  maxScore: 5,
  winner: null,
  humanWon: 'You Win!',
  computerWon: 'Computer Wins',
  tie: "It's a Tie",

  displayWelcome() {
    console.clear();
    console.log('                  WELCOME TO\n');
    this.displayHeader();
  },

  displayHeader() {
    console.log('|    >>  rock-paper-scissors-Spock-lizard!  <<     |');
    console.log('|__________________________________________________|\n');
  },

  displayWinner() {
    console.log(`You chose: ${this.human.move}`);
    console.log(`The computer chose: ${this.computer.move}`);
    console.log('\n' + this.winner + '\n_______________________');
    console.log(`Player: ${this.human.score} vs Computer ${this.computer.score}\n`);
  },

  displayHistory() {
    console.log(
      `  Your Moves:\n  => [${this.human.historyToString()}]\n\n  Computers Moves:\n  => [${this.computer.history}]`
    );
  },

  displayEnd(fullGame) {
    let regularGoodbye = '\nThanks for playing rock-paper-scissors-Spock-lizard.\nGoodbye!\n';
    let playTo5Goodbye = '\nThanks for playing to 5!. Goodbye!\n';

    this.displayHistory();
    console.log(fullGame ? playTo5Goodbye : regularGoodbye);
  },

  continueTo5() {
    let answer;
    console.log('Would you like to first to 5? (y/n)');

    while (true) {
      answer = readline.question().toLowerCase();
      if (['y','yes','yup','yeah'].includes(answer) ||
          ['n','no','nah','nope'].includes(answer)) break;
      console.log('Please choose either "y" or "n"');
  }

  return ['y','yes','yup','yeah'].includes(answer);
  },

  calculateWinner() {
    if (WINNING_MOVES[this.human.move].includes(this.computer.move)) {
      this.winner = this.humanWon;

    } else if (WINNING_MOVES[this.computer.move].includes(this.human.move)) {
      this.winner = this.computerWon;

    } else {
      this.winner = this.tie;
    }
  },

  tally() {
    if (this.winner === this.humanWon) {
      this.human.score += 1;
    } else if (this.winner === this.computerWon) {
      this.computer.score += 1;
    }
  },

  foundaWinner() {
    return this.human.score >= this.maxScore || this.computer.score >= this.maxScore;
  },

  play() {
    this.displayWelcome();
    while (true) {
      this.human.choose();
      this.computer.choose(this.human.history, this.computer.history);
      this.calculateWinner();
      this.tally();
      this.computer.AI.remember(this.winner, this.computer.move);
      console.clear();
      this.displayHeader();
      if (this.computer.AI.advantageNum) this.computer.AI.say();
      this.displayWinner();
      if (this.foundaWinner()) break;
      if (this.human.history.length === 1) {
        if (!this.continueTo5()) break;
      }
    }
    this.displayEnd(this.foundaWinner());
  },
};

RPSGame.play();