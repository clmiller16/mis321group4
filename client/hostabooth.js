async function handleOnLoad() {
  await CreateTable();
}

async function GetAllAttends() {
  try {
    let response = await fetch('http://localhost:5124/api/attends');
    attends = await response.json();
    return attends;
  } catch (error) {
    console.error("Error fetching attends:", error);
    return [];
  }
}

async function GetAllEvents() {
  try {
    let response = await fetch('http://localhost:5124/api/event');
    events = await response.json();
    return events;
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
}

async function CreateTable() {
  try {
    let events = await GetAllEvents()
    let attends = await GetAllAttends()
    let BusinessID = sessionStorage.getItem('business-id').toString()
    let html = `
      <div class="container my-5 text-center">
        <h1 class="display-5 fw-bold">Upcoming Events</h1>
        <div class="p-5 text-center rounded-3" style="background-color: hsl(0, 0%, 100%);">
          <table class="table table-hover center" id="myTable">
            <thead id="table-header">
              <tr>
                <th scope="col">Event ID</th>
                <th scope="col">Date</th>
                <th scope="col">Location</th>
                <th scope="col">Select/Edit</th>
              </tr>
            </thead>
            <tbody id="myTableBody" class="table-group-divider">`;

    events.forEach(function (e) {
      let isAttending = attends.some(a => a.eventID === e.eventID && a.businessID.toString() === BusinessID)
      let buttonText = isAttending ? 'Edit' : 'Select'
      html += `
        <tr>
          <td>${e.eventID}</td>
          <td>${e.date}</td>
          <td>${e.location}</td>
          <td>
            <button class="btn btn-primary" onclick="SelectEvent('${e.eventID}', '${buttonText}')">${buttonText}</button>
          </td>
        </tr>`;
    });

    html += `</tbody>
          </table>
        </div>
      </div>`;
    document.getElementById('events-table').innerHTML = html;
  } catch (error) {
    console.error("Error creating table:", error);
  }
}

async function SelectEvent(id, action) {
  if (action === 'Edit')
  {
      let businessId = sessionStorage.getItem('business-id');
      let allBooths = await GetAllAttends();
     
      let businessBooth = allBooths.find(booth => booth.eventID == id && booth.businessID.toString() == businessId);
      
      document.getElementById('chooseabooth').textContent = `For Event ${id}, your current booth is Booth ${businessBooth.boothLocation}`;

      let availableBooths = await GetAvailableBooths(id);
      let boothSelect = document.getElementById('booth');
      let form = document.querySelector('form')
      boothSelect.innerHTML = ''; 
  
      availableBooths.forEach(function (booth) {
        
        let option = document.createElement('option');
        option.value = booth; 
        option.textContent = `Booth ${booth}`;
        boothSelect.appendChild(option);
      })
    document.getElementById('bookBoothButton').style.display = 'inline';
    document.getElementById('deleteBoothButton').style.display = 'inline';

    form.onsubmit = function(event) {
      event.preventDefault(); 
    };

    document.getElementById('bookBoothButton').onclick = function() {
      let selectedBooth = boothSelect.value;
      EditAttends(id, selectedBooth)
    };

    document.getElementById('deleteBoothButton').onclick = function() {
      DeleteAttends(id, businessBooth.boothLocation); 
    };
  }
  else{
    try {
      let availableBooths = await GetAvailableBooths(id);
      let boothSelect = document.getElementById('booth');
      let form = document.querySelector('form')
      document.getElementById('chooseabooth').textContent = `Choose a booth for Event ${id}:`
      boothSelect.innerHTML = ''; 
  
      availableBooths.forEach(function (booth) {
        
        let option = document.createElement('option');
        option.value = booth; 
        option.textContent = `Booth ${booth}`;
        boothSelect.appendChild(option);
      })
  
      document.getElementById('bookBoothButton').style.display = 'inline';
  
      form.addEventListener('submit', function(event) {
        event.preventDefault(); 
        let selectedBooth = boothSelect.value;
        CreateNewAttends(id, selectedBooth)
      });
  
    } catch (error) {
      console.error("Error fetching available booths:", error)
    }
  }
}



async function GetAvailableBooths(eventID) {
  try {
    let totalBooths = Array.from({ length: 183 }, (_, i) => i + 1); //so we declare an array with number of booths here
    let eventBooths = await GetSelectedBooths(eventID); //get selected booths here
    let selectedBoothLocations = eventBooths.map(booth => booth.boothLocation) //converts selected
    let availableBooths = totalBooths.filter(booth => !selectedBoothLocations.includes(booth.toString())); // remove the selected booths from the total booths here
    return availableBooths; 
  } catch (error) {
    console.error("Error fetching available booths:", error);
    return [];
  }
}

async function GetSelectedBooths(eventID) {
  try {
    const allBooths = await GetAllAttends() 
    const boothsFilteredByEvent = allBooths.filter(attends => attends.eventID == eventID)
    return boothsFilteredByEvent;
  } catch (error) {
    console.error(`Error fetching selected booths for event ${eventID}:`, error);
    return [];
  }
}


async function CreateNewAttends(eventID, boothNumber)
{
  attends = {BoothLocation: boothNumber, EventID: eventID, BusinessID: sessionStorage.getItem('business-id')}
  try {
    await fetch('http://localhost:5124/api/Attends', {
      method: "POST",
      headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
      },
      body: JSON.stringify(attends),})
      sessionStorage.setItem('eventID', eventID)
      sessionStorage.setItem('boothNumber', boothNumber)
      window.location.href = 'businessboothconfirmation.html'
      
  } catch (error)
  {
    console.error(`Error creating new attends event`, error)
  }
}

async function EditAttends(eventID, boothNumber)
{
  attends = {BoothLocation: boothNumber, EventID: eventID, BusinessID: sessionStorage.getItem('business-id')}
  try
  {
    await fetch(`http://localhost:5124/api/Attends/${eventID}/${sessionStorage.getItem('business-id')}`, {
      method: 'PUT',
      headers: {
        "content-type": "application/json"
              },
      body: JSON.stringify(attends),
     })
     sessionStorage.setItem('eventID', eventID)
     sessionStorage.setItem('boothNumber', boothNumber)
     window.location.href = 'businessboothconfirmation.html'
  }
  catch (error)
  {
    console.error(`Error editing attends event`, error)
  }
}

async function DeleteAttends(eventID, boothNumber)
{
  attends = {BoothLocation: boothNumber, EventID: eventID, BusinessID: sessionStorage.getItem('business-id')}
  console.log("I am deleting")
  console.log(attends)
  try
  {
    await fetch(`http://localhost:5124/api/Attends/${eventID}/${sessionStorage.getItem('business-id')}`, {
      method: 'DELETE',
      headers: {
        "content-type": "application/json"
              },
      body: JSON.stringify(attends),
     })
     handleOnLoad()
  }
  catch (error)
  {
    console.error(`Error deleting attends event`, error)
  }
}




