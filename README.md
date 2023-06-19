# SCOREBOARD
Scoreboard Library
# DESCRIPTION
This library is the result of a technical test for a job interview.

# INSTALLATION
To install this library, use the following code:
```shell
`npm install scoreboardlibrary`
```

# HOW TO USE
First, add the following code to your project:
```javascript
`const { Scoreboard } = require('scoreboardlibrary');`
```

Create an instance of the Scoreboard class:
```javascript
`const scoreboard = new ScoreBoard();`
```

To start a new game, update the score, and finish the game, use the following methods:
```javascript
`scoreboard.startGame('Home Team', 'Away Team');
scoreboard.updateScore('Home Team', 'Away Team', 2, 1);
scoreboard.finishGame('Home Team', 'Away Team');`
```
Replace 'Home Team' and 'Away Team' with the appropriate team names, and use the actual scores in the updateScore method.

If you want to add results from previous finished games, use the following method:
```javascript
`scoreboard.addFinishedGame(data)`
```

The data parameter should be an array in the following format:
```javascript
`const data = [
  "Mexico - Canada: 0 - 5",
  "Spain - Brazil: 10 - 2"
];`
```
You can add as many games as you want, but make sure to follow this format.


To retrieve a summary of all live and finished games, use the following method:
```javascript
`scoreboard.getSummary();`
```
The summary will be returned in the following format:
```javascript
`"Mexico 0 - Canada 5"`
```

Note that the library automatically updates the information stored in local storage whenever the data is modified.

