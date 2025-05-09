import React, { useMemo } from 'react'

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
      movieBackdropUrl: backdrop || poster,
      movieRating: rating,
      movieReleaseDate: releaseDate,
    })

  const posterUrl = useMemo(() => {
    if (poster) {
      return getPosterUrl(poster)
    } else {
      return "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"
    }
  }, [poster])

  return (
    <div className="MovieCard" onClick={handleClickMovie}>
      <img src={posterUrl} className="movie-poster" />
      <div className="movie-details">
        <span className="movie-title">{title}</span>
        <span className="movie-rating">Rating: {rating}</span>
      </div>
    </div>
  )
}
