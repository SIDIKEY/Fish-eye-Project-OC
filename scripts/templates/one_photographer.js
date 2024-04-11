function onePhotographerTemplate(data) {

    const { name, portrait, city, country, tagline, id } = data;
  
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

    function getMedias(media) {
        console.log(media)
    
        const mediaContent = document.querySelector(".media_content");
        mediaContent.innerHTML = "";
        let medias = media.filter((media) => media.photographerId === Number(id));
        const dropdownSortBy = document.querySelector(".select");
        dropdownSortBy.addEventListener("change", (e)=> dropdownSortByFn(e.target.value, medias))
    

        medias.forEach((media) => {
    
          console.log(media)
          console.log(medias)
          const article = document.createElement("article");
          const link = document.createElement("a");
          const typeOfMedia = media.video
            ? document.createElement("video") : document.createElement("img");
          article.dataset.id = media.id;
          const cardDetails = document.createElement("div");
          const cardName = document.createElement("span");
          const cardLikes = document.createElement("span");
    
    
    
          typeOfMedia.setAttribute('src', `./assets/images/${id}/${media?.image || media.video}`);
          console.log(typeOfMedia);
          link.href = "#";
          cardDetails.classList.add("card_details")
          cardName.textContent = media.title;
          cardLikes.textContent = media.likes + "♥";
          cardLikes.classList.add("card_likes");
    
          mediaContent.appendChild(article)
          link.appendChild(typeOfMedia);
    
          article.appendChild(link)
          article.appendChild(cardDetails)
          cardDetails.appendChild(cardName)
          cardDetails.appendChild(cardLikes)
    
     
        });
    
    
    }

    function dropdownSortByFn(orderBy, medias) {

   
        switch (orderBy) {
    
          case "popularity": {
            const mediaSort = medias.sort((a, b) => b.likes - a.likes);
            console.log(medias);
            break;
          }
    
          case "date": {
            medias.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
            console.log(medias)
            break;
          }
    
          case "title": {
            medias.sort((a, b) => a.title.localeCompare(b.title));
            console.log(medias)
            break;
          }
        }
    
        getMedias(medias);
    
    
      }
  
  
    return { getUserCardDOM, getUserAvatarDOM, getMedias, dropdownSortByFn}
  
  
  
}
  