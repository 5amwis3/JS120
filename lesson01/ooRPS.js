let readline = require('readline-sync');

let WINNING_MOVES = {
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
  };
};

function createHuman() {
  let playerObject = createPlayer();

  let humanObject = {
    choose() {
      let choice;

      while (true) {
        console.log('____________________________________________________\n');
        console.log('Please choose: rock, paper, scissors, Spock, lizard');
        choice = readline.question();
        switch (choice) {
          case 'r':
            choice = 'rock';
            break;
          case 'p':
            choice = 'paper';
            break;
          case 's':
            choice = 'scissors'
            break;
          case 'S':
            choice = 'Spock';
            break;
          case 'l':
            choice = 'lizard';
            break;
        }
        if (['rock', 'paper', 'scissors', 'Spock', 'lizard'].includes(choice)) break;
        console.log('Sorry, invalid choice. \n(Try the case sensative initial, "r" for "rock...)');
      }
      
      this.move = choice;
      this.history.push(this.move);
    },
  };

  return Object.assign(playerObject, humanObject);
}

function createComputer() {
  let playerObject = createPlayer();

  let computerObject = {
    choose() {
      let advantage = RPSGame.AI.createAdvantage();
      if (advantage) {
        this.move = advantage;
        this.history.push(this.move);
      } else {
        const choices = ['rock', 'paper', 'scissors', 'Spock', 'lizard'];
        let randomIndex = Math.floor(Math.random() * choices.length);
        this.move = choices[randomIndex];
        this.history.push(this.move);
      }
    },
  };
  return Object.assign(playerObject, computerObject);
}

const RPSGame = {
  human: createHuman(),
  computer: createComputer(),
  winner: null,

  AI: {
    compMovesLog: {
      rock: 0,
      paper: 0,
      scissors: 0,
      Spock: 0,
      lizard: 0,
    },

    usedAdvantage: false,

    msg: {
      1: '"I think I see a pattern..."',
      2: '"I think I have you!"'
    },

    say(msg) {
      console.log(`\n...${msg}\n`)
    },

    remember() {
      if (RPSGame.winner === 'Computer wins!') {
        ++this.compMovesLog[RPSGame.computer.move];
      } else if (RPSGame.winner === "It's a tie") {
        //no points alloted
      } else {
        --this.compMovesLog[RPSGame.computer.move];
      }
    },

    createAdvantage() {
      let oneMoveAgo = RPSGame.human.history[RPSGame.human.history.length - 2];
      let twoMovesAgo = RPSGame.human.history[RPSGame.human.history.length - 3];
      let altChoices = [];
  
      if (oneMoveAgo === twoMovesAgo && oneMoveAgo !== undefined) {
        this.usedAdvantage = 1;

        for (let atk in WINNING_MOVES) {
          if (!WINNING_MOVES[oneMoveAgo].includes(atk) && atk !== oneMoveAgo) {
            altChoices.push(atk);
          }
        }
        let randomIDX = Math.floor(Math.random() * altChoices.length);
        return altChoices[randomIDX];

      } else if (RPSGame.computer.history.length > 2) {
        this.usedAdvantage = 2;

        for (let atk in this.compMovesLog) {
          if (this.compMovesLog[atk] > -2) altChoices.push(atk)
          if (this.compMovesLog[atk] > -1) altChoices.push(atk)
          if (this.compMovesLog[atk] > 0) altChoices.push(atk, atk)
        }
        let randomIDX = Math.floor(Math.random() * altChoices.length);
        return altChoices[randomIDX];
      }
      this.usedAdvantage = false;
      return false;
    },
  },
   
  displayWelcome() {
    console.log('                  WELCOME TO\n');
  },

  displayHeader() {
    console.log('|    >>  rock-paper-scissors-Spock-lizard!  <<     |');
    console.log('|__________________________________________________|\n');
  },
  
  displayWinner() {
    console.log(`You chose: ${this.human.move}`);
    console.log(`The computer chose: ${this.computer.move}`);
    console.log('\n' + this.winner + '\n_______________________')
    console.log(`Player: ${this.human.score} vs Computer ${this.computer.score}\n`);
  },
  
  displayHistory() {
    console.log(
      `  Your Moves:\n  => [${this.human.history}]\n\n  Computers Moves:\n  => [${this.computer.history}]`
      );
    },

  displayGoodbyeMessage(fullGame) {
    let regularGoodbye = '\nThanks for playing rock-paper-scissors-Spock-lizard.\nGoodbye!\n';
    let bestOf5Goodbye = '\nThanks for playing best of 5. Goodbye!\n'
    fullGame ? console.log(bestOf5Goodbye) : console.log(regularGoodbye);
  },

  playAgain() {
    console.log('\nWould you like to play again?');
    let answer = readline.question();
    return answer.toLowerCase()[0] === 'y';
  },

  calculateWinner() {
    if (WINNING_MOVES[this.human.move].includes(this.computer.move)) {
      this.winner = 'You win!';

    } else if (WINNING_MOVES[this.computer.move].includes(this.human.move)) {
      this.winner = 'Computer wins!';

    } else {
      this.winner = "It's a tie";
    }
  },

  tally() {
    if (this.winner === 'You win!') {
      this.human.score += 1;
    } else if (this.winner === 'Computer wins!') {
      this.computer.score += 1;
    }
  },

  foundaWinner() {
    return [this.human.score, this.computer.score].includes(5);
  },

  play() {
    console.clear();
    this.displayWelcome();
    this.displayHeader()
    while (true) {
      this.human.choose();
      this.computer.choose();
      this.calculateWinner();
      this.tally();
      console.clear();
      this.displayHeader();
      if (this.AI.usedAdvantage) this.AI.say(this.AI.msg[this.AI.usedAdvantage]);
      this.displayWinner();
      this.displayHistory();
      this.AI.remember();
      if (this.foundaWinner()) break;
      if (!this.playAgain()) break;
    }
    this.displayGoodbyeMessage(this.foundaWinner());
  },
};

RPSGame.play();