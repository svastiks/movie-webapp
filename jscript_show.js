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
const main_url = url + "discover/tv?sort_by=popularity.desc&" + key + "&append_to_response=videos";
const searchurl = url + "search/tv?" + key + "&language=en-US&page=1&include_adult=false";

const tvshowurl = "https://api.themoviedb.org/3/search/tv?" + key + "&language=en-US&page=1&include_adult=false";

const main = document.getElementById("main");
const search = document.getElementById("search_show");
const form = document.getElementById("form");
const watchlistbutton = document.getElementById("addwatchbutton")
const removewatchlistbutton = document.getElementsByClassName("removewatchlist")
const watchlist = document.getElementById("watchlist");


const genreurl = "https://api.themoviedb.org/3/genre/movie/list?" + key + "&language=en-US";

getShow(main_url);

function getShow(mainurl){

fetch(mainurl).then(res => res.json()).then(data => {

    console.log(data.results);
    showTv(data.results);
})
}

function showTv(data) {

    main.innerHTML = '';

    data.forEach(movie => {

        const {id, original_name, name, original_title, poster_path, overview, vote_average} = movie;

        const movieEl = document.createElement('div');
        movieEl.classList.add('movie_temp');
        movieEl.innerHTML = `
        
        <img src = "${imageurl + poster_path}" alt="Poster">

        <div class="title">
            <h1> 
            <span class="">${original_name || name || original_title}</span>
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

form.addEventListener('submit', (e) => {

e.preventDefault();

    const searchword = search.value;

    const query = "&query=" + searchword;

    if(searchword){
        getShow(searchurl + query);
        console.log(getShow(searchurl + query));
    }

    else{
        getShow(main_url)
    }
})
