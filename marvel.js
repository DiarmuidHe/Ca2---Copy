let showMarvel = document.getElementById("marvelInfo")
 let date = new Date();
 console.log(date.getTime());
 const loadingIndicator = document.getElementById("loading");
 let ts = "1732648276429";
 let publicKey = "22c3f1c78613492efe9236cf821f363e";
let hashVal = "f780ee3106f11e8941631f9c4b467473";
 const [timestamp, apiKey, hashValue] = [ts, publicKey, hashVal]
const ids =       [1009368,   1009220    ,1009664,1009351,1009189,1009282  ,1009187  ,1009610,1010801,1010338  ]
const character = ["IronMan","CapAmerica","Thor" ,"hulk" ,"Widow","strange","Panther","Spider","Ant" , "Marvel"]
  //showMarvel.innerHTML = "";

// Select the root element in the HTML where we will append our content
const app = document.getElementById('marvelInfo');

// Create an image element for the logo and set its source


// Create a container div to hold the movie cards, set its class for styling
const container = document.createElement('div');
container.setAttribute('class', 'container');



app.appendChild(container);

async function Display()
{

        

        
    loadingIndicator.style.display = "block";
    for (const id of ids)
    {
        const character = await CallingJson(id);
        
        if(character)
        {
            const card = document.createElement('div');
            card.setAttribute('class', 'card');
            const image = document.createElement('img');
            image.src = character.image;
            image.setAttribute('alt', `${character.name} Poster`);
            card.appendChild(image);
            const h1 = document.createElement('h1');
            h1.textContent = character.name;
            card.appendChild(h1);
            const button = document.createElement('button');
            
            button.textContent  = `search`;
            card.appendChild(button);
    
            container.appendChild(card);
        }
        
    }
    loadingIndicator.style.display = "none";

        


    // result.data.results.forEach((character) => 
    // {
    //     // const info = `
        
    //     // <div>${element.name}</div>
    //     // <img src="${element.thumbnail.path}.${element.thumbnail.extension}" alt="${element.name}" />
    //     // <div>${element.id}</div>
    //     // `;
    //     // showMarvel.innerHTML += info;
    //     const card = document.createElement('div');
    //     card.setAttribute('class', 'card');
    //     const image = document.createElement('img');
    //     image.src = character.thumbnail.path + '.' + character.thumbnail.extension;
    //     image.setAttribute('alt', `${character.name} Poster`);
    //     card.appendChild(image);

        
    //     const h1 = document.createElement('h1');
    //     h1.textContent = character.name;
    //     card.appendChild(h1);
        


    //     container.appendChild(card);
    //     console.log(result);
    //     });
  

}
Display();


async function CallingJson(id) {
    try {
        
        //We need to provide the stock symbol and the region
        const response = await fetch(`https://gateway.marvel.com:443/v1/public/characters/${id}?ts=${timestamp}&apikey=${apiKey}&hash=${hashValue}`);

        if (!response.ok) {
            throw new Error(`HTTP Error ${response.status}: Unable to fetch data for ${id}`);
        }

        const result = await response.json();
        const character = result.data.results[0]
        // const scores = (data.finance && data.finance.result && data.finance.result.scores) || null;
        // if (!scores) {
        //     throw new Error(`Malformed data for ${symbol}: Missing scores`);
        // }
        //If scores.symbol is false, undefined or an empty string set 
        //symbolName to N/A - this is useful for error handling
        const name = character.name || "N/A";
        const image = character.thumbnail.path + '.' + character.thumbnail.extension || "N/A";
        const description = character.description || "N/A";
        return { name, image};
    } catch (error) {
        console.error(`Error fetching data for ${id}:`, error.message);
        return null; // Graceful handling of errors
    }
}

// async function renderStocks() {
//     stockTableBody.innerHTML = ""; // Clear existing rows
//     loadingIndicator.style.display = "block"; // Show loading indicator

//     for (const symbol of stocks) {
//         const stock = await fetchStockData(symbol);
//         if (stock) {
//             const row = document.createElement("tr");
//             row.innerHTML = `
//                 <td>${stock.symbolName}</td>
//                 <td>${stock.sector}</td>
//                 <td>${stock.overallScore}</td>
//                 <td>${stock.valuationDescription}</td>
//                 <td>${stock.hiringDirection}</td>
//                 <td>${stock.dividendYield}</td>
//             `;
//             stockTableBody.appendChild(row);
//         }
//     }

//     loadingIndicator.style.display = "none"; // Hide loading indicator
// }

