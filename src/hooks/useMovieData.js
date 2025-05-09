import { useCallback, useEffect, useState } from "react";

import { getNowPlayingMovies, searchMovies } from "../data/tmdbClient";

export default function useMovieData() {
  const [movies, setMovies] = useState([]);
  const [nextCursor, setNextCursor] = useState(undefined);
  const [searchQuery, setSearchQuery] = useState(null);

  const getMoviesFn = useCallback(
    (cursor) => {
      if (searchQuery) {
        return searchMovies(searchQuery, cursor);
      } else {
        return getNowPlayingMovies(cursor);
      }
    },
    [searchQuery],
  );

  const loadMoreMovies = useCallback(() => {
    getMoviesFn(nextCursor).then((data) => {
      if (data.total_pages > data.page) {
        setNextCursor(data.page + 1);
      } else {
        setNextCursor(null);
      }

      setMovies((prevMovies) => {
        const newMovies = data.results.filter((movie) => {
          return !prevMovies.some((prevMovie) => prevMovie.id === movie.id);
        });
        return [...prevMovies, ...newMovies];
      });
    });
  }, [getMoviesFn, nextCursor]);

  const setSearch = useCallback(
    (query) => {
      setMovies([]);
      setNextCursor(null);
      setSearchQuery(query);
    },
    [setMovies, setNextCursor, setSearchQuery],
  );

  useEffect(() => {
    loadMoreMovies();
  }, [searchQuery]);

  return {
    movies: movies,
    setSearch: setSearch,
    loadMoreMovies: loadMoreMovies,
    isSearchMode: Boolean(searchQuery),
    isAllLoaded: nextCursor === null,
  };
}
