# Country Explorer

Country Explorer is a web application that allows users to search for and explore information about different countries. Users can search for countries, add them to a favorites list, and view additional information for each country. This project utilizes HTML, CSS, and JavaScript, and fetches data from the REST Countries API.

## Project Structure


## Features

- **Country Search**: Search for a country by name.
- **Country Display**: Displays a list of countries in a responsive grid layout.
- **Favorites**: Users can add countries to their favorites list.
- **Show More Button**: Loads additional countries in batches.

## Setup Instructions

1. Clone the repository to your local machine:
    ```bash
    https://github.com/vidhyassamuel/Country-Details.git
    cd Country-Explorer
    ```
## Usage

1. **Search for a Country**: Use the search bar at the top of the page to find a specific country.
2. **View More Countries**: Click the "Show More" button to load more countries.
3. **Add to Favorites**: Click on a country card to add it to your favorites list on the right side of the page.

## Dependencies

This project only requires a modern web browser (Chrome, Firefox, Safari, Edge) to run. No additional libraries or dependencies are needed.

## Design Decisions

- **Responsive Layout**: Uses a responsive CSS grid to ensure the app looks good on various screen sizes.
- **Favorites Section**: A simple favorites list implementation displays selected countries.
- **Data Fetching**: Utilizes the REST Countries API for dynamic and up-to-date country data.
  
## System-Specific Dependencies or Limitations

- The application is designed to be OS-independent and should work across Windows, macOS, and Linux. 
- Requires an active internet connection to fetch country data from the API.

## Known Issues

- Favorites are not persisted across sessions, as they are not saved to local storage or a backend.
- Only basic error handling is implemented. Network errors may cause data loading issues without detailed feedback.


## Author
vidhya(https://github.com/vidhyassamuel/Country-Details.git)  

