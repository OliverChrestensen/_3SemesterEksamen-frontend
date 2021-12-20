const out = (...str) => console.log(...str);
const candidatesUrl = "http://localhost:8080/allCandidates";

function fetchCandidates() {
  return fetch(candidatesUrl)
    .then(data => data.json())
    .then(candidateData)
}

const table = document.getElementById("candidatesTable")
const candidateTBody = document.getElementById("candidatesTBody")
table.appendChild(candidateTBody)

function candidateData(data) {
  for (let i = 0; i < data.length; i++) {

    const candidate = data[i]
    //row
    let rowCount = candidateTBody.rows.length;
    let row = candidateTBody.insertRow(rowCount);
    row.id = candidate.candidateID;

    //candidate row
    let candidateTableRow = row.insertCell(0);
    let candidateNameTd = document.createElement("td")
    candidateNameTd.setAttribute("value", candidate.candidateID);
    candidateNameTd.innerText = candidate.candidateName;
    candidateTableRow.appendChild(candidateNameTd)

    //party row
    let partyTableRow = row.insertCell(1)
    let partyTd = document.createElement("td")
    partyTd.setAttribute("value", candidate.party.partyName)
    partyTd.innerText = candidate.party.partyName
    partyTableRow.appendChild(partyTd)
  }

  //jquery table
  var table = $('#candidatesTable').DataTable({
    dom: 'Bfrtip',
    buttons: [
      'copy', 'csv', 'excel', 'pdf', 'print'
    ]
  });

  $('#candidatesTable').on('click', 'tbody tr', function () {
    console.log('API row values : ', table.row(this).data());
  })
}
fetchCandidates();

