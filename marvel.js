let showMarvel = document.getElementById("marvelInfo")
 let date = new Date();
 console.log(date.getTime());
 let ts = "1732648276429";
 let publicKey = "22c3f1c78613492efe9236cf821f363e";
let hashVal = "f780ee3106f11e8941631f9c4b467473";
 const [timestamp, apiKey, hashValue] = [ts, publicKey, hashVal]

 const url = `https://gateway.marvel.com:443/v1/public/characters?ts=${timestamp}&apikey=${apiKey}&hash=${hashValue}`;
 //showMarvel.innerHTML = "";

// Select the root element in the HTML where we will append our content
const app = document.getElementById('marvelInfo');

// Create an image element for the logo and set its source


// Create a container div to hold the movie cards, set its class for styling
const container = document.createElement('div');
container.setAttribute('class', 'container');



app.appendChild(container);

async function CallingJson()
{
    try {
        
        const response = await fetch(url);
        const result = await response.json();
        result.data.results.forEach((character) => 
        {
            // const info = `
            
            // <div>${element.name}</div>
            // <img src="${element.thumbnail.path}.${element.thumbnail.extension}" alt="${element.name}" />
            // <div>${element.id}</div>
            // `;
            // showMarvel.innerHTML += info;
            const card = document.createElement('div');
            card.setAttribute('class', 'card');
            const image = document.createElement('img');
            image.src = character.thumbnail.path + '.' + character.thumbnail.extension;
            image.setAttribute('alt', `${character.name} Poster`);
            card.appendChild(image);

            // Add title
            const h1 = document.createElement('h1');
            h1.textContent = character.name;
            card.appendChild(h1);
            // Add movie image

    
            container.appendChild(card);
            console.log(result);
            });
  
    } catch (error) {
        
        console.error(error);
    }

}
CallingJson();

