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

// Event Listener to get brewery data and display on the page
function findCountry(e){
    e.preventDefault(); // will prevent the page from refreshing with form data as query params
    // console.log(e);
    // Get the value from the city input
    let countryName = document.getElementById('countryInput')?.value;
    
    // Build the URL for the API request
    const url = ` https://restcountries.com/v3.1/name/${countryName}`
    console.log(url);

    // Make the HTTP get request to the above url and log the data
    fetch(url)
        .then( res => res.json() )
        .then( data => displayCountry(data) )
        .catch( err => console.error(err) )

}

// Callback function for findBreweries that will accept brewery data and insert into the display table
function displayCountry(data){
    // Get the table from the HTML
    let table = document.getElementById('brewery-table');

    // Clear out the table of any current data
    table.innerHTML = '';
    // Remove any previous or next buttons
    let breweryButtons = document.querySelectorAll('.prev-next-btn');
    for (let btn of breweryButtons){
        btn.remove()
    }

    if (!data.length){
        table.innerHTML = '<h1>Country Not Found</h1>'
        return
    }

    // Set up table headers
    const thead = document.createElement('thead');
    table.append(thead); // Add the thead as a child to the table
    let tr = document.createElement('tr');
    thead.append(tr); // add the table row as a child the table header
    const tableHeadings = ['Name', 'Type', 'Street Address', 'Address 2', 'Address 3', 'City', 'State'];
    tableHeadings.forEach( heading => {
        let th = document.createElement('th');
        th.scope = 'col';
        th.innerHTML = heading;
        tr.append(th)
    } );

    // Create the table body and populate with brewery data
    let tbody = document.createElement('tbody');
    table.append(tbody);

    // Write a row for each brewery in data
    for (let brewery of data){
        let tr = document.createElement('tr');
        tbody.append(tr);

        newDataCell(tr, `<a href=${brewery.website_url} target="_blank">${brewery.name}</a>`)
        newDataCell(tr, brewery.brewery_type);
        newDataCell(tr, brewery.street);
        newDataCell(tr, brewery.address_2);
        newDataCell(tr, brewery.address_3);
        newDataCell(tr, brewery.city);
        newDataCell(tr, brewery.state);
    }

    // Add a next button if there are 10 breweries in the current data array
    if (data.length === 10){
        let nextButton = document.createElement('button');
        nextButton.classList.add('prev-next-btn', 'btn', 'btn-primary');
        nextButton.innerHTML = 'Next';
        nextButton.addEventListener('click', e => findBreweries(e, pageNumber + 1))
        table.after(nextButton);
    }

    // Add a prev button if the pageNumber > 1
    if (pageNumber > 1){
        let prevButton = document.createElement('button');
        prevButton.classList.add('prev-next-btn', 'btn', 'btn-danger');
        prevButton.innerHTML = 'Prev';
        prevButton.addEventListener('click', e => findBreweries(e, pageNumber - 1))
        table.after(prevButton);
    }

}