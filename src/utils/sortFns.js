export const SORT_TYPES = {
  NONE: '---',
  ALPHABETICAL: 'Title (A-Z)',
  RATING: 'Rating',
  RELEASE_DATE: 'Release Date',
}

export const sortFunctions = {
  [SORT_TYPES.ALPHABETICAL]: getAlphabeticalCompareFn(),
  [SORT_TYPES.RATING]: getRatingCompareFn(),
  [SORT_TYPES.RELEASE_DATE]: getReleaseDateCompareFn(),
}

export function getAlphabeticalCompareFn() {
  const compareFn = (a, b) => (a.title < b.title ? -1 : 1)
  return compareFn
}

export function getReleaseDateCompareFn() {
  const compareFn = (a, b) => {
    const aDate = new Date(a.release_date).getTime()
    const bDate = new Date(b.release_date).getTime()

    return bDate - aDate
  }

  return compareFn
}

export function getRatingCompareFn() {
  const compareFn = (a, b) => b.vote_average - a.vote_average
  return compareFn
}
