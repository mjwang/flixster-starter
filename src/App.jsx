import React, { useCallback } from 'react'

import MovieDetailsModal from './components/MovieDetailsModal'
import MovieList from './components/MovieList'
import Search from './components/Search'
import useModal from './hooks/useModal'
import useMovieData from './hooks/useMovieData'

import './App.css'

const App = () => {
  const { movies, loadMoreMovies, setSearch, isSearchMode, isAllLoaded } =
    useMovieData()
  const { isModalVisible, modalProps, closeModal, showModal } = useModal()

  const updateSearchQuery = useCallback((string) => setSearch(string), [])
  const clearSearchQuery = useCallback(() => setSearch(null), [])

  return (
    <div className="App">
      <header className="App-header">
        <h2>🍿 Flixter</h2>
      </header>
      <main className="App-content">
        {isSearchMode ? (
          <>
            <h3>Search Results...</h3>
            <button role="link" onClick={clearSearchQuery}>
              Back to Now Playing
            </button>
          </>
        ) : (
          <h3>Now Playing</h3>
        )}
        <Search
          placeholder={'Look for a movie...'}
          handleSubmitSearch={updateSearchQuery}
        />
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
          <a href="https://github.com/mjwang" target="_blank">
            @mjwang
          </a>
          <br />
          codepath 2025
        </div>
      </footer>
    </div>
  )
}

export default App
