function photographerTemplate(data) {
    const { name, portrait, id, tagline, city, country, price} = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement('article');
        const link = document.createElement('a');
        link.href = `photographer.html?id=${id}`;

        const img = document.createElement('img');
        const h2 = document.createElement('h2');
        const h3 = document.createElement('h3');
        const h4 = document.createElement('h4');
        const h5 = document.createElement("h5");
        const linkDiv = document.createElement('div');
        link.appendChild(linkDiv);
        
        img.setAttribute("src", picture);
        img.setAttribute('alt', name);
        linkDiv.appendChild(img);    
        link.appendChild(h2);
        h2.textContent = name;
        h3.textContent = city+ ", " + country;
        h4.textContent = tagline;
        h5.textContent = price + "€/jour";


        article.appendChild(link);
        article.appendChild(h2);
        article.appendChild(h3);
        article.appendChild(h4);
        article.appendChild(h5);
        return article;
    }
    return { name, picture, tagline, price, city, country, getUserCardDOM }
}
