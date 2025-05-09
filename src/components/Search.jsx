import React, { useState } from 'react'

import './Search.css'

export default function Search({ placeholder, handleSubmitSearch }) {
  const [value, setValue] = useState('')

  const handleSearchChange = (event) => {
    setValue(event.target.value)
  }

  const handleSearchClick = () => {
    handleSubmitSearch(value)
  }

  return (
    <section className="Search">
      <input
        type="text"
        value={value}
        onChange={handleSearchChange}
        placeholder={placeholder}
      />
      <button onClick={handleSearchClick} className="search-button">
        Search
      </button>
    </section>
  )
}
