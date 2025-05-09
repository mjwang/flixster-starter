import React from 'react'

import { getPosterUrl } from '../data/tmdbClient'

import './MovieCard.css'

export default function MovieCard({
  id,
  title,
  genres,
  overview,
  backdrop,
  poster,
  rating,
  releaseDate,
  handleClick,
}) {
  const handleClickMovie = () =>
    handleClick({
      movieId: id,
      movieTitle: title,
      movieGenres: genres,
      movieOverview: overview,
      movieBackdropUrl: backdrop,
      movieRating: rating,
      movieReleaseDate: releaseDate,
    })

  return (
    <div className="MovieCard" onClick={handleClickMovie}>
      <img src={getPosterUrl(poster)} className="movie-poster" />
      <div className="movie-details">
        <b>{title}</b>
        <span>Rating: {rating}</span>
      </div>
    </div>
  )
}
