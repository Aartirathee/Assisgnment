// // Sample user data
// const  letusers = [
//   { id: 1, name: 'John Doe', domain: 'example.com', gender: 'male', availability: 'available' },
//   { id: 2, name: 'Jane Smith', domain: 'example.net', gender: 'female', availability: 'unavailable' },
//   // Add more users here
// ];

// // Number of users to display per page
// const usersPerPage = 20;

// // Get DOM elements
// const searchInput = document.getElementById('searchInput');
// const domainFilter = document.getElementById('domainFilter');
// const genderFilter = document.getElementById('genderFilter');
// const availabilityFilter = document.getElementById('availabilityFilter');
// const userList = document.getElementById('userList');
// const pagination = document.getElementById('pagination');
// const createTeamBtn = document.getElementById('createTeamBtn');
// const teamDetails = document.getElementById('teamDetails');

// // Initialize filters
// let searchTerm = '';
// let selectedDomain = '';
// let selectedGender = '';
// let selectedAvailability = '';

// // Initialize pagination
// let currentPage = 1;
// let filteredUsers = [];

// // Function to filter users based on search term and filters
// function applyFilters() {
//   searchTerm = searchInput.value.toLowerCase();
//   selectedDomain = domainFilter.value;
//   selectedGender = genderFilter.value;
//   selectedAvailability = availabilityFilter.value;

//   filteredUsers = users.filter(user => {
//     const nameMatch = user.name.toLowerCase().includes(searchTerm);
//     const domainMatch = selectedDomain === '' || user.domain === selectedDomain;
//     const genderMatch = selectedGender === '' || user.gender === selectedGender;
//     const availabilityMatch = selectedAvailability === '' || user.availability === selectedAvailability;
//     return nameMatch && domainMatch && genderMatch && availabilityMatch;
//   });

//   currentPage = 1;
//   displayUsers(getUsersForCurrentPage());
//   displayPagination();
// }

// // Function to get the users to display for the current page
// function getUsersForCurrentPage() {
//   const startIndex = (currentPage - 1) * usersPerPage;
//   const endIndex = startIndex + usersPerPage;
//   return filteredUsers.slice(startIndex, endIndex);
// }

// // Function to update the team details
// function updateTeamDetails() {
//   // Clear previous team details
//   teamDetails.innerHTML = '';

//   // Get selected users for the team
//   const selectedUsers = filteredUsers.filter(user => user.selected);

//   // Create team details elements
//   selectedUsers.forEach(user => {
//     const userDetail = document.createElement('div');
//     userDetail.innerHTML = `
//       <h3>${user.name}</h3>
//       <p>Domain: ${user.domain}</p>
//       <p>Gender: ${user.gender}</p>
//       <p>Availability: ${user.availability}</p>
//     `;
//     teamDetails.appendChild(userDetail);
//   });
// }

// // Function to display users for the current page
// function displayUsers(users) {
//   // Clear previous user cards
//   userList.innerHTML = '';

//   // Loop through users and create user cards
//   users.forEach(user => {
//     const card = document.createElement('div');
//     card.classList.add('userCard');
//     card.innerHTML = `
//       <h3>${user.name}</h3>
//       <p>Domain: ${user.domain}</p>
//       <p>Gender: ${user.gender}</p>
//       <p>Availability: ${user.availability}</p>
//       <input type="checkbox" data-id="${user.id}">
//     `;
//     const checkbox = card.querySelector('input[type="checkbox"]');
//     checkbox.addEventListener('change', () => {
//       user.selected = checkbox.checked;
//     });
//     userList.appendChild(card);
//   });
// }

// // Function to display pagination links
// function displayPagination() {
//   // Clear previous pagination links
//   pagination.innerHTML = '';

//   // Calculate total number of pages
//   const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

//   // Create pagination links
//   for (let page = 1; page <= totalPages; page++) {
//     const link = document.createElement('a');
//     link.href = '#';
//     link.textContent = page;

//     // Set active class for the current page
//     if (page === currentPage) {
//       link.classList.add('active');
//     }

//     // Add event listener for page click
//     link.addEventListener('click', () => {
//       // Remove active class from previous active link
//       const prevActiveLink = document.querySelector('.pagination a.active');
//       if (prevActiveLink) {
//         prevActiveLink.classList.remove('active');
//       }

//       // Set active class for the clicked link
//       link.classList.add('active');

//       // Update currentpage and display users for the clicked page
//       currentPage = page;
//       displayUsers(getUsersForCurrentPage());
//     });

//     pagination.appendChild(link);
//   }
// }

// // Event listeners for filters
// searchInput.addEventListener('input', applyFilters);
// domainFilter.addEventListener('change', applyFilters);
// genderFilter.addEventListener('change', applyFilters);
// availabilityFilter.addEventListener('change', applyFilters);

// // Event listener for Create Team button
// createTeamBtn.addEventListener('click', () => {
//   updateTeamDetails();
// });

// // Initial display of users and pagination links
// applyFilters();
// // Function to fetch user data from the backend API
// function fetchUsers() {
//   fetch('/api/users')
//     .then(response => response.json())
//     .then(data => {
//       users = data; // Update the users array with the fetched data
//       applyFilters(); // Apply filters to display the fetched users
//     })
//     .catch(error => {
//       console.error('Error fetching users:', error);
//     });
// }

// // Initial fetch of user data
// fetchUsers();




// Fetch user data from backend API
fetch('mongodb://localhost:27017/project')
  .then(response => response.json())
  .then(users => {
    // Initial data
    let searchTerm = '';
    let selectedDomain = '';
    let selectedGender = '';
    let selectedAvailability = '';
    let currentPage = 1;
    let filteredUsers = [];

    // Apply filters on the user data
    function applyFilters() {
      searchTerm = searchInput.value.toLowerCase();
      selectedDomain = domainFilter.value;
      selectedGender = genderFilter.value;
      selectedAvailability = availabilityFilter.value;

      filteredUsers = users.filter(user => {
        const nameMatch = user.name.toLowerCase().includes(searchTerm);
        const domainMatch = selectedDomain === '' || user.domain === selectedDomain;
        const genderMatch = selectedGender === '' || user.gender === selectedGender;
        const availabilityMatch = selectedAvailability === '' || user.availability === selectedAvailability;
        return nameMatch && domainMatch && genderMatch && availabilityMatch;
      });

      currentPage = 1;
      displayUsers(getUsersForCurrentPage());
      displayPagination();
    }

    // Get users to display for the current page
    function getUsersForCurrentPage() {
      const startIndex = (currentPage - 1) * 20;
      const endIndex = startIndex + 20;
      return filteredUsers.slice(startIndex, endIndex);
    }

    // Update team details
    function updateTeamDetails() {
      teamDetails.innerHTML = '';

      const selectedUsers = filteredUsers.filter(user => user.selected);

      selectedUsers.forEach(user => {
        const userDetail = document.createElement('div');
        userDetail.innerHTML = `
          <h3>${user.name}</h3>
          <p>Domain: ${user.domain}</p>
          <p>Gender: ${user.gender}</p>
          <p>Availability: ${user.availability}</p>
        `;
        teamDetails.appendChild(userDetail);
      });
    }

    // Display users for the current page
    function displayUsers(users) {
      userList.innerHTML = '';

      users.forEach(user => {
        const card = document.createElement('div');
        card.classList.add('userCard');
        card.innerHTML = `
          <h3>${user.name}</h3>
          <p>Domain: ${user.domain}</p>
          <p>Gender: ${user.gender}</p>
          <p>Availability: ${user.availability}</p>
          <input type="checkbox" data-id="${user.id}">
        `;
        const checkbox = card.querySelector('input[type="checkbox"]');
        checkbox.addEventListener('change', () => {
          user.selected = checkbox.checked;
        });
        userList.appendChild(card);
      });
    }

    // Display pagination links
    function displayPagination() {
      pagination.innerHTML = '';

      const totalPages = Math.ceil(filteredUsers.length / 20);

      for (let page = 1; page <= totalPages; page++) {
        const link = document.createElement('a');
        link.href = '#';
        link.textContent = page;

        if (page === currentPage) {
          link.classList.add('active');
        }

        link.addEventListener('click', () => {
          const prevActiveLink = document.querySelector('.pagination a.active');
          if (prevActiveLink) {
            prevActiveLink.classList.remove('active');
          }

          link.classList.add('active');

          currentPage = page;
          displayUsers(getUsersForCurrentPage());
        });

        pagination.appendChild(link);
      }
    }

    // Event listeners for filters
    searchInput.addEventListener('input', applyFilters);
    domainFilter.addEventListener('change', applyFilters);
    genderFilter.addEventListener('change', applyFilters);
    availabilityFilter.addEventListener('change', applyFilters);

    // Event listener for Create Team button
    createTeamBtn.addEventListener('click', () => {
      updateTeamDetails();
    });

    // Initial display of users and pagination links
    applyFilters();
  });
