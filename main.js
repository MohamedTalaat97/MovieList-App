// movie class 

class movie {

    constructor(title, year) {
        this.title = title;
        this.year = year
    }
}

// ui class 

class UI {

    static displayMovies() {
        const storedMovies = [{ title: "Enola Holmes", year: 2020 }, { title: "The Irishman", year: 2019 }];
        const movies = storedMovies;
        movies.forEach(movie => UI.addMovie(movie))

    }

    static addMovie(movie) {
        const list = document.getElementById("movie-list");
        const row = document.createElement('tr')
        row.innerHTML =
            `<td> ${movie.title}</td>
        <td> ${movie.year}</td>
                <td> <a href = "#" class = "btn btn-danger btn-sm delete">X</a></td>`;
        list.appendChild(row);
    }

    static clear() {

        document.querySelector('#title').value = '';
        document.querySelector('#year').value = '';

    }
}


// store class

// events   display - add - remove

document.addEventListener("DOMContentLoaded", UI.displayMovies)


// get movie from api on search
document.querySelector('#movie-form').addEventListener('submit', (e) => {
    e.preventDefault()
        // get form values
    const title = document.querySelector('#title').value;
    const year = document.querySelector('#year').value;

    const movie_to_be_added = new movie(title, year)
    console.log(movie_to_be_added)
    UI.addMovie(movie_to_be_added);
    UI.clear()


    const REQUEST_URL = new URL("http://www.omdbapi.com/?apikey=28b6bce0");
    REQUEST_URL.searchParams.append("s", title)
    console.log(REQUEST_URL)
    fetch(REQUEST_URL)
        .then(response => response.json())
        .then(data => console.log(data));

})