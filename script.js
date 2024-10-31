const API_URL = 'https://restcountries.com/v3.1/all';
let countries = [];
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

// Fetch all countries initially
async function fetchCountries() {
    const response = await fetch(API_URL);
    countries = await response.json();
    displayCountries(countries.slice(0, 20));
}

// Display countries on the main page
function displayCountries(countryList) {
    const countryListEl = document.getElementById('country-list');
    countryListEl.innerHTML = '';
    countryList.forEach(country => {
        const card = document.createElement('div');
        card.className = 'country-card';
        card.innerHTML = `
            <img src="${country.flags.svg}" alt="Flag of ${country.name.common}">
            <p>${country.name.common}</p>
        `;
        card.onclick = () => showDetails(country);
        countryListEl.appendChild(card);
    });
}

// Search and filter countries
function handleSearch() {
    const query = document.getElementById('search-bar').value.toLowerCase();
    const filteredCountries = countries.filter(country =>
        country.name.common.toLowerCase().includes(query)
    );
    displayCountries(filteredCountries.slice(0, 20));
}

// Load more countries
let currentPage = 1;
function loadMore() {
    currentPage++;
    const nextCountries = countries.slice(currentPage * 20, (currentPage + 1) * 20);
    displayCountries(nextCountries);
}

// Show country details
function showDetails(country) {
    localStorage.setItem('selectedCountry', JSON.stringify(country));
    window.location.href = 'details.html';
}

// Display country details on details page
function displayCountryDetails() {
    const country = JSON.parse(localStorage.getItem('selectedCountry'));
    const detailsEl = document.getElementById('country-details');
    detailsEl.innerHTML = `
        <h1>${country.name.common}</h1>
        <img src="${country.flags.svg}" alt="Flag of ${country.name.common}">
        <p>Capital: ${country.capital}</p>
        <p>Region: ${country.region}</p>
        <p>Population: ${country.population}</p>
        <p>Area: ${country.area} km²</p>
        <p>Languages: ${Object.values(country.languages || {}).join(', ')}</p>
        <button onclick="toggleFavorite('${country.name.common}')">Toggle Favorite</button>
    `;
}

// Manage favorites
function toggleFavorite(countryName) {
    if (favorites.includes(countryName)) {
        favorites = favorites.filter(name => name !== countryName);
    } else if (favorites.length < 5) {
        favorites.push(countryName);
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
    updateFavorites();
}

// Update favorites section
function updateFavorites() {
    const favoriteListEl = document.getElementById('favorite-list');
    favoriteListEl.innerHTML = '';
    favorites.forEach(countryName => {
        const li = document.createElement('li');
        li.textContent = countryName;
        favoriteListEl.appendChild(li);
    });
}

// Initialize the app
window.onload = () => {
    if (window.location.pathname.includes('details.html')) {
        displayCountryDetails();
    } else {
        fetchCountries();
    }
  }
  const countryList = document.getElementById('country-list');
  const showMoreButton = document.getElementById('show-more');
  const searchBar = document.getElementById('search-bar');
  const favoritesList = document.getElementById('favorites-list');
  
  let countrie = [];
  let currentIndex = 0;
  const pageSize = 6;
  
  // Fetch country data
  async function fetchCountries() {
      try {
          const response = await fetch('https://restcountries.com/v3.1/all');
          const data = await response.json();
          countries = data;
          displayCountries(); // Display initial set of countries
      } catch (error) {
          console.error("Failed to fetch countries:", error);
      }
  }
  
  // Display countries in #country-list
  function displayCountries() {
      const endIndex = Math.min(currentIndex + pageSize, countries.length);
      for (let i = currentIndex; i < endIndex; i++) {
          const country = countries[i];
          
          // Create a country card
          const countryCard = document.createElement('div');
          countryCard.className = 'country-card';
          
          countryCard.innerHTML = `
              <h3>${country.name.common}</h3>
              <img src="${country.flags.png}" alt="${country.name.common} flag">
              <p>Capital: ${country.capital ? country.capital[0] : 'N/A'}</p>
              <p>Region: ${country.region}</p>
              <p>Population: ${country.population.toLocaleString()}</p>
          `;
          
          // Add event listener for favorites
          const favoriteButton = document.createElement('button');
          favoriteButton.textContent = "Add to Favorites";
          favoriteButton.onclick = () => addToFavorites(country);
          countryCard.appendChild(favoriteButton);
  
          countryList.appendChild(countryCard);
      }
      currentIndex = endIndex;
      
      // Hide "Show More" button if all countries are displayed
      if (currentIndex >= countries.length) {
          showMoreButton.style.display = 'none';
      }
  }
  
  // Add a country to favorites
  function addToFavorites(country) {
      const favoriteItem = document.createElement('li');
      favoriteItem.textContent = country.name.common;
      favoritesList.appendChild(favoriteItem);
  }
  
  // Show more countries when "Show More" button is clicked
  showMoreButton.addEventListener('click', displayCountries);
  
  // Search functionality
  searchBar.addEventListener('input', (event) => {
      const query = event.target.value.toLowerCase();
      const filteredCountries = countries.filter(country => 
          country.name.common.toLowerCase().includes(query)
      );
      countryList.innerHTML = ''; // Clear current display
      currentIndex = 0;
      countries = filteredCountries; // Update the country list with the filtered results
      displayCountries();
  });
  
  // Initialize fetching and displaying countries
  fetchCountries();
  