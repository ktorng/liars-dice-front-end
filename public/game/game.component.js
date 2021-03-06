'use strict';

angular
  .module('game')
  .component('game', {
    templateUrl: 'game/game.template.html',
    controller: ['Game', 'Claim', 'Challenge', '$location', '$mdToast', '$mdSidenav',
      function gameController(Game, Claim, Challenge, $location, $mdToast, $mdSidenav) {
        this.gameId = localStorage.getItem('gameId');
        // default current turn to first player
        this.currentPlayer = 0;
        this.currentHand = [];
        this.moveNum = 0;
        this.endGame = false;
        this.boardCounts = new Array(6).fill(0);

        this.updateGame = () => {
          Game.get({ id: this.gameId }, (data) => {
            this.game = data;
            this.currentHand = [];
            // if game has started
            if (data.actions.length > 0) {
              // if game has ended
              if (data.actions[0].actionType === "end") this.endGame = true;
              // update current player based on length of actions taken
              this.currentPlayer = data.actions.length % data.numPlayers;
              // update prev claim
              const prevClaim = data.actions.find(action => action.actionType === "claim");
              this.prevClaim = { face: prevClaim.claimFace, num: prevClaim.claimNumber };
            }

            // get hand of current player
            data.playerHands[this.currentPlayer].forEach(dice => {
              this.currentHand.push({ face: dice, selected: false });
            });
          });
        }

        // redirect to menu
        this.leaveGame = () => {
          $location.path('/menu');
        };

        // toggles selected dice for move to board
        this.toggleSelect = (i) => {
          const prevFace = this.moveFace;
          this.moveFace = this.currentHand[i].face;

          // if this dice is already selected, unselect it and decrement moveNum
          if (this.currentHand[i].selected === true) {
            this.currentHand[i].selected = false;
            this.moveNum--;
          // else selecting a new dice
          } else {
            // if this face is different from previously selected, unselect all previous
            if (prevFace && prevFace !== this.currentHand[i].face) {
              this.currentHand.forEach(dice => { dice.selected = false });
              this.moveNum = 0;
            }
            // set this dice selected to true and increment moveNum
            this.currentHand[i].selected = true;
            this.moveNum++;

            // set claimNum and claimFace to boardCounts for ease of play
            this.claimNum = this.moveNum + this.boardCounts[this.moveFace - 1];
            this.claimFace = this.moveFace;
          }
        };

        // make a claim
        this.postClaim = () => {
          // if invalid claim
          if (this.prevClaim && (this.claimNum < this.prevClaim.num ||
            (this.claimNum === this.prevClaim.num && this.claimFace <= this.prevClaim.face))) {
            $mdToast.show(
              $mdToast.simple()
                .textContent(`Please enter a higher claim - see instructions for claim rules`)
                .position('bottom center')
            );
          } else {
            Claim.save({
              id: this.gameId,
              claimNumber: this.claimNum,
              claimFace: this.claimFace,
              player: this.currentPlayer,
              moveNumber: this.moveNum,
              moveFace: this.moveNum ? this.moveFace : null
            }, (res) => {
              // update prev claim
              this.prevClaim = {
                num: this.claimNum,
                face: this.claimFace
              };
              // update board counts
              this.boardCounts[this.moveFace-1] += this.moveNum;
              // reset moves and claims
              this.moveNum = null;
              this.moveFace = null;
              this.claimNum = null;
              this.claimFace = null;
              this.updateGame();
            });
          }
        };

        // make a challenge
        this.postChallenge = () => {
          Challenge.save({
            id: this.gameId,
            player: this.currentPlayer,
            challengeNumber: this.prevClaim.num,
            challengeFace: this.prevClaim.face
          }, (res) => {
            $mdToast.show(
              $mdToast.simple()
                .textContent(`Challenge! The claim that there are ${this.prevClaim.num} ${this.prevClaim.face}'s is ${res.result}!`)
                .position('bottom center')
                .hideDelay(10000)
            );
            this.updateGame();
            // end the game and reveal hidden hands
            this.endGame = true;
          });
        };

        // toggle left sidenav
        this.toggleLeft = () => {
          $mdSidenav('left').toggle();
        };

        // get game info on component mount
        this.updateGame();
      }
    ]
  });
