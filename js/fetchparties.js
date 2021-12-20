const partiesUrl = "http://localhost:8080/allParties";
function fetchAllParties(){
  return fetch(partiesUrl)
    .then(data => data.json())
    .then(partiesData)
}

function partiesData(data) {
  const partySectionDiv = document.getElementById("partySectionDiv")

  for (let i = 0; i < data.length; i++) {
    const party = data[i];

    let li = document.createElement("li")
    li.setAttribute("class", "list-group-item")
    partySectionDiv.appendChild(li)

    let partyName = document.createElement('a')
    partyName.setAttribute('value', party.partyName)
    partyName.innerText = party.partyName
    partyName.href = "http://localhost:63342/_3SemesterEksamen-frontend/party.html"
    li.appendChild(partyName)

    partyName.onclick = function (){
      localStorage.setItem("currentPartyID",party.partyID)
    }
  }
}
fetchAllParties();
