const accessKey = "lFT3WEYm2cCNvEub1JX3j5TMSeMpAXivtLcAGvnoksk";
const formEl = document.querySelector("form");
const searchInputEl = document.getElementById("search-input");
const searchResultsEl = document.querySelector(".search-results");
const showMoreButtonEl= document.getElementById("show-more-button");

let inputData = "";
let page = 1;

async function searchImages() {
    inputData = searchInputEl.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;
    console.log(url);
    const response=await fetch(url)
    const data= await response.json();
    if (page==1) {
        searchResultsEl.innerHTML="";
    }
    const results=data.results;
    results.map((result) => {
        // Créez un élément div pour envelopper l'image
        const imageWrapper = document.createElement("div");
        // Ajoutez la classe "search-result" à l'élément div
        imageWrapper.classList.add("search-result");
        
        // Créez un élément img pour afficher l'image
        const image = document.createElement("img");
        // Définissez la source de l'image en utilisant l'URL de l'image dans les résultats
        image.src = result.urls.small;
        // Définissez le texte alternatif de l'image en utilisant la description alternative de l'image dans les résultats
        image.alt = result.alt_description;
        
        // Créez un élément a (lien) pour envelopper l'image
        const imageLink = document.createElement("a");
        // Définissez la cible du lien comme "_blank" pour ouvrir le lien dans une nouvelle fenêtre
        imageLink.target = "_blank";
        
        // Ajoutez l'élément image à l'élément a
        imageLink.appendChild(image);
        // Ajoutez l'élément a à l'élément div (imageWrapper)
        imageWrapper.appendChild(imageLink);
        searchResultsEl.appendChild(imageWrapper);

    
        // Affichez les détails de chaque résultat dans la console (à des fins de débogage)
        
        

    });
    page++;
    console.log(page);
    

    if(page>1){
        showMoreButtonEl.style.display='block';

    }

     
}

formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    page=1;
    searchImages();
    // Ajoutez ici le code pour effectuer la recherche d'images ou appelez une fonction qui le fait.
});
showMoreButtonEl.addEventListener("click", () => {
    searchImages();
});
