import React from 'react'

import { SORT_TYPES, sortLabels } from '../utils/sortFns'
import useSort from '../hooks/useSort'
import MovieCard from './MovieCard'

import './MovieList.css'

export default function MovieList({
  movies,
  handleLoadMoreMovies,
  handleClickMovie,
  isAllLoaded,
}) {
  const { sortedMovies, setSort } = useSort(movies)

  const handleSortChange = (event) => {
    setSort(event.target.value)
  }

  return (
    <section className="MovieList">
      <div className="movie-sort-filter">
        <label>
          <b>Sort:</b>
        </label>
        <select
          className="sort-dropdown"
          name="sort"
          onChange={handleSortChange}
        >
          {Object.keys(SORT_TYPES).map((sortType) => {
            return (
              <option key={sortType} value={sortType}>
                {sortLabels[sortType]}
              </option>
            )
          })}
        </select>
      </div>
      <div className="movies-container">
        {sortedMovies.length === 0 && <h1>No Movies Founds 😬</h1>}
        {sortedMovies.map((movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            genres={movie.genre_ids}
            overview={movie.overview}
            backdrop={movie.backdrop_path}
            poster={movie.poster_path}
            rating={movie.vote_average}
            releaseDate={movie.release_date}
            handleClick={handleClickMovie}
          />
        ))}
      </div>
      <div className="load-more-container">
        {!isAllLoaded && (
          <button onClick={handleLoadMoreMovies} className="load-more-button">
            Load More
          </button>
        )}
      </div>
    </section>
  )
}
