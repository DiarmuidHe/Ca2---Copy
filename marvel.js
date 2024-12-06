
// Get the current date and log its timestamp
let date = new Date();
console.log(date.getTime());

// Grab the loading spinner element so we can show it while data is being loaded
const loadingIndicator = document.getElementById("loading");

// Marvel API credentials
let ts = "1732648276429"; // A timestamp
let publicKey = "22c3f1c78613492efe9236cf821f363e"; // Your public API key
let hashVal = "f780ee3106f11e8941631f9c4b467473"; // A precomputed hash for the API call

// Bundle the credentials for easy use later
const [timestamp, apiKey, hashValue] = [ts, publicKey, hashVal];

// A list of Marvel character IDs to fetch from the API
const ids = [1009368, 1009220, 1009664, 1009351, 1009189, 1009282, 1009187, 1009610, 1010801];

// Get the main section in the HTML where all the character cards will go
const app = document.getElementById('marvelInfo');

// Create a container to hold all the character cards
const container = document.createElement('div');
container.setAttribute('class', 'container');

// Add the container to the main section
app.appendChild(container);

const charDisplay = document.getElementById('showChar');
charDisplay.addEventListener("click",DisplayChar);

const seriesDisplay = document.getElementById('showSeries');
seriesDisplay.addEventListener("click",DisplaySeries);
// Function to fetch and display characters
async function DisplayChar() {
    // Show the loading spinner
    loadingIndicator.innerHTML = 'Loading data...';
    loadingIndicator.style.display = "block";
    container.innerHTML = "";
    // Go through each character ID
    for (const id of ids) {
        
        // Get character details from the API
        const character = await CallingCharacterJson(id);

        // If we got valid data, create a card for this character
        if (character) {
            const card = document.createElement('div');
            card.setAttribute('class', 'card');

            // Add the character's image to the card
            const image = document.createElement('img');
            image.src = character.image;
            image.setAttribute('alt', `${character.name} icon`);
            image.setAttribute('class', 'iconImage');
            card.appendChild(image);

            // Add the character's name
            const h1 = document.createElement('h1');
            h1.textContent = character.name;
            card.appendChild(h1);

            // Add the character's description
            const p = document.createElement('p');
            p.textContent = character.description;
            card.appendChild(p);

            // Add a button to show this character's comics
            const button = `<button onclick='ComicDisplay(${JSON.stringify(character.comicInfo)},${id})'>Comics</button>`;
            card.innerHTML += button;

            // Add a hidden section to display comics for this character later
            const div = `<div class="allComics" id="comic-${id}"></div>`;
            card.innerHTML += div;

            // Add the completed card to the container
            container.appendChild(card);
        }
    }

    // Hide the loading spinner once everything is loaded
    loadingIndicator.style.display = "none";
}
async function DisplaySeries() {
    // Show the loading spinner
    loadingIndicator.innerHTML = 'Loading data...';
    loadingIndicator.style.display = "block";

    //fetch series endpoint
    const response = await fetch(`https://gateway.marvel.com:443/v1/public/series?ts=${timestamp}&apikey=${apiKey}&hash=${hashValue}`);
    const result = await response.json();
    container.innerHTML = "";

    result.data.results.forEach(series => 
    {
        
        
        const card = document.createElement('div');
        card.setAttribute('class', 'card');

        // Add the character's image to the card
        const image = document.createElement('img');
        image.src = series.thumbnail.path + '.' + series.thumbnail.extension || "N/A";
        image.setAttribute('alt', `${series.title} icon`);
        image.setAttribute('class', 'comicImage');
        card.appendChild(image);

        // Add the character's name
        const h1 = document.createElement('h1');
        h1.textContent = series.title;
        card.appendChild(h1);

        // Add the completed card to the container
        container.appendChild(card);

    });
    

    // Hide the loading spinner once everything is loaded
    loadingIndicator.style.display = "none";
}
// Start the display process

// Function to show comics for a character
async function ComicDisplay(comicInfo, id) {
    // Clear out comics for all characters before showing new ones
    const allComics = document.getElementsByClassName('allComics');
    for (const comicClass of allComics) {
        comicClass.innerHTML = " ";
    }

    // Go through each comic for the selected character
    for (const element of comicInfo) {
        // Get comic details from the API
        const comic = await CallingComicJson(element.resourceURI);

        // Find the section for this character's comics
        const comicHolder = document.getElementById(`comic-${id}`);

        // Add the comic image to the character's comics section
        const image = document.createElement('img');
        image.src = comic.image;
        image.setAttribute('alt', `${comic.title} Poster`);
        image.setAttribute('class', 'comicImage');
        comicHolder.appendChild(image);
    }
}

// Function to fetch details about a character
async function CallingCharacterJson(id) {
    try {
        // Make an API call to get character data
        const response = await fetch(`https://gateway.marvel.com:443/v1/public/characters/${id}?ts=${timestamp}&apikey=${apiKey}&hash=${hashValue}`);

        // Check if the response was successful
        if (!response.ok) {
            throw new Error(`HTTP Error ${response.status}: Unable to fetch data for ${id}`);
        }

        // Parse the response data
        const result = await response.json();
        const character = result.data.results[0];

        // Get the character's name, image, description, and comic list
        const name = character.name || "N/A";
        const image = character.thumbnail.path + '.' + character.thumbnail.extension || "N/A";
        const description = character.description || "N/A";
        const comicInfo = character.comics.items;

        // Return the character's details
        return { name, image, description, comicInfo };
    } catch (error) {
        // Log any errors that occur
        console.error(`Error fetching data for ${id}:`, error.message);
        return null;
    }
}

// Function to fetch details about a comic
async function CallingComicJson(comicUrl) {
    try {
        // Make an API call to get comic data
        const response = await fetch(`${comicUrl}?ts=${timestamp}&apikey=${apiKey}&hash=${hashValue}`);

        // Check if the response was successful
        if (!response.ok) {
            throw new Error(`HTTP Error ${response.status}: Unable to fetch data for ${comicUrl}`);
        }

        // Parse the response data
        const result = await response.json();

        // Get the comic's title and image
        const comic = result.data.results[0] || "N/A";
        const title = comic.title || "N/A";
        const image = comic.thumbnail.path + '.' + comic.thumbnail.extension || "N/A";

        // Return the comic's details
        return { title, image };
    } catch (error) {
        // Log any errors that occur
        console.error(`Error fetching data for ${comicUrl}:`, error.message);
        return null;
    }
}
