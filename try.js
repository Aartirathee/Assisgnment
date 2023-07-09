
// Fetch user data from backend API
fetch('mongodb://localhost:27017/project/api/user')
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
