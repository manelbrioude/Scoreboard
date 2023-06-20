const localStorage = require('mock-local-storage');
const ScoreBoard = require('./index');

global.window = {};
window.localStorage = global.localStorage;

describe('ScoreBoard', () => {
  let scoreboard;

  beforeEach(() => {
    scoreboard = new ScoreBoard();
    scoreboard.saveToLocalStorage = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('startGame should add a new game to liveGames', () => {
    scoreboard.startGame('Home Team', 'Away Team');
    expect(scoreboard.getLiveGames()).toHaveLength(1);
    expect(scoreboard.saveToLocalStorage).toHaveBeenCalledTimes(1);
  });

  test('finishGame should move a game from liveGames to finishedGames', () => {
    scoreboard.startGame('Home Team', 'Away Team');
    scoreboard.finishGame('Home Team', 'Away Team');
    expect(scoreboard.getLiveGames()).toHaveLength(0);
    expect(scoreboard.getFinishedGames()).toHaveLength(1);
    expect(scoreboard.saveToLocalStorage).toHaveBeenCalledTimes(2);
  });

  test('updateScore should update the score of a live game', () => {
    scoreboard.startGame('Home Team', 'Away Team');
    scoreboard.updateScore('Home Team', 'Away Team', 2, 1);
    const liveGame = scoreboard.getLiveGames()[0];
    expect(liveGame.homeScore).toBe(2);
    expect(liveGame.awayScore).toBe(1);
    expect(scoreboard.saveToLocalStorage).toHaveBeenCalledTimes(2);
  });

  test('addFinishedGame should add parsed games to finishedGames', () => {
    scoreboard.addFinishedGame(['Team A - Team B: 2 - 1', 'Team C - Team D: 0 - 0']);
  
    expect(scoreboard.getFinishedGames()).toHaveLength(2);
  
    const firstGame = scoreboard.getFinishedGames()[0];
    expect(firstGame.homeTeam).toBe('Team A');
    expect(firstGame.awayTeam).toBe('Team B');
    expect(firstGame.homeScore).toBe(2);
    expect(firstGame.awayScore).toBe(1);

    const secondGame = scoreboard.getFinishedGames()[1];
    expect(secondGame.homeTeam).toBe('Team C');
    expect(secondGame.awayTeam).toBe('Team D');
    expect(secondGame.homeScore).toBe(0);
    expect(secondGame.awayScore).toBe(0);
  });

  test('getSummary should return a summary of all games sorted by total score', () => {
    const scoreboard = new ScoreBoard();
    scoreboard.startGame('Team A', 'Team B');
    scoreboard.updateScore('Team A', 'Team B', 2, 1);
    scoreboard.startGame('Team C', 'Team D');
    scoreboard.updateScore('Team C', 'Team D', 0, 3);
  
    const summary = scoreboard.getSummary();
    const expectedSummary = [
      'Team C 0 - Team D 3',
      'Team A 2 - Team B 1'
    ];
    
    expect(summary.length).toEqual(expectedSummary.length);
    expect(summary).toContainEqual(expectedSummary[0]);
    expect(summary).toContainEqual(expectedSummary[1]);
    expect(summary.indexOf(expectedSummary[1])).toBeLessThan(summary.indexOf(expectedSummary[0]));
  });

});
