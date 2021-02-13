// movie class 
class Movie {

    constructor(title, year) {
        this.title = title;
        this.year = year
    }
}

// ui class 

class UI {
    // 
    static displayMovies() {

        const movies = Store.getMovies();
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

    static deleteMovie(el) {
        if (el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();
        }
    }


    static showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#movie-form');
        container.insertBefore(div, form);

        // Vanish in 3 seconds
        setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }
    static clear() {

        document.querySelector('#title').value = '';
        document.querySelector('#year').value = '';

    }
}



// Store Class: Handles Storage
class Store {
    static getMovies() {
        let movies;
        if (localStorage.getItem('movies') === null) {
            movies = [];
        } else {
            movies = JSON.parse(localStorage.getItem('movies'));
        }

        return movies;
    }

    static addMovie(movie) {
        const movies = Store.getMovies();
        movies.push(movie);
        localStorage.setItem('movies', JSON.stringify(movies));
    }

    static removeMovie(title) {
        const movies = Store.getMovies();

        movies.forEach((movie, index) => {
            if (book.title === title) {
                movies.splice(index, 1);
            }
        });

        localStorage.setItem('movies', JSON.stringify(movies));
    }
}
// events   display - add - remove

document.addEventListener('DOMContentLoaded', UI.displayMovies);

// Event: Add a Book
document.querySelector('#movie-form').addEventListener('submit', (e) => {
    // Prevent actual submit
    e.preventDefault();

    // Get form values
    const title = document.querySelector('#title').value;
    const year = document.querySelector('#year').value;


    // Validate
    if (title === '' || year === '') {
        UI.showAlert('Please fill in all fields', 'danger');
    } else {
        // Instatiate book
        const movie = new Movie(title, year);

        // Add Book to UI
        UI.addMovie(movie);

        // Add book to store
        Store.addMovie(movie);

        // Show success message
        UI.showAlert('Movie Added', 'success');

        // Clear fields
        UI.clearFields();
    }
});

// Event: Remove a Book
document.querySelector('#movie-list').addEventListener('click', (e) => {
    // Remove book from UI
    UI.deleteMovie(e.target);

    // Remove book from store
    Store.removeMovie(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);

    // Show success message
    UI.showAlert('Movie Removed', 'success');
});








/*

// get movie from api on search
document.querySelector('#form').addEventListener('submit', (e) => {
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
*/