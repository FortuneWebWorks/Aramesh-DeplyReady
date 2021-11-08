import React from 'react';
import  SearchIcon from '../../svg/search.svg'

const SearchBar = (props) => {
  return (
    <div className="search-container">
      <img src={SearchIcon} className="search-icon" alt="search icon"/>
      <input placeholder="جست و جو" className="search-input" {...props}/>
    </div>
  )
}

export default SearchBar
