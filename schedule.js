function populateElementWithText (id, text) {
  var element = document.getElementById(id)
  element.innerHTML = text
}

// Create the data
function Game(date, time, away, home) {
  this.date = date
  this.time = time
  this.away = away
  this.home = home
}

const colorOfTeam = {
  'Pina Chama': 'pina',
  'Scorpions': 'scorpions',
  'Papa Spice': 'papa',
  'World Ventures': 'world'
}

var games = [
    new Game("Sept 1st", "12:45", "Pina Chama", "Scorpions"),
    new Game("Sept 1st", "14:45", "Papa Spice", "World Ventures"),
    new Game("Sept 8th", "12:45", "Scorpions", "World Ventures"),
    new Game("Sept 8th", "14:45", "Pina Chama", "Papa Spice"),
    new Game("Sept 15th", "12:45", "World Ventures", "Pina Chama"),
    new Game("Sept 15th", "14:45", "Papa Spice", "Scorpions"),
    new Game("Sept 20th", "12:45", "Pina Chama", "Papa Spice"),
    new Game("Sept 20th", "14:45", "World Ventures", "Scorpions"),
    new Game("Oct 13th", "12:45", "Scorpions", "Papa Spice"),
    new Game("Oct 13th", "14:45", "Pina Chama", "World Ventures"),
    new Game("Oct 20th", "12:45", "World Ventures", "Papa Spice"),
    new Game("Oct 20th", "14:45", "Scorpions", "Pina Chama"),
    new Game("Oct 27th", "12:45", "Scorpions", "World Ventures"),
    new Game("Oct 27th", "14:45", "Papa Spice", "Pina Chama")
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
