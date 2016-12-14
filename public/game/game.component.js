'use strict';

angular
  .module('game')
  .component('game', {
    templateUrl: 'game/game.template.html',
    controller: ['Game', 'Claim', 'Challenge', '$location',
      function gameController(Game, Claim, Challenge, $location) {
        this.gameId = localStorage.getItem('gameId');
        // default current turn to first player
        this.currentPlayer = 0;
        this.currentHand = [];
        this.moveNum = 0;

        this.updateGame = () => {
          Game.get({ id: this.gameId }, (data) => {
            console.log(data);
            this.game = data;
            this.currentHand = [];
            // if game is in progress
            if (data.actions.length > 0) {
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

            // set claimNum and claimFace to selected for ease of play
            this.claimNum = this.moveNum;
            this.claimFace = this.moveFace;
          }
        };

        // make a claim
        this.postClaim = () => {
          Claim.save({
            id: this.gameId,
            claimNumber: this.claimNum,
            claimFace: this.claimFace,
            player: this.currentPlayer,
            moveNumber: this.moveNum,
            moveFace: this.moveNum ? this.moveFace : null
          }, (res) => {
            this.prevClaim = {
              num: this.claimNum,
              face: this.claimFace
            };
            this.claimNum = null;
            this.claimFace = null;
            this.updateGame();
          });
        };

        // make a challenge
        this.postChallenge = () => {
          console.log(this.currentPlayer)
          Challenge.save({
            id: this.gameId,
            player: this.currentPlayer,
            challengeNumber: this.prevClaim.num,
            challengeFace: this.prevClaim.face
          }, (res) => {
            console.log(res)
            this.updateGame();
          });
        };

        // get game info on component mount
        this.updateGame();
      }
    ]
  });
