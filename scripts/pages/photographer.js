async function getPhotographers() {
    // Ceci est un exemple de données pour avoir un affichage de photographes de test dès le démarrage du projet, 
    // mais il sera à remplacer avec une requête sur le fichier JSON en utilisant "fetch".
    try{
        const response = await fetch("/data/photographers.json")
        const data = await response.json();
        return data;

    } catch (error) {
        console.error(error);
        return ({ photographers: [] });
    }
    
    
}

function displayPhotographer(photographer) {
    const photographerSection = document.querySelector(".photograph-header");
    const photographerModel = photographerInfo(photographer);
    const userCardDOM = photographerModel.getUserInfoDOM();
    photographerSection.appendChild(userCardDOM);
    
}

async function init() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    const data = await getPhotographers();
    const photographers = data.photographers;
    console.log(photographers);
    const onePhotographer = photographers.find(function (photographer) {
      return photographer.id.toString() === id.toString();
    });
    
    const templatePhoto = onePhotographerTemplate(onePhotographer);

			
  
    
    const photographerSection = document.querySelector(".photograph-header");
    photographerSection.appendChild(templatePhoto.getUserCardDOM());
    
   
    


}
init();
