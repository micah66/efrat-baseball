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

function fetchJSON(file, callback) {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    const XHR_DONE = 4
    const HTTP_OK = 200
    if (xhr.readyState == XHR_DONE && xhr.status == HTTP_OK) {
      const data = JSON.parse(xhr.responseText)
      callback(data)
    }
  }
  xhr.open("GET", file, true)
  xhr.send()
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
