const out = (...str) => console.log(...str);
const allParitesUrl = "http://localhost:8080/allParties";


function fetchAllParties(){
  return fetch(allParitesUrl)
    .then(data => data.json())
    .then(allPartiesData)
}

const table = document.getElementById("partiesTable")
const partiesTBody = document.getElementById("partiesTBody")
table.appendChild(partiesTBody)

function allPartiesData(data){

  for (let i = 0; i< data.length; i++){
    const party = data[i]
//row
    let rowCount = partiesTBody.rows.length;
    let row = partiesTBody.insertRow(rowCount);
    row.id = party.partyID;

    //party row
    let partyTableRow = row.insertCell(0)
    let partyTd = document.createElement("td")
    partyTd.setAttribute("value", party.partyName)
    partyTd.innerText = party.partyName
    partyTableRow.appendChild(partyTd)


    //stemmeprocent  row
    let percentageTableRow = row.insertCell(1)
    let percentageTd = document.createElement("td")
    percentageTd.setAttribute("value", party.partyVotes)
    percentageTd.innerText = party.partyVotes + "%"
    percentageTableRow.appendChild(percentageTd)
  }
  var table = $('#partiesTable').DataTable( {
    dom: 'Bfrtip',
    buttons: [
      'copy', 'csv', 'excel', 'pdf', 'print'
    ]
  } );

  $('#partiesTable').on('click', 'tbody tr', function() {
    console.log('API row values : ', table.row(this).data());
  })
}
fetchAllParties();
