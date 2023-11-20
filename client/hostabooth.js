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
    let events = await GetAllEvents();
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
                <th scope="col">Select</th>
              </tr>
            </thead>
            <tbody id="myTableBody" class="table-group-divider">`;

    events.forEach(function (e) {
      html += `
        <tr>
          <td>${e.eventID}</td>
          <td>${e.date}</td>
          <td>${e.location}</td>
          <td>
            <button class="btn btn-primary" onclick="SelectEvent('${e.eventID}')">Select</button>
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

async function SelectEvent(id) {
  try {
    let availableBooths = await GetAvailableBooths(id);

    let html = `
      <div class="container">
        <img src="./resources/styles/Map_2017_2-e1588350571960.jpg" alt="failed to load">
        <div>
          <div class="dropdown text-center">
            <ul class="dropdown-menu" id="dropdown-container" style="max-height: 300px; overflow-y: auto;">`;

    availableBooths.forEach(function (booth) {
      html += `<div class="container"><li><button class="btn btn-light" onclick="GetBusinessPerBooth('${booth.eventID}', '${booth.boothLocation}')">${booth.boothLocation}</button></li></div>`;
    });

    html += `</ul>
          </div>
        </div>
      </div>`;

    document.getElementById('choose-booth').innerHTML = html;
  } catch (error) {
    console.error("Error fetching available booths:", error);
  }
}

async function GetAvailableBooths(eventID) {
  try {
    let allBooths = await GetAllBoothsForEvent(eventID);
    let selectedBooths = await GetSelectedBooths(eventID);
    let availableBooths = allBooths.filter(booth => !selectedBooths.includes(booth.boothLocation));
    return availableBooths;
  } catch (error) {
    console.error("Error fetching available booths:", error);
    return [];
  }
}

async function GetAllBoothsForEvent(eventID) {
  try {
    const response = await fetch(`http://localhost:5124/api/attends?eventID=${eventID}`);
    const data = await response.json();
    return data; // Assuming data is an array of booths for the given event
  } catch (error) {
    console.error("Error fetching booths for the event:", error);
    return [];
  }
}

async function GetSelectedBooths(eventID) {
  try {
    const response = await fetch(`http://localhost:5124/api/getSelectedBooths?eventID=${eventID}`);
    const selectedBooths = await response.json();
    return selectedBooths;
  } catch (error) {
    console.error(`Error fetching selected booths for event ${eventID}:`, error);
    return [];
  }
}

async function BookBooth(eventID) {
  try {
    // Implement the logic to book a booth (You may need to send a request to your server to update the database)

    // Assuming you have a function to update the database, replace the following line with the actual logic
    await UpdateBoothBooking(eventID);

    // Redirect to the confirmation page
    window.location.href = 'businessboothconfirmation.html'; // Change 'confirmation.html' to the actual page you want to redirect to
  } catch (error) {
    console.error(`Error booking booth for event ID ${eventID}:`, error);
    // Handle error, display a message, or redirect to an error page
  }
}




