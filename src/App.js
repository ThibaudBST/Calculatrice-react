import { useEffect, useState } from "react";
import "./App.css";
import MovieCard from "./MovieCard";
import SearchIcon from "./search.svg";

// Clé d'API
const API_URL = "your_api_key";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  };

  useEffect(() => {
    // Recherche par défaut, ici Batman
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
