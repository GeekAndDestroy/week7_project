console.log('Hello World')

// Call the pageLoader function to load the page
pageLoader();


// Function to set up all of the event listeners
function pageLoader(){
    console.log('Setting up the page...')

    // Get the find country form and add submit event listener
    let findCountriesForm = document.getElementById('find-country-form');
    findCountriesForm.addEventListener('submit', e => findCountry(e));

}

// Event Listener to get country data and display on the page
function findCountry(e){
    e.preventDefault(); // will prevent the page from refreshing with form data as query params
    // console.log(e);
    // Get the value from the city input
    let countryName = document.getElementById('countryInput')?.value;
    
    // Build the URL for the API request
    const url = `https://restcountries.com/v3.1/name/${countryName}`
    console.log(url);

    // Make the HTTP get request to the above url and log the data
    fetch(url)
        .then( res => res.json() )
        .then( data => displayCountry(data) )
        .catch( err => console.error(err) )

}


// Callback function for findCountry that will accept country data and insert into a formatted container
function displayCountry(data){
    if (Array.isArray(data) && data.length > 0) {
        const country = data[0]; 

        // Remove the existing country information
        const existingCountryContainer = document.querySelector('.country-info');
        if (existingCountryContainer) {
            existingCountryContainer.remove();
        }

        // Update favicon to display the flag of the country
        const favicon = document.querySelector('link[rel="icon"]');
        if (favicon) {
            favicon.href = country.flags.svg; 
        } else {
            const newFavicon = document.createElement('link');
            newFavicon.rel = 'icon';
            newFavicon.href = country.flags.svg;
            document.head.appendChild(newFavicon);
        }
    
        // Create a container div to hold the country information
        const countryContainer = document.createElement('div');
        countryContainer.classList.add('container-fluid', 'country-info', 'justify-content-center', 'd-flex');

        // Create a row div to hold the country information
        const countryRow = document.createElement('div');
        countryRow.classList.add('row', 'justify-content-center');

        // Create a column div to hold the country information
        const countryColumn = document.createElement('div');
        countryColumn.classList.add('col-6', 'info');

        // Create heading for country name
        const countryNameHeading = document.createElement('h1');
        countryNameHeading.textContent = country.name.common;
        countryColumn.appendChild(countryNameHeading);

        // Create IMG for country flag
        const flagImg = document.createElement('img');
        flagImg.src = country.flags.svg;
        flagImg.alt = 'Flag of ' + country.name.common;
        flagImg.id = 'countryFlag';
        countryColumn.appendChild(flagImg);

        // Create paragraph for official name
        const officialNameParagraph = document.createElement('p');
        officialNameParagraph.textContent = `Official Name: ${country.name.official}`;
        countryColumn.appendChild(officialNameParagraph);

        // Create paragraph for capital
        const capitalParagraph = document.createElement('p');
        capitalParagraph.textContent = `Capital: ${country.capital[0]}`;
        countryColumn.appendChild(capitalParagraph);

        // Create paragraph for official currency types
        const currenciesHeading = document.createElement('h3');
        currenciesHeading.textContent = 'Official Currency Types:';
        countryColumn.appendChild(currenciesHeading);
        const currenciesList = document.createElement('ul');
        for (const currencyCode in country.currencies) {
            const currencyItem = document.createElement('li');
            currencyItem.textContent = `${country.currencies[currencyCode].name} (${currencyCode})`;
            currenciesList.appendChild(currencyItem);
        }
        countryColumn.appendChild(currenciesList);

        // Create paragraph for languages
        const languagesHeading = document.createElement('h3');
        languagesHeading.textContent = 'Languages:';
        countryColumn.appendChild(languagesHeading);
        const languagesList = document.createElement('ul');
        for (const languageCode in country.languages) {
            const languageItem = document.createElement('li');
            languageItem.textContent = `${country.languages[languageCode]} (${languageCode})`;
            languagesList.appendChild(languageItem);
        }
        countryColumn.appendChild(languagesList);

        // Create IMG for country coat of arms
        if (country.coatOfArms && country.coatOfArms.svg) {
            const coatOfArmsImg = document.createElement('img');
            coatOfArmsImg.src = country.coatOfArms.svg;
            coatOfArmsImg.alt = 'Coat of Arms of ' + country.name.common;
            coatOfArmsImg.id = 'coa';
            countryColumn.appendChild(coatOfArmsImg);
        }

        // Create button to open Google Maps
        const mapButton = document.createElement('button');
        mapButton.textContent = 'View on Google Maps';
        mapButton.classList.add('btn', 'btn-warning', 'mt-3', 'map-button');
        mapButton.addEventListener('click', () => {
            // Open Google Maps with the country's capital location
            window.open(`https://www.google.com/maps/place/${country.capital[0]}`, '_blank');
        });
        countryColumn.appendChild(mapButton);

        // Append the column to the row
        countryRow.appendChild(countryColumn);

        // Append the row to the country container
        countryContainer.appendChild(countryRow);

        // Append the country container to the main section of your HTML
        const mainSection = document.querySelector('main');
        mainSection.appendChild(countryContainer);
    } else {
        console.error('No country data found.');

        // Remove the existing country information
        const existingCountryContainer = document.querySelector('.country-info');
        if (existingCountryContainer) {
            existingCountryContainer.remove();
        }

        // Create a container div to hold the text
        const countryContainer = document.createElement('div');
        countryContainer.classList.add('container-fluid', 'country-info', 'justify-content-center', 'd-flex');

        // Create a row div to hold the information
        const countryRow = document.createElement('div');
        countryRow.classList.add('row');

        // Create a column div to hold the information
        const countryColumn = document.createElement('div');
        countryColumn.classList.add('col', 'info');

        // Create heading for 'not found'
        const countryNameHeading = document.createElement('h1');
        countryNameHeading.textContent = 'Country not found.';
        countryColumn.appendChild(countryNameHeading);

        // Append the column to the row
        countryRow.appendChild(countryColumn);

        // Append the row to the country container
        countryContainer.appendChild(countryRow);

        // Append the country container to the main section of your HTML
        const mainSection = document.querySelector('main');
        mainSection.appendChild(countryContainer);
    }
}