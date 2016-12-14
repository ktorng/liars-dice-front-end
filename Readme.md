## Liars Dice Web App
#### A simple imperfect node backend + Angular skeleton for UI engineer interviews

### Submission
This front end project was completed using angular-route, angular-material, and angular-resource. I separated the app into several components:

* Toolbar - a topbar with the site title and a button to read game instructions
* Menu - allows the user to select number of players and number of dice, and start game after input validation
* Game
  * Sidebar - a sidebar that shows number of dice hidden for all players, and an action log
  * Content - shows the current dice on the board, previous claim, and the current player's hand and available actions

The game ends upon challenge, and reveals the hidden dice for all players.

To get started, simply run:
```
npm start
```
and the npm and bower packages will be installed and the server will start.

###Liar's Dice

In the game Liar's Dice, each player begins the game with 5 dice, hidden from the other players.  Every player rolls the dice and hides the result. The first player puts X(ex. 0 to 5) number of dice in the middle and declares how many dice of a certain number exist amongst all the dice in play. For example, if he puts out 3 4s and says "There are at least 10 4s", then he believes there are 10 4's across everyone's hand including the 3 dice in the middle.

After a player places dice on the board and makes a bid(note: the player doesn't have to place any dice on the board, they can just make a bid), he/she must reroll the remaining dice in their hand.

The next player must either challenge the previous player's claim, or make a new claim that is at least one die higher (it can be an different number is the player chooses). For example, "There are at least 11 4s" or "There are at least 11 3s".

###The Exercise

Write a JavaScript front end application for playing a game of Liar's Dice!

The game should allow the user to:

* Start a new game, specifying the number of players and number of dice per player.
* See the current state of the game (including player's turn, number of dice, etc.)
* Move dice to the middle, claim a number of dice in hand, or challenge the last player's claim
* See all moves taken by players in the game

## Setting up the app

1. Clone the repository locally
2. Make sure you have Node installed (https://nodejs.org/download/)
3. Run npm install
4. node index.js

The server will run on localhost:8080

## Front end skeleton

A bare-bones HTML page that loads a bare-bones Angular app and displays a stubbed game is included in the /public folder of the repository. Please place your developed application in this repository.

## Verifying backend API

There is a Postman collection included test/LiarsDice.json.postman_collection. This file can be loaded into the Chrome app, Postman and demonstrates usage of all the endpoints.

## Endpoints

Start a new game

```
POST /games
  numPlayers: Integer
  numDice: Integer
```

Get a single game

```
GET /games/:id
```

List Games

```
GET /games
```

On a users turn, they can either make a claim and move dice to the middle, or challenge the previous player.

Make a claim

```
POST /games/:id/claim
  player: Integer
  moveNumber: Integer
  moveFace: Integer
  claimNumber: Integer
  claimFace: Integer
```

Challenge the last move

```
POST /games/:id/challenge
  player: Integer
```

##Submission

The final submission or any questions related to the excercise should be sent to recruiting@bypassmobile.com

Thanks!
