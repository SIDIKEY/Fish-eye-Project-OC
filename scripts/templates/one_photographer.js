const LIKES = 0;
function onePhotographerTemplate(data) {

    const { name, portrait, city, country, tagline, id, price } = data;

    
    
  
    const picture = `../assets/photographers/${portrait}`;
    
  
    function getUserCardDOM() {
  
  
      const img = document.createElement("img");
      const Link = document.createElement("a");
      const linkContainer = document.getElementById("link_container");
      const profileName = document.querySelector("h1");
      const profileLocation = document.querySelector(".profile > h2");
      const profileTagline = document.querySelector(".profile > p");
      const profilePic = document.querySelector(".profile_pic");
      const logo = document.getElementById("logo");
      profileDiv = document.querySelector(".profile")
      console.log(linkContainer)
  
      
  
      img.src = `./assets/photographers/${portrait}`;
      Link.href = "./index.html";
      profileName.textContent = name;
      profileName.setAttribute("aria-label", "Nom du photographe");
      profileLocation.textContent = city + ', ' + country;
      profileLocation.setAttribute("aria-label", "Ville et pays du photographe");
      profileTagline.textContent = tagline;
      profileTagline.setAttribute("aria-label", "Tag line");
  
  
     
      profileDiv.appendChild(profileName);
      profileDiv.appendChild(profileLocation);
      profileDiv.appendChild(profileTagline);
      profilePic.appendChild(img);
      linkContainer.appendChild(Link);
      Link.appendChild(logo)
  
  
  
      return profileName, profileLocation, profileTagline, profilePic;
    }

  
    function getUserAvatarDOM() {
      const img = document.createElement('img');
      img.setAttribute("src", picture);
      img.setAttribute("alt", "Photo de " + name);
  
      return img;
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
              console.log("i++");
              lightboxMedia.setAttribute('src', `./assets/images/${id}/${medias[i]?.image || medias[i].video}`);
              return i;
              
            }else {
              i=0;
              lightboxMedia.setAttribute('src', `./assets/images/${id}/${medias[i]?.image || medias[i].video}`);
              return i;
            }   
        }

        const onPreviousMedia = (i, medias, lightboxMedia)=> {
            if(medias[i-1]) {  
              i--;
              console.log("i--");
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
          const typeOfMedia = media.video ? document.createElement("video") : document.createElement("img");
          console.log(media.video)
          article.dataset.id = media.id;
          const cardDetails = document.createElement("div");
          const cardName = document.createElement("span");
          const cardLikes = document.createElement("button");
    
          typeOfMedia.setAttribute('src', `./assets/images/${id}/${media?.video || media.image}`);
          typeOfMedia.controls = true;
          console.log(typeOfMedia);
          link.href = "#";
          cardDetails.classList.add("card_details")
          cardName.textContent = media.title;
          cardLikes.textContent = media.likes + " ♥";
          cardLikes.href = "#";
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
            lightbox.style.justifyContent = "center";
            const lightboxMedia = media.video
              ? document.createElement("video") : document.createElement("img");
            console.log(media);
            lightboxMedia.setAttribute('src', `./assets/images/${id}/${media?.image || media.video}`);
            lightboxMedia.controls = true;
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
                    const child = document.querySelector('#current_media :nth-child(1)');
                    console.log("esc");
                    lightbox.style.display = "none";
                    console.log(child);
                    child.remove();
                    console.log("closed")           
                  }
                  event.preventDefault();
                }          
            })     
          })

 
          
          let counter = media.likes;
          cardLikes.focus()
          ;

          cardLikes.addEventListener("click", () => {

                 
            if (cardLikes.classList.contains("like")) {
              cardLikes.focus();
              counter--;
              
              console.log("counter--");
              cardLikes.textContent = counter + " ♥";
              cardLikes.classList.remove("like");
              
            } else {
              cardLikes.focus()
              cardLikes.classList.add("like");
              counter++;
              cardLikes.textContent = counter + " ♥"
              
              console.log("counter++")           
            }
            priceTotalLikes()
            console.log(media.id);
            console.log(counter);
            
          })       
        })
        
        
        const closeModal = document.getElementById("close_modal");
        const lightbox = document.getElementById("media_modal");
        const main = document.getElementById("main")
        closeModal.addEventListener("click", () => {
          const child = document.querySelector('#current_media :nth-child(1)');
          lightbox.style.display = "none";
          lightbox.setAttribute('aria-hidden', 'true')
          main.setAttribute('aria-hidden', 'false')
          closeModal.focus()
          console.log(child);
          child.remove();
          console.log("closed");
        })
    }

   

    function priceTotalLikes() {
      // let totalLikes = 0;
      const poppriceCard = document.querySelector(".popprice_card"); 
      const poppriceCardLikes = document.querySelector(".popprice_like"); 
      
      const cards = [...document.querySelectorAll('.card_likes')];// Cartes avec mes likes
      const totalLikes = cards.reduce((acc, card) => {
        const likes = parseInt(card.innerText);
        return acc + likes;
      }, 0);

      console.log('>>>>>', totalLikes)

      // my_arr.forEach((e) => {
      //   console.log(parseInt(e.innerText));
      //   let innerTxt = parseInt(e.innerText);
        
        
      //   totalLikes = innerTxt + totalLikes;
        
        
      // });
      console.log("coucou", totalLikes);
      poppriceCardLikes.textContent = totalLikes + " ♥";
      
      
      poppriceCard.children[1].textContent = price + "€ / jour";
      
      
    }


   
    
    
    



  

    return { getUserCardDOM, getUserAvatarDOM, getMedias, dropdownSortByFn, priceTotalLikes}
}
  