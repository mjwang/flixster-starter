import React, { useEffect, useMemo, useState } from "react";

import {
  getGenreName,
  getMovieRuntime,
  getPosterUrl,
} from "../data/tmdbClient";
import "./MovieDetailsModal.css";

export default function MovieDetailsModal({
  movieId,
  movieTitle,
  movieBackdropUrl,
  movieReleaseDate,
  movieOverview,
  movieGenres,
  handleClose,
}) {
  const [genresString, setGenres] = useState("");
  const [runtime, setRuntime] = useState(null);

  const backdropImgUrl = useMemo(() => {
    if (movieBackdropUrl) {
      return getPosterUrl(movieBackdropUrl);
    } else {
      return "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg";
    }
  }, [movieBackdropUrl]);

  // Get movie genres
  useEffect(() => {
    Promise.all(
      movieGenres.map(async (genreId) => {
        const genreName = await getGenreName(genreId);
        return genreName;
      }),
    ).then((data) => {
      setGenres(data.join(", "));
    });
  }, [movieGenres]);

  // Get runtime
  useEffect(() => {
    getMovieRuntime(movieId).then((runtime) => setRuntime(runtime));
  }, [movieId]);

  return (
    <dialog className="MovieDetailsModal">
      <div className="modal-content">
        <div className="modal-close-icon" onClick={handleClose}>
          +
        </div>
        <img
          alt={`${movieTitle} backdrop poster`}
          src={backdropImgUrl}
          className="modal-movie-backdrop"
        />
        <div className="modal-movie-details">
          <h2>{movieTitle}</h2>
          <header>
            {Boolean(movieReleaseDate) && (
              <span>
                <strong>Release Date:</strong> {movieReleaseDate} |{" "}
              </span>
            )}
            {runtime && (
              <span>
                <strong>Runtime: </strong>
                {runtime} min.
              </span>
            )}
          </header>
          {genresString !== "" && (
            <span>
              <strong>Genres:</strong> {genresString}
            </span>
          )}
          <span>{movieOverview}</span>
        </div>
      </div>
    </dialog>
  );
}
