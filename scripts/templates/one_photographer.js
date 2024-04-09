function onePhotographerTemplate(data) {

    const { name, portrait, city, country, tagline } = data;
  
    const picture = `../assets/photographers/${portrait}`;
  
    function getUserCardDOM() {
  
      // Déclaration des éléments du DOM
  
  
      const img = document.createElement("img");
      const link = document.createElement("a");
      const linkContainer = document.createElement("div");
      const profileName = document.querySelector("h1");
      const profileLocation = document.querySelector(".profile > h2");
      const profileTagline = document.querySelector(".profile > p");
      const profilePic = document.querySelector(".profile_pic");
  
      
  
      console.log(profilePic)
  
  
  
  
      link.href = "./index.html";
      linkContainer.appendChild(link)
  
  
  
  
  
      img.src = `./assets/photographers/${portrait}`;
  
      profileName.textContent = name;
      profileName.setAttribute("aria-label", "Nom du photographe");
      profileLocation.textContent = city + ', ' + country;
      profileLocation.setAttribute("aria-label", "Ville et pays du photographe");
      profileTagline.textContent = tagline;
      profileTagline.setAttribute("aria-label", "Tag line");
  
  
      profileDiv = document.querySelector(".profile")
  
      profileDiv.appendChild(profileName);
      profileDiv.appendChild(profileLocation);
      profileDiv.appendChild(profileTagline);
      profilePic.appendChild(img)
        ;
  
  
  
      return profileName, profileLocation, profileTagline, profilePic;
    }
  
    function getUserAvatarDOM() {
      const img = document.createElement('img');
      img.setAttribute("src", picture);
      img.setAttribute("alt", "Photo de " + name);
  
  
      return img;
  
    }
  
    
  
  
  
  
   
  
  
     
   
    
  
    
  
  
  
  
  
  
  
  
  
  
    return { getUserCardDOM, getUserAvatarDOM}
  
  
  
}
  