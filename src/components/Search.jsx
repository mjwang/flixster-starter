import React, { useState } from 'react'

import './Search.css'

export default function Search({
  placeholder,
  clearSearch,
  handleSubmitSearch,
  isSearchMode,
}) {
  const [value, setValue] = useState('')

  const handleSearchChange = (event) => {
    setValue(event.target.value)
  }

  const handleSearchClick = (event) => {
    event.preventDefault()
    handleSubmitSearch(value)
  }

  const handleClear = () => {
    setValue('')
    clearSearch()
  }

  return (
    <form className="Search" onSubmit={handleSearchClick}>
      <input
        className="search-box"
        type="text"
        value={value}
        onChange={handleSearchChange}
        placeholder={placeholder}
      />
      <button
        onClick={handleSearchClick}
        type="submit"
        className="search-button primary"
      >
        Search
      </button>
      {isSearchMode && (
        <button
          className="search-button tertiary"
          role="link"
          onClick={handleClear}
        >
          Clear
          <div className="clear-tooltip">Go back to "Now Playing"</div>
        </button>
      )}
    </form>
  )
}
