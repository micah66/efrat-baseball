const gameResults = [
  {
    away: {name:'Pina Chama', score:4},
    home: {name:'Scorpions', score:10}
  },
  {
    away: {name:'Papa Spice', score:7},
    home: {name:'World Ventures', score:8}
  },
  {
    away: {name:'Scorpions', score:7},
    home: {name:'World Ventures', score:9}
  },
  {
    away: {name:'Pina Chama', score:12},
    home: {name:'Papa Spice', score:10}
  },
  {
    away: {name:'World Ventures', score:9},
    home: {name:'Pina Chama', score:4}
  },
  {
    away: {name:'Papa Spice', score:2},
    home: {name:'Scorpions', score:18}
  },
  {
    away: {name:'Pina Chama', score:7},
    home: {name:'Papa Spice', score:6}
  },
  {
    away: {name:'World Ventures', score:8},
    home: {name:'Scorpions', score:7}
  },
  {
    away: {name:'Scorpions', score:6},
    home: {name:'Papa Spice', score:10}
  },
  {
    away: {name:'Pina Chama', score:3},
    home: {name:'World Ventures', score:13}
  },
  {
    away: {name:'World Ventures', score:9},
    home: {name:'Papa Spice', score:6}
  },
  {
    away: {name:'Scorpions', score:4},
    home: {name:'Pina Chama', score:3}
  },
  {
    away: {name:'Scorpions', score:0},
    home: {name:'World Ventures', score:3}
  },
  {
    away: {name:'Papa Spice', score:5},
    home: {name:'Pina Chama', score:7}
  },
]

const gameResultsByTeam = gameResults.reduce((gameResultsByTeamSoFar, gameResult) =>  {
  const awayTeamName = gameResult.away.name
  const homeTeamName = gameResult.home.name
  ;[awayTeamName, homeTeamName].forEach((teamName) => {

    const existingGamesOfThisTeam = gameResultsByTeamSoFar[teamName] || []
    gameResultsByTeamSoFar[teamName] = existingGamesOfThisTeam

    existingGamesOfThisTeam.push(gameResult)
  })

  return gameResultsByTeamSoFar
}, {})
console.log(gameResultsByTeam)

const isHome = (teamName, gameResult) => gameResult.home.name === teamName

const statsFromGameResults = (teamName, gameResults) => {
  return gameResults.reduce((statsSoFar, gameResult) => {
    const selectedTeamScore = isHome(teamName, gameResult) ? gameResult.home.score : gameResult.away.score
    const opponentScore = isHome(teamName, gameResult) ? gameResult.away.score : gameResult.home.score
    if (selectedTeamScore > opponentScore) {
      statsSoFar.w += 1
    } else {
      statsSoFar.l += 1
    }
    if (selectedTeamScore === opponentScore) {
      statsSoFar.t += 1
    }
    statsSoFar.rs = statsSoFar.rs + selectedTeamScore
    statsSoFar.ra = statsSoFar.ra + opponentScore

    return statsSoFar
  }, {w:0, l:0, t:0, rs:0, ra:0})
}

const statsByTeam = Object.keys(gameResultsByTeam).reduce((statsByTeamSoFar, teamName) => {
  const teamSpecificResults = gameResultsByTeam[teamName]
  const stats = statsFromGameResults(teamName, teamSpecificResults)
  const winPercentage = stats.w / gameResultsByTeam[teamName].length

  stats.rd = stats.rs - stats.ra
  stats.wp = winPercentage.toFixed(3)

  statsByTeamSoFar[teamName] = stats

  return statsByTeamSoFar

}, {})



console.log(statsByTeam)

console.log()
// var firstPlace =
//
// // Win: Team that scores more runs
// // Loss: Team that scores fewer runs
// function awayWin() {
//   if (awayScore > homeScore) {
//     teams[awayTeam][w] += 1
//     teams[homeTeam][l] += 1
//     teams[awayTeam][v] += 0.5
//     teams[homeTeam][v] -= 0.5
//   }
// }
//
// function homeWin() {
//   if (awayScore < homeScore) {
//     teams[homeTeam][w] += 1
//     teams[awayTeam][l] += 1
//     teams[homeTeam][v] += 0.5
//     teams[awayTeam][v] -= 0.5
//   }
// }
//
// // Tie: Neither team scores more runs
// function tieGame() {
//   if (awayScore === homeScore) {
//   teams[awayTeam][t] += 1
//   teams[homeTeam][t] += 1
//   }
// }
//
// // Games Behind: Number of game a team is behind the first place team
//   //[(Leading Team W - Team W) + (Team L - Leading Team L)] / 2
// function gameBehind() {
//   teams[gb] = ''
//   teams[gb] +=
// }
//
// // Runs Scored: Sum of runs for
// function runsScored() {
//   teams[rs] =
// }
//
// // Runs Allowed: Sum of runs scored by opponents
// // Runs Differential: Runs Scored - Runs Allowed
