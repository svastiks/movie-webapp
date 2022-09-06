//NAVBAR BEGIN
const toggleButton = document.getElementsByClassName('toggle-button')[0]
const navbarlinks = document.getElementsByClassName('navbar-links')[0]

toggleButton.addEventListener('click', () => {
    navbarlinks.classList.toggle('active')
})

// NAVBAR END

//TEMPELATE/SEARCH START

const url = "https://api.themoviedb.org/3/"
const key = "api_key=e062837d92b7cad745d5a14e61157a1e"
const imageurl = "https://image.tmdb.org/t/p/w500";
const main_url = url + "discover/movie?sort_by=popularity.desc&" + key + "&append_to_response=videos";
const searchurl = url + "search/multi?" + key + "&language=en-US&page=1&include_adult=false";



const main = document.getElementById("main");
const search = document.getElementById("search");
const form = document.getElementById("form");
const watchlistbutton = document.getElementById("addwatchbutton")
const removewatchlistbutton = document.getElementsByClassName("removewatchlist")
const watchlist = document.getElementById("watchlist");

const itemsEl = document.querySelector(".list_main");

const storage = Object.keys(localStorage)

let addwatch = document.querySelectorAll('.addtowishlist')

//  

getMovies(main_url);

function getMovies(mainurl){

fetch(mainurl).then(res => res.json()).then(data => {

    console.log(data.results);
    showMovies(data.results);
})
}

function showMovies(data) {

    main.innerHTML = '';

    data.forEach(movie => {

        const {id, title, original_title, original_name, name, poster_path, overview, vote_average} = movie;

        const movieEl = document.createElement('div');
        movieEl.classList.add('movie_temp');
        movieEl.innerHTML = `
        
        <img src = "${imageurl + poster_path}" alt="Poster">

        <div class="title">
            <h1> 
            ${title}
            </h1>
        </div>

        <div class = "rating_main">

        <img src="Images/star.png" class="rate_img">

        <div class = "rating">
        
        ${vote_average} / 10
        <br> <br>
        </div>
        </div>

        <div class="summary">
            ${overview}
        </div>
        `
        //<a class="addtowishlist" href="#!" onclick="addwatchlist(${id})">Add to wishlist</a>
        main.appendChild(movieEl);
    })
}

function changeColour(){

}

/* <button class="addwatchlist" id="addwatchbutton" onclick="">Add to watchlist</button>
        
<button class="removewatchlist" id="removewatchlist" onclick="removewatchlisT${title, poster_path, overview}">Remove from watchlist</button> */

form.addEventListener('submit', (e) => {

e.preventDefault();

    const searchword = search.value;

    const query = "&query=" + searchword;

    if(searchword){
        getMovies(searchurl + query);
        console.log(getMovies(searchurl + query));
    }

    else{
        getMovies(main_url)
    }
})

let cart = JSON.parse(localStorage.getItem("CART")) || [];
updateCart();

const find = "https://api.themoviedb.org/3/movie/";
const find2 = "?api_key=e062837d92b7cad745d5a14e61157a1e&language=en-US";

function addwatchlist(id){
    //storage.setItem(id.innerHTML)
    //const idinfo = 1;
    // let idinfo = id;
    // let mainlink = find + idinfo + find2;

        fetch(infoo).then(res => res.json()).then(data => {
        //item exists or not
        if(cart.some((item) => item.id === id)){
            alert("Movie is already in the hitlist!")
        }
        else{
        const item = data.results.find((movie) => movie.id === id);
        
        cart.push(item);
        console.log(cart);
        }
    });
    updateCart();
}

function updateCart(){
    
    showList();

    localStorage.setItem("CART", JSON.stringify(cart));
}

function showList(){

    itemsEl.innerHTML = ''; //cleared cart element

    cart.forEach((wishlist) => {

        const {id, title, original_title, original_name, name, poster_path, overview} = wishlist;

        itemsEl.innerHTML += `

        <div class="list_temp">

        <img src = "${imageurl + poster_path}" alt="image">

        <div class="title">
            <h1>${title + name}</h1>
        </div>
        <div class="summary">
            ${overview}
        </div>
        <a class="removefromwishlist" href="#!" onclick="remove(${id})">Remove from wishlist</a>
        </div>
        `
        main.appendChild(itemsEl);
    }
)}

function remove(id){

    cart = cart.filter( (item) => item.id !== id)

    updateCart();
}
//END