class ScoreBoard {
    constructor() {
        const storedData = JSON.parse(localStorage.getItem('scoreboard'));
        this.liveGames = storedData?.liveGames || [];
        this.finishedGames = storedData?.finishedGames || [];
      }
  
    startGame(homeTeam, awayTeam) {
      const match = {
        homeTeam,
        awayTeam,
        homeScore: 0,
        awayScore: 0,
      };
      this.liveGames.push(match);
      this.saveToLocalStorage();
    }
  
    finishGame(homeTeam, awayTeam) {
        const finishedMatches = this.liveGames.filter(
          (match) => match.homeTeam === homeTeam && match.awayTeam === awayTeam
        );
      
        this.liveGames = this.liveGames.filter(
          (match) => !(match.homeTeam === homeTeam && match.awayTeam === awayTeam)
        );
      
        this.finishedGames.unshift(...finishedMatches);
        this.saveToLocalStorage();
      }
  
    updateScore(homeTeam, awayTeam, homeScore, awayScore) {
      const match = this.liveGames.find(
        (match) => match.homeTeam === homeTeam && match.awayTeam === awayTeam
      );
      if (match) {
        match.homeScore = homeScore;
        match.awayScore = awayScore;
        this.saveToLocalStorage();
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
    
        const game = {
          homeTeam,
          awayTeam,
          homeScore: parseInt(homeScore),
          awayScore: parseInt(awayScore)
        };
    
        this.finishedGames.push(game);
      })
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