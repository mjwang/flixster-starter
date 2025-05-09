import { useCallback, useMemo, useState } from 'react'

import { SORT_TYPES, sortFunctions } from '../utils/sortFns'

export default function useSort(movies) {
  const [selectedSort, setSelectedSort] = useState(SORT_TYPES.NONE)

  const setSort = useCallback(
    (sortType) => setSelectedSort(sortType),
    [setSelectedSort],
  )

  const sortedMovies = useMemo(() => {
    if (selectedSort !== SORT_TYPES.NONE) {
      return movies.toSorted(sortFunctions[selectedSort])
    } else {
      return movies
    }
  }, [selectedSort, movies])

  return {
    sortedMovies: sortedMovies,
    setSort: setSort,
  }
}
