import React from 'react'

const SearchBar = ({ query, setQuery }) => {
  return (
    <div>
      <input
        type="text"
        placeholder="Search for a city..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className='border p-2 w-full'
      />
    </div>
  )
}

export default SearchBar;
