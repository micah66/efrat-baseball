function populateElementWithText (id, text) {
  var element = document.getElementById(id)
  element.innerHTML = text
}

const standings = new XMLHttpRequest()
standings.onreadystatechange = function() {
  const XHR_DONE = 4
  const HTTP_OK = 200
  if (standings.readyState == XHR_DONE && standings.status == HTTP_OK) {
    const jstandings = JSON.parse(standings.responseText)
    const gameResults = jstandings.gamesResults
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

    const sortedStandings = Object
      .keys(statsByTeam)
      .map((teamName) => Object.assign(statsByTeam[teamName], {teamName: teamName}))
      .sort((teamStats, otherTeamStats) => {
        const byWinningPercentage = otherTeamStats.wp - teamStats.wp

        if (byWinningPercentage === 0) {
          return otherTeamStats.rd - teamStats.rd
        }

        return byWinningPercentage
      })


    const htmlStandings = sortedStandings.map((stats) => '' +
        '<tr>' +
          '<th scope="row">' + stats.teamName + '</th>' +
          '<td>' + stats.w + '</td>' +
          '<td>' + stats.l + '</td>' +
          '<td>' + stats.t + '</td>' +
          '<td>' + stats.wp + '</td>' +
          '<td>' + stats.rs + '</td>' +
          '<td>' + stats.ra + '</td>' +
          '<td>' + stats.rd + '</td>' +
        '</tr>'
      )
      .join('')

    populateElementWithText('js-standings', htmlStandings)

  }

}
standings.open("GET", "schedule.json", true)
standings.send()
