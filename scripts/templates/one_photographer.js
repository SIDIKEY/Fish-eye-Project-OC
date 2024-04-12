function onePhotographerTemplate(data) {

    const { name, portrait, city, country, tagline, id, price } = data;
  
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

        const onNextMedia = (i, medias, lightboxMedia)=> {
            if(medias[i+1]) {  
              i++;
              console.log("i++")
              lightboxMedia.setAttribute('src', `./assets/images/${id}/${medias[i]?.image || medias[i].video}`);
              return i;
              
            }else {
              i=0
              lightboxMedia.setAttribute('src', `./assets/images/${id}/${medias[i]?.image || medias[i].video}`);
              return i;
        
            }
            
        }

        const onPreviousMedia = (i, medias, lightboxMedia)=> {
            if(medias[i-1]) {  
              i--;
              console.log("i--")
              lightboxMedia.setAttribute('src', `./assets/images/${id}/${medias[i]?.image || medias[i].video}`);
              return i;
              
            }else {
              i = medias.length -1;
              console.log(medias);
              lightboxMedia.setAttribute('src', `./assets/images/${id}/${medias[i]?.image || medias[i].video}`);
              return i;
        
            }
            
        }

        
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
          cardLikes.textContent = media.likes + " ♥";
          cardLikes.classList.add("card_likes");
    
          mediaContent.appendChild(article)
          link.appendChild(typeOfMedia);
          article.appendChild(link)
          article.appendChild(cardDetails)
          cardDetails.appendChild(cardName)
          cardDetails.appendChild(cardLikes)

          link.addEventListener("click", () => {

            const currentMedia = document.getElementById("current_media")
            const lightbox = document.getElementById("media_modal");
            const nextMedia = document.getElementById("next_media")
            const previousMedia = document.getElementById("previous_media")

            console.log("clicked")   
            lightbox.style.display = "flex";
            lightbox.style.justifyContent = "center"
            
            const lightboxMedia = media.video
              ? document.createElement("video") : document.createElement("img");
            console.log(media);
            lightboxMedia.setAttribute('src', `./assets/images/${id}/${media?.image || media.video}`);
            currentMedia.appendChild(lightboxMedia)
    
            
    
            let i = medias.findIndex(item => media.id === item.id);
            console.log(i)
    
            nextMedia.addEventListener("click", () => {
              i = onNextMedia(i, medias, lightboxMedia)
            })
    
            previousMedia.addEventListener("click", () => {
              i = onPreviousMedia(i, medias, lightboxMedia)
            }) 
            
            
            document.addEventListener('keydown', event => {

                if(lightbox.style.display === "flex") {
                  if (event.key === "ArrowLeft") {
                    console.log("Left key");
                     i = onPreviousMedia(i, medias, lightboxMedia)
          
                  } if (event.key === "ArrowRight") {
                    console.log("Right key");
                    i = onNextMedia(i, medias, lightboxMedia);
          
                  } if (event.key === "Escape") {
                    console.log("esc");
                    lightbox.style.display = "none";
                    
                    
                  }
                  event.preventDefault();
                }          
              })     
          });

         

          



          const poppriceCard = document.querySelector(".popprice_card");
          console.log(poppriceCard)


          let total = medias.reduce((sum, media) => sum + media.likes, 0)
          poppriceCard.children[0].textContent = total + " ♥";
          poppriceCard.children[1].textContent = price + "€ / jour";
          


          let counter = media.likes
          cardLikes.addEventListener("click", () => {

            
            if (cardLikes.classList.contains("like")) {
              counter--;
              cardLikes.classList.remove("like");
              console.log("counter--");
              cardLikes.textContent = counter + " ♥";
              total--;
              console.log(total)
              poppriceCard.children[0].textContent = total + " ♥"
            } else {
              cardLikes.classList.add("like");
              counter++;
              total++
              cardLikes.textContent = counter + " ♥"
              poppriceCard.children[0].textContent = total + " ♥"
              console.log("counter++")
             
            }
            console.log(media.id);
            console.log(counter);
    
          });

          
        });
        
        
        const closeModal = document.getElementById("close_modal");
        const lightbox = document.getElementById("media_modal");

        closeModal.addEventListener("click", () => {

          const child = document.querySelector('#current_media :nth-child(1)');

          lightbox.style.display = "none";
          console.log(child);
          child.remove();
          console.log("closed")
        })
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
  