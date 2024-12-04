let showMarvel = document.getElementById("marvelInfo")
 let date = new Date();
 console.log(date.getTime());
 const loadingIndicator = document.getElementById("loading");
 let ts = "1732648276429";
 let publicKey = "22c3f1c78613492efe9236cf821f363e";
let hashVal = "f780ee3106f11e8941631f9c4b467473";
 const [timestamp, apiKey, hashValue] = [ts, publicKey, hashVal]
 //,1009664,1009351,1009189,1009282  ,1009187  ,1009610,1010801,1010338
const ids =       [1009368,   1009220,1009664,1009351,1009189,1009282  ,1009187  ,1009610,1010801,1010338]
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
            image.setAttribute('alt', `${character.name} icon`);
            image.setAttribute('class','iconImage');
            card.appendChild(image);
            const h1 = document.createElement('h1');
            h1.textContent = character.name;
            card.appendChild(h1);
            const p = document.createElement('p');
            p.textContent = character.description;
            card.appendChild(p);
            
            const button = `<button onclick='ComicDisplay(${JSON.stringify(character.comicInfo)},${id})'>Comics</button>`;
            card.innerHTML += button;
            

            const div = `<div class="allComics" id="comic-${id}"></div>`;
            card.innerHTML += div;

            
            container.appendChild(card);
            

        }
        
    }
    loadingIndicator.style.display = "none";

}
Display();

async function ComicDisplay(comicInfo,id)
{
    const allComics = document.getElementsByClassName('allComics');
    for(const comicClass of allComics){
        comicClass.innerHTML = " ";
    }
    for(const element of comicInfo)
    {
        const comic = await CallingComicJson(element.resourceURI);
        console.log(id)
        
        const comicHolder = document.getElementById(`comic-${id}`);
        const image = document.createElement('img');
        image.src = comic.image;
        image.setAttribute('alt', `${character.title} Poster`);
        image.setAttribute('class','comicImage');
        comicHolder.appendChild(image)
    }
    // comicInfo.forEach(element => {
        
    // });
    
}
async function CallingJson(id) {
    


    try {
        
        
        const response = await fetch(`https://gateway.marvel.com:443/v1/public/characters/${id}?ts=${timestamp}&apikey=${apiKey}&hash=${hashValue}`);

        if (!response.ok) {
            throw new Error(`HTTP Error ${response.status}: Unable to fetch data for ${id}`);
        }

        const result = await response.json();
        const character = result.data.results[0];

        const name = character.name || "N/A";
        const image = character.thumbnail.path + '.' + character.thumbnail.extension || "N/A";
        const description = character.description || "N/A";
        
        const comicInfo = character.comics.items;
        
        return { name, image, description, comicInfo};
    } catch (error) {
        console.error(`Error fetching data for ${id}:`, error.message);
        return null; 
    }
}
async function CallingComicJson(comicUrl) 
{
    try {
        

        const response = await fetch(`${comicUrl}?ts=${timestamp}&apikey=${apiKey}&hash=${hashValue}`);


        if (!response.ok) {
            throw new Error(`HTTP Error ${response.status}: Unable to fetch data for ${id}`);
        }

        const result = await response.json();
        
        const comic = result.data.results[0];
        const title = comic.title || "N/A";
        const image = comic.thumbnail.path + '.' + comic.thumbnail.extension || "N/A";

        console.log(result);
        return {title, image };
    } catch (error) {
        console.error(`Error fetching data for ${comicUrl}:`, error.message);
        return null; 
    }
}



