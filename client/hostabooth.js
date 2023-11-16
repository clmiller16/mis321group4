async function GetBusinessPerDate(id, date) {
    localStorage.setItem('pickedDate', date);
    console.log(id);
    console.log(date);
    let businesses = await GetAllBusinesses();
    let attendsplural = await GetAllAttends();
  
    let html = `
      <div class="container my-5 text-center">
        <h1 class="display-5 fw-bold">Businesses Attending ${date}</h1>
        <div class="p-5 text-center rounded-3" style="background-color: hsl(0, 0%, 100%);">
          <table class="table table-hover center" id="myTable">
            <thead id="table-header">
              <tr>
                <th scope="col">Event ID</th>
                <th scope="col">Booth Location</th>
                <th scope="col">Company Name</th>
                <th scope="col">Product Type</th>
                <th scope="col">Logo</th>
              </tr>
            </thead>
            <tbody id="myTableBody" class="table-group-divider">`;
  
    attendsplural.forEach(function (a) {
      if (a.eventID == id) {
        // Check if the booth has been selected for this event
        if (isBoothSelected(a.BoothLocation)) {
          html += `
            <tr>
              <td>${a.eventID}</td>
              <td>${a.  BoothLocation}</td>
              <td>${businesses[a.businessID - 1].companyName}</td>
              <td>${businesses[a.businessID - 1].productType}</td>
              <td><img src="${businesses[a.businessID - 1].logo}" alt="logo failed" style="max-width: 100px; max-height: 100px;"></td>
            </tr>`;
        }
      }
    });
  
    html += `</tbody>
      </table>
    </div>
  </div>
  <div class="center-container">
    <button class="btn btn-primary my-5 ms-5">
      <a class="nav-link active" aria-current="page" href="purchasetickets2.html">SUBMIT</a>
    </button>
  </div>`;
    document.getElementById('businesses-at-market-table').innerHTML = html;
  
    const pickedDate = localStorage.getItem('pickedDate');
    console.log(pickedDate);
  }
  
  function isBoothSelected(boothLocation) {
    // Implement logic to check if the booth has been selected based on the database
    // You may need to fetch data from the database or use a different approach depending on your backend setup.
    // For the sake of this example, assuming a global array to store selected booth locations.
    const selectedBooths = ['Booth1', 'Booth3', 'Booth5']; // Replace with your actual data
  
    return selectedBooths.includes(boothLocation);
  }
  

// $(document).ready(function() {
//     var city, map;
//     map = $('.ct-map');
//     city = map.find('.ct-city');
//     city.each(function() {
//       var button, that;
//       that = $(this);
//       button = that.find('.ct-city__button');
//       return button.on('click', function() {
//         city.not(that).removeClass('active');
//         if (that.hasClass('active')) {
//           that.removeClass('active');
//           return map.removeClass('popup-open');
//         } else {
//           that.addClass('active');
//           return map.addClass('popup-open');
//         }
//       });
//     });
//   });