import React, { useMemo } from 'react'

import { getPosterUrl } from '../data/tmdbClient'

import './MovieCard.css'

const MAX_TITLE_LENGTH = 43

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

  const truncatedTitle = useMemo(() => {
    if (title.length > MAX_TITLE_LENGTH) {
      return title.substring(0, MAX_TITLE_LENGTH) + "..."
    } else {
      return title
    }
  }, [title])

  return (
    <div className="MovieCard" onClick={handleClickMovie}>
      <img alt={`${title} poster`} src={posterUrl} className="movie-poster" />
      <div className="movie-details">
        <span className="movie-title">{truncatedTitle}</span>
        <span className="movie-rating">Rating: {rating}</span>
      </div>
    </div>
  )
}
