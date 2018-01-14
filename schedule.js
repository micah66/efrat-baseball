const colorOfTeam = {
  'Pina Chama': 'pina',
  'Scorpions': 'scorpions',
  'Papa Spice': 'papa',
  'World Ventures': 'world'
}

fetchJSON('schedule.json', function (games) {
  const htmlString = games
    .map((game) => '' +
      '<tr>' +
        '<td>' + game.date + '</td>' +
        '<td>' + game.time + '</td>' +
        '<td class="' + colorOfTeam[game.away] + '">' + game.away + '</td>' +
        '<td class="' + colorOfTeam[game.home] + '">' + game.home + '</td>' +
      '</tr>'
    )
    .join('')
    populateElementWithText('js-schedule', htmlString)
})
