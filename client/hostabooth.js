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
    // let availableBooths = await GetAvailableBooths(id);

    let html = `
      <div class="container">
        <img src="./resources/styles/Map_2017_2-e1588350571960.jpg" alt="failed to load">
      </div>`;

    html += `<div class="py-5 text-center">
    <form onsubmit="return bookBooth()">
        <label for="booth">Choose a booth:</label>
        <select id="booth" name="booth">
            <script>
                for (let i = 1; i <= 193; i++) {
                    document.write(<option>Booth</option>);
                }
            </script>
        </select>
        <input type="submit" value="Book this Booth" class="btn btn-primary">
    </form>
    </div>`

    document.getElementById('choose-booth').innerHTML = html;
}











// -------- WILLA'S CODE BELOW --------


// async function GetAvailableBooths(eventID) {
//   try {
//     let allBooths = await GetAllBoothsForEvent(eventID);
//     let selectedBooths = await GetSelectedBooths(eventID);
//     let availableBooths = allBooths.filter(booth => !selectedBooths.includes(booth.boothLocation));
//     return availableBooths;
//   } catch (error) {
//     console.error("Error fetching available booths:", error);
//     return [];
//   }
// }

// async function GetAllBoothsForEvent(eventID) {
//   try {
//     const response = await fetch(`http://localhost:5124/api/attends?eventID=${eventID}`);
//     const data = await response.json();
//     return data; // Assuming data is an array of booths for the given event
//   } catch (error) {
//     console.error("Error fetching booths for the event:", error);
//     return [];
//   }
// }

// async function bookBooth() {
//   const selectedBooth = document.getElementById('booth').value;
//   const eventId = getSelectedEventId(); // Implement this function to get the selected event ID

//   // Use fetch or any other method to send the booking information to the server
//   try {
//       const response = await fetch('http://localhost:5124/api/attends', {
//           method: 'POST',
//           headers: {
//               'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//               eventId: eventId,
//               booth: selectedBooth,
//           }),
//       });

//       if (response.ok) {
//           alert('Booth booked successfully!');
//       } else {
//           alert('Failed to book booth. Please try again.');
//       }
//   } catch (error) {
//       console.error('Error booking booth:', error);
//       alert('An error occurred while booking the booth. Please try again.');
//   }

//   // Prevent the form from submitting and refreshing the page
//   return false;
// }

// async function GetSelectedBooths(eventID) {
//   try {
//     const response = await fetch(`http://localhost:5124/api/getSelectedBooths?eventID=${eventID}`);
//     const selectedBooths = await response.json();
//     return selectedBooths;
//   } catch (error) {
//     console.error(`Error fetching selected booths for event ${eventID}:`, error);
//     return [];
//   }
// }

//   // Implement this function to get the selected event ID
// function getSelectedEventId() {
//     // Add logic to retrieve the selected event ID
//     // For now, I'm assuming you have a function or variable that holds the selected event ID
//     // Replace the following line with your actual implementation
//     return '123'; // Example value, replace with your logic
// }

// async function BookBooth(eventID) {
//   try {
//     // Implement the logic to book a booth (You may need to send a request to your server to update the database)

//     // Assuming you have a function to update the database, replace the following line with the actual logic
//     await UpdateBoothBooking(eventID);

//     // Redirect to the confirmation page
//     window.location.href = 'businessboothconfirmation.html'; // Change 'confirmation.html' to the actual page you want to redirect to
//   } catch (error) {
//     console.error(`Error booking booth for event ID ${eventID}:`, error);
//     // Handle error, display a message, or redirect to an error page
//   }
// }




