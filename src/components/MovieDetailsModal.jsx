import React, { useEffect, useState } from 'react'

import { getGenreName, getMovieRuntime, getPosterUrl } from '../data/tmdbClient'
import './MovieDetailsModal.css'

export default function MovieDetailsModal({
  movieId,
  movieTitle,
  movieBackdropUrl,
  movieReleaseDate,
  movieOverview,
  movieGenres,
  handleClose,
}) {
  const [genresString, setGenres] = useState('')
  const [runtime, setRuntime] = useState(null)

  // Get movie genres
  useEffect(() => {
    Promise.all(
      movieGenres.map(async (genreId) => {
        const genreName = await getGenreName(genreId)
        return genreName
      }),
    ).then((data) => {
      setGenres(data.join(', '))
    })
  }, [movieGenres])

  // Get runtime
  useEffect(() => {
    getMovieRuntime(movieId).then((runtime) => setRuntime(runtime))
  }, [movieId])

  return (
    <dialog className="MovieDetailsModal">
      <div className="modal-content">
        <div className="modal-close-icon" onClick={handleClose}>
          +
        </div>
        <div className="modal-movie-details">
          <h2>{movieTitle}</h2>
          <img src={getPosterUrl(movieBackdropUrl)} />
          <header>
            {movieReleaseDate} | {runtime} min.
          </header>
          <span>Genres: {genresString}</span>
          <p>{movieOverview}</p>
        </div>
      </div>
    </dialog>
  )
}
