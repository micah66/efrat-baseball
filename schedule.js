function populateElementWithText (id, text) {
  var element = document.getElementById(id)
  element.innerHTML = text
}


const colorOfTeam = {
  'Pina Chama': 'pina',
  'Scorpions': 'scorpions',
  'Papa Spice': 'papa',
  'World Ventures': 'world'
}

var games = [
    {date: "Sept 1st", time: "12:45", away: "Pina Chama", home: "Scorpions"},
    {date: "Sept 1st", time: "14:45", away: "Papa Spice", home: "World Ventures"},
    {date: "Sept 8th", time: "12:45", away: "Scorpions", home: "World Ventures"},
    {date: "Sept 8th", time: "14:45", away: "Pina Chama", home: "Papa Spice"},
    {date: "Sept 15th", time:  "12:45", away: "World Ventures", home: "Pina Chama"},
    {date: "Sept 15th", time:  "14:45", away: "Papa Spice", home: "Scorpions"},
    {date: "Sept 20th", time:  "12:45", away: "Pina Chama", home: "Papa Spice"},
    {date: "Sept 20th", time:  "14:45", away: "World Ventures", home: "Scorpions"},
    {date: "Oct 13th", time: "12:45", away: "Scorpions", home: "Papa Spice"},
    {date: "Oct 13th", time: "14:45", away: "Pina Chama", home: "World Ventures"},
    {date: "Oct 20th", time: "12:45", away: "World Ventures", home: "Papa Spice"},
    {date: "Oct 20th", time: "14:45", away: "Scorpions", home: "Pina Chama"},
    {date: "Oct 27th", time: "12:45", away: "Scorpions", home: "World Ventures"},
    {date: "Oct 27th", time: "14:45", away: "Papa Spice", home: "Pina Chama"}
]

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
