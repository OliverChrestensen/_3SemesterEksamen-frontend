const out = (...str) => console.log(...str);

let currentPartyID = localStorage.getItem("currentPartyID");
let url = "http://localhost:8080/partyCandidates/" + currentPartyID;

function fetchCandidatesOnParty(){
  return fetch(url)
    .then(data => data.json())
    .then(partyCandidateData);
}

const candidateRow = document.getElementById('projectDivRow');
function partyCandidateData(data){

  for (let i = 0; i < data.length; i++) {
    const candidate = data[i];

    //h1 partyName
    let partyNameH1 = document.getElementById("partyNameH1")
    partyNameH1.innerText = candidate.party.partyName;

    //colDiv
    let candidateColDiv = document.createElement('div');
    candidateColDiv.classList.add('col-md-4');
    candidateRow.append(candidateColDiv);

    //cardDiv
    let candidateCardDiv = document.createElement('div');
    candidateCardDiv.classList.add('card', 'p-3');
    candidateColDiv.append(candidateCardDiv);

    //rowDiv
    let candidateRowDiv = document.createElement('div')
    candidateRowDiv.classList.add('d-flex', 'flex-row', 'mb-3')
    candidateCardDiv.append(candidateRowDiv);

    //candidateDiv
    let candidateDiv = document.createElement('div')
    candidateDiv.classList.add('d-flex', 'flex-column', 'ml-2')
    candidateDiv.setAttribute('id', 'candidateDiv')
    candidateRowDiv.append(candidateDiv)

    //span candidateName
    let candidateName = document.createElement('span')
    candidateName.setAttribute('value', candidate.candidateName)
    candidateName.innerHTML = candidate.candidateName

    //span partyName
    let partyName = document.createElement('span')
    partyName.classList.add('text-black-50')
    partyName.innerText = "Party: " + candidate.party.partyName;
    candidateDiv.append(candidateName)
    candidateDiv.append(partyName)

    let candidateBtnDiv = document.createElement('div')
    candidateBtnDiv.classList.add('d-flex', 'justify-content-between', 'install', 'mt-3')
    candidateCardDiv.append(candidateBtnDiv);

    //update
    const updateButton = document.createElement('button')
    updateButton.classList.add('profile-edit-btn', 'btn', 'btn-primary', 'updateButtonProject');
    updateButton.type = 'button'
    updateButton.innerText = 'Save'
    candidateBtnDiv.append(updateButton)

      //Turn spans into input
    let candidateNameInput = document.createElement('input')
    candidateNameInput.type = 'text'
    candidateNameInput.setAttribute('value', candidateName.innerText);

    candidateName.addEventListener('click', event => {
      candidateNameInput.value = candidate.candidateName;
      candidateName.replaceWith(candidateNameInput)
    })

    let partyInput = document.createElement('input')
    partyInput.type = 'text'
    partyInput.setAttribute('value', partyName.innerText);

    partyName.addEventListener('click', event => {
      partyInput.value = candidate.party.partyName;
      partyName.replaceWith(partyInput)
    })

    updateButton.onclick = function () {
      candidate.candidateName = candidateNameInput.value;
      candidate.party.partyName = partyInput.value;

      updateCandidate(candidate)
    }

    //delete
    const deleteButton = document.createElement('button')
    deleteButton.classList.add('profile-edit-btn', 'btn', 'btn-danger', 'deleteButtonProject');
    deleteButton.type = 'button'
    deleteButton.innerText = 'Delete'
    candidateBtnDiv.append(deleteButton)
    deleteButton.onclick = function () {
      deleteCandidate(candidate)
    }
  }
}
async function updateCandidate(candidate) {
  try {
    const response = await restUpdateCandidate(candidate);
    out(response);
    //window.location.reload();
  } catch (error) {
    out(error);
  }
}
async function restUpdateCandidate(candidate) {
  const updateURL = "http://localhost:8080/candidate/" + candidate.candidateID;
  const jsonString = JSON.stringify(candidate);
  out(jsonString);

  const fetchOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"},
    body: jsonString}
  const response = await fetch(updateURL, fetchOptions);
  out(response.status);
  out(response.ok);
  if (!response.ok) {
    out("error");
  }
  return response.json();
}

async function deleteCandidate(candidate) {
  try {
    const response = await restDeleteCandidate(candidate);
    out(response);
    window.location.reload();
  } catch (error) {
    out(error);
  }
}
async function restDeleteCandidate(candidate) {
  const deleteUrl = "http://localhost:8080/candidate/" + candidate.candidateID;
  const fetchOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"},
    body: ""}

  const response = await fetch(deleteUrl, fetchOptions);
  out(response.status)
  out(response.ok)
  window.location.href = "/Tidsregistrering-projekt-Frontend/party.html"
  if (!response.ok) {
    out(response.error())
  }
  return response;
}

fetchCandidatesOnParty()
