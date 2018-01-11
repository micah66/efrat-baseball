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


const schedule = new XMLHttpRequest();
schedule.onreadystatechange = function() {
  const XHR_DONE = 4
  const HTTP_OK = 200
  if (schedule.readyState == XHR_DONE && schedule.status == HTTP_OK) {
    const jschedule = JSON.parse(schedule.responseText)
    const htmlString = jschedule.games
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


    //console.log(jschedule.games)
  }
}
schedule.open("GET", "schedule.JSON", true)
schedule.send()
