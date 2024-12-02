let showMarvel = document.getElementById("marvelInfo")
 let date = new Date();
 console.log(date.getTime());
 let ts = "1732648276429";
 let publicKey = "22c3f1c78613492efe9236cf821f363e";
let hashVal = "f780ee3106f11e8941631f9c4b467473";
 const [timestamp, apiKey, hashValue] = [ts, publicKey, hashVal]

 const url = `https://gateway.marvel.com:443/v1/public/characters?ts=${timestamp}&apikey=${apiKey}&hash=${hashValue}`;
 showMarvel.innerHTML = "";

async function CallingJson()
{
    try {
        
        const response = await fetch(url);
        const result = await response.json();
        result.data.results.forEach((element) => {
        const info = `
        
        <div>${element.name}</div>
        <img src="${element.thumbnail.path}.${element.thumbnail.extension}" alt="${element.name}" />
        <div>${element.id}</div>
        `;
        showMarvel.innerHTML += info;
        });
        console.log(result);
    } catch (error) {
        
        console.error(error);
    }

}
CallingJson();

