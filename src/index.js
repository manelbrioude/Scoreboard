class ScoreBoard {
    constructor() {
        const storedData = JSON.parse(localStorage.getItem('scoreboard'));
        this.liveGames = storedData?.liveGames || [];
        this.finishedGames = storedData?.finishedGames || [];
      }
  
    startGame(homeTeam, awayTeam) {
      if (homeTeam && awayTeam && homeTeam.trim() !== '' && awayTeam.trim() !== '') {
        const match = {
          homeTeam,
          awayTeam,
          homeScore: 0,
          awayScore: 0,
        };
        this.liveGames.push(match);
        this.saveToLocalStorage();
      } else {
        console.log('Invalid team names');
      }
    }
  
    finishGame(homeTeam, awayTeam) {
      if (homeTeam && awayTeam && homeTeam.trim() !== '' && awayTeam.trim() !== '') {
        const finishedMatches = this.liveGames.filter(
          (match) => match.homeTeam.toLowerCase() === homeTeam.toLowerCase() && match.awayTeam.toLowerCase() === awayTeam.toLowerCase()
        );
      
        if (finishedMatches.length !== 0) {
          this.liveGames = this.liveGames.filter(
            (match) => !(match.homeTeam.toLowerCase() === homeTeam.toLowerCase() && match.awayTeam.toLowerCase() === awayTeam.toLowerCase())
          );
      
          this.finishedGames.unshift(...finishedMatches);
          this.saveToLocalStorage();
        }else{
          console.log('No match found')
        }
      } else {
        console.log('Invalid team names');
      }
      
    }
  
    updateScore(homeTeam, awayTeam, homeScore, awayScore) {
      if (homeTeam && awayTeam && homeTeam.trim() !== '' && awayTeam.trim() !== '') {
        const match = this.liveGames.find(
          (match) => match.homeTeam.toLowerCase() === homeTeam.toLowerCase() && match.awayTeam.toLowerCase() === awayTeam.toLowerCase()
        );
    
        if (match) {
          if (!isNaN(homeScore) && !isNaN(awayScore)) {
            match.homeScore = homeScore;
            match.awayScore = awayScore;
            this.saveToLocalStorage();
          } else {
            console.log('Invalid score values');
          }
        } else {
          console.log('No match found');
        }
      } else {
        console.log('Invalid team names');
      }
    }
    
  
    getLiveGames() {
      return this.liveGames;
    }
  
    getFinishedGames() {
      return this.finishedGames;
    }
  
    getSummary() {
      const allGames = [...this.liveGames, ...this.finishedGames];
      const sortedMatches = allGames.sort(
        (a, b) => b.homeScore + b.awayScore - (a.homeScore + a.awayScore)
      );
  
      const summary = sortedMatches.map((match) => 
      `${match.homeTeam} ${match.homeScore} - ${match.awayTeam} ${match.awayScore}`);
  
      return summary;
    }

    addFinishedGame(gameStrings) {
      gameStrings.forEach(gameString => {
        const [teams, scores] = gameString.split(":");
        const [homeTeam, awayTeam] = teams.split(" - ");
        const [homeScore, awayScore] = scores.split(" - ");
    
        if (homeTeam && awayTeam && homeTeam.trim() !== '' && awayTeam.trim() !== '' && !isNaN(parseInt(homeScore)) && !isNaN(parseInt(awayScore))) {
          const game = {
            homeTeam,
            awayTeam,
            homeScore: parseInt(homeScore),
            awayScore: parseInt(awayScore)
          };
    
          this.finishedGames.push(game);
        } else {
          console.log('Invalid game format:', gameString);
        }
      });
    
      this.saveToLocalStorage();
    }
    
  
    saveToLocalStorage() {
      localStorage.setItem(
        'scoreboard',
        JSON.stringify({
          liveGames: this.liveGames,
          finishedGames: this.finishedGames,
        })
      );
    }
  
    loadFromLocalStorage() {
      const data = JSON.parse(localStorage.getItem('scoreboard'));
      if (data) {
        this.liveGames = data.liveGames || [];
        this.finishedGames = data.finishedGames || [];
      }
    }
  }

  module.exports = ScoreBoard;