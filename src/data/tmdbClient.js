export const apiUrl = "https://api.themoviedb.org/";

export const nowPlayingPath = "/3/movie/now_playing";
export const searchPath = "3/search/movie";
export const genresPath = "3/genre/movie/list";
export const movieDetailsPath = "3/movie/"; // Add movie_id -> /3/movie/{movie_id}

export function getHeaders() {
  return {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_READ_ACCESS_TOKEN}`,
    accept: "application/json",
  };
}

async function fetchMovieDatabaseData(url, cursor) {
  if (cursor) {
    url.searchParams.set("page", cursor);
  }

  const data = await fetch(url, {
    method: "GET",
    headers: getHeaders(),
  });

  if (data.status === 200) {
    return data.json();
  }

  return {};
}

export async function getNowPlayingMovies(cursor) {
  const moviesUrl = new URL(nowPlayingPath, apiUrl);

  return fetchMovieDatabaseData(moviesUrl, cursor);
}

export async function searchMovies(searchTerm, cursor) {
  const searchUrl = new URL(searchPath, apiUrl);
  searchUrl.searchParams.set("query", searchTerm);

  return fetchMovieDatabaseData(searchUrl, cursor);
}

export async function getGenreName(genreId) {
  const movieGenresUrl = new URL(genresPath, apiUrl);

  const genresData = await fetchMovieDatabaseData(movieGenresUrl);

  const genre = genresData?.genres?.find((genre) => genre.id === genreId);
  return genre?.name;
}

export async function getMovieRuntime(movieId) {
  const movieDetailsUrl = new URL(`${movieDetailsPath}${movieId}`, apiUrl);

  const movieDetails = await fetchMovieDatabaseData(movieDetailsUrl);
  return movieDetails?.runtime;
}

export function getPosterUrl(posterPath) {
  return `https://image.tmdb.org/t/p/w220_and_h330_face${posterPath}`;
}
