const out = (...str) => console.log(...str);

const partiesUrl = "http://localhost:8080/allParties"

let chosenParty = localStorage.getItem("chosenParty")
let chosenPartyKommune = localStorage.getItem("chosenPartyKommune")

function newCandidate() {
  let name = document.getElementById("inpName").value

  let chosenParty = localStorage.getItem("chosenParty")
  let chosenPartyKommune = localStorage.getItem("chosenPartyKommune")

  let postCandidateRequest = {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({
      "candidateName": name,
      "party": {
        "partyID": chosenParty,
      },
      "kommune":{
        "kommuneID":chosenPartyKommune
      }
    })
  }

  fetch("http://localhost:8080/candidate", postCandidateRequest )
    .then(response => response.json())
    .then(data => candidateCreated(data))
    .catch(error => console.log(error));
}

function candidateCreated(data){
  out(arguments)
  out(data)
  alert("Candidate registred")
}

function fetchAllParties() {
  return fetch(partiesUrl)
    .then(data => data.json())
    .then(partyDropdown);
}

function partyDropdown(data) {
  let firstParty = data[0];
  let firstPartyId = firstParty[Object.keys(firstParty)[0]];
  localStorage.setItem('chosenParty', firstPartyId)

  for (let i = 0; i < data.length; i++) {

    let party = data[i];

    let dropdown = document.getElementById("selectDropdown");
    let option = document.createElement("option");
    option.innerText = party.partyName;
    option.setAttribute("class", "select-dropdown__list-item");
    option.setAttribute("value", party.partyID);
    dropdown.appendChild(option);


    dropdown.addEventListener("change", (event) => {
      const selectIndex = dropdown.selectedIndex;
      let optionIndex = dropdown.options[selectIndex]
      party.partyID = optionIndex.value
      out(optionIndex.value);
      localStorage.setItem("chosenParty", optionIndex.value)
      localStorage.setItem("chosenPartyKommune",party.kommune.kommuneID)
      out(party.kommune.kommuneID)

    })
  }
}

fetchAllParties()
