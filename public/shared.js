const colorOfTeam = {
  'Pina Chama': 'pina',
  'Scorpions': 'scorpions',
  'Papa Spice': 'papa',
  'World Ventures': 'world'
}

function populateElementWithText (id, text) {
  var element = document.getElementById(id)
  element.innerHTML = text
}

function fetchJSON (file, callback) {
  const xhr = new XMLHttpRequest()
  xhr.onreadystatechange = function () {
    const XHR_DONE = 4
    const HTTP_OK = 200
    if (xhr.readyState === XHR_DONE && xhr.status === HTTP_OK) {
      const data = JSON.parse(xhr.responseText)
      callback(data)
    }
  }
  xhr.open('GET', file, true)
  xhr.send()
}
