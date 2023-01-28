import { useEffect, useState } from "react";
import "./App.css";
import MovieCard from "./MovieCard";
import SearchIcon from "./search.svg";

// Key : a1cd029a

const API_URL = "http://www.omdbapi.com?apikey=a1cd029a&";

const movie = {
  Title: "Batman: The Animated Series",
  Year: "1992–1995",
  imdbID: "tt0103359",
  Type: "series",
  Poster:
    "https://m.media-amazon.com/images/M/MV5BOTM3MTRkZjQtYjBkMy00YWE1LTkxOTQtNDQyNGY0YjYzNzAzXkEyXkFqcGdeQXVyOTgwMzk1MTA@._V1_SX300.jpg",
};

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  };

  useEffect(() => {
    searchMovies("Batman");
    setSearchTerm("");
  }, []);

  return (
    <div className="app">
      <h1>Monde du Film</h1>
      <div className="search">
        <input
          type="text"
          placeholder="Rechercher un film (en anglais)"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
        <img
          src={SearchIcon}
          alt="Recherche"
          onClick={() => {
            searchMovies(searchTerm);
          }}
        />
      </div>
      <div className="container">
        {movies?.length > 0 ? (
          movies
            .sort((a, b) => a.Title.localeCompare(b.Title))
            .map((movie) => <MovieCard movie={movie} />)
        ) : (
          <div className="empty">
            <h2>Aucun film trouvé</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
