const API_KEY="96caaedd7334415bb37a3b559d061834";
const url="https://newsapi.org/v2/everything?q=";

window.addEventListener("load",()=>fetchnews("India"));
function reload(){
    window.location.reload();
}

async function fetchnews(query){
    const res = await fetch(`${url}${query}&apikey=${API_KEY}`);
    const data = await res.json();
    bindData(data.articles);   
}
function bindData(articles){
    const cardsContainer = document.getElementById('cards-container');
    const newsCardTemplate = document.getElementById('templates-news-card');

    cardsContainer.innerHTML="";

    articles.forEach((article)=>{
     if(!article.urlToImage) return;
     const cardClone = newsCardTemplate.content.cloneNode(true);
     fillDataCard(cardClone,article);
     cardsContainer.appendChild(cardClone);

    });
}
function fillDataCard(cardClone,article){
    const newsImg = cardClone.querySelector('#news-img');
    const newsTitle = cardClone.querySelector('#news-title');
    const newsSource = cardClone.querySelector('#news-source');
    const newsDesc = cardClone.querySelector('#news-desc');

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsSource.innerHTML = article.source;
    newsDesc.innerHTML = article.description;
    const date = new Date(article.publishedAt).toLocaleString("en-US",{
        timezone: "Asia/jakarta"
    })
    newsSource.innerHTML = `${article.source.name}.${date}`;
    cardClone.firstElementChild.addEventListener("click",()=>{
        window.open(article.url,"_blank");
    });
}
let curSelectedNav = null;
function onNavItemClick(id){
    fetchnews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove('active');
    curSelectedNav = navItem;
    curSelectedNav.classList.add('active');
}
const searchButton = document.getElementById("search-btn"); 
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click",()=>{
    const query = searchText.value;
    if(!query) return;
    fetchnews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
}); 

function toggleNavLinks(){
    const navLinks = document.getElementById('nav-links');
    navLinks.classList.toggle('show');
}