import React, { useCallback } from "react";

import MovieDetailsModal from "./components/MovieDetailsModal";
import MovieList from "./components/MovieList";
import Search from "./components/Search";
import useModal from "./hooks/useModal";
import useMovieData from "./hooks/useMovieData";

import "./App.css";

const App = () => {
  const { movies, loadMoreMovies, setSearch, isSearchMode, isAllLoaded } =
    useMovieData();
  const { isModalVisible, modalProps, closeModal, showModal } = useModal();

  const updateSearchQuery = useCallback((string) => setSearch(string), []);
  const clearSearchQuery = useCallback(() => setSearch(null), []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>🍿 Flixter</h1>
      </header>
      <nav className="App-nav">
        {isSearchMode ? <h2>Search Results...</h2> : <h2>Now Playing</h2>}
        <Search
          placeholder={"Look for a movie..."}
          clearSearch={clearSearchQuery}
          handleSubmitSearch={updateSearchQuery}
          isSearchMode={isSearchMode}
        />
      </nav>
      <main className="App-content">
        <MovieList
          movies={movies}
          handleLoadMoreMovies={loadMoreMovies}
          isAllLoaded={isAllLoaded}
          handleClickMovie={(props) => showModal(props, true)}
        />
      </main>
      {isModalVisible && (
        <MovieDetailsModal {...modalProps} handleClose={closeModal} />
      )}
      <footer>
        <div className="footer-content">
          <strong>About: </strong><a href="https://www.codepath.org/" target="_blank">Codepath</a> &#169;2025 <br />
          <strong>Contact: </strong>
          <a href="https://github.com/mjwang" target="_blank">
            @mjwang
          </a>
        </div>
      </footer>
    </div>
  );
};

export default App;
