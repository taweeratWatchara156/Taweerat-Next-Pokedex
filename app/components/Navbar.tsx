"use client"

import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faCaretUp, faXmark } from '@fortawesome/free-solid-svg-icons'

function Navbar() {
  const [searchBar, setSerchBar] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const generations = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "XI"]
  const { gen } = useParams();
  const route = useRouter();

  useEffect(() => {
    if (!searchBar) setSearchValue("")
  }, [searchBar])

  const search = () => {
    if(searchValue){
      const keyword = searchValue.toLowerCase().replaceAll(" ", "-");
      route.push(`../pokemon/${keyword}`)
    }
  }


  return (
    <>
      <div className={`navbar flex fixed justify-between w-full p-3 bg-red-500 shadow-red-400 shadow-lg rounded-md z-30`}>
        {/* Logo */}
        <div className='nav-logo sm:flex hidden'>
          <img src="https://styleshit-pokedex.netlify.app/static/media/pokeball.8b0d0c2b.svg" alt="" className='w-8 mr-1' />
          <h1 className='text-3xl font-bold text-white'>Pokédex</h1>
        </div>

        {/* Sorter */}
        <div className='sorter flex relative bg-white cursor-pointer justify-center items-center px-3 rounded-md hover:bg-gray-100 duration-100' onClick={() => setDropdown(!dropdown)}>
          <h1 className={` text-gray-500 font-bold text-lg cursor-pointer sm:hidden flex justify-center items-center`}>
            {gen.toString().toUpperCase()}
          </h1>

          <h1 className={` dropdown-text ${dropdown ? 'active' : ''} text-gray-500 font-bold text-lg cursor-pointer sm:flex hidden justify-center items-center z-30`}>
            Generation {gen.toString().toUpperCase()}
            <FontAwesomeIcon icon={faCaretUp} className={`ml-2`} />
          </h1>

          <div className={`dropdown ${dropdown ? 'active' : ''} sm:flex hidden flex-col justify-center items-center bg-red-500 shadow-red-400 shadow-lg rounded-b-md absolute w-full overflow-auto overflow-y-hidden`}>
            {generations.map((gen, index) => (
              <a href={`../generation/${gen.toLowerCase()}`} key={index} className={`text-white font-bold bg-red-500 w-full flex justify-center items-center py-2 duration-100 hover:bg-red-400`}>Generation {gen}</a>
            ))}
          </div>
        </div>

        {/* Search Bar */}
        <div className={`search-bar ${searchBar ? 'active' : ''} flex flex-row-reverse bg-white items-center rounded-md overflow-auto overflow-x-hidden`}>
          {/* Magni */}
          <div className={`flex justify-center items-center h-full px-3 ${searchValue ? 'bg-blue-500' : 'bg-white'} cursor-pointer duration-100`} onMouseEnter={() => setSerchBar(true)} onClick={search}>
            <FontAwesomeIcon icon={faMagnifyingGlass} className={`${searchValue ? 'text-white' : 'text-gray-500'}`} />
          </div>

          {/* Input */}
          <input type="text" className='border-none outline-none px-2 w-full' value={searchValue} onBlur={() => !searchValue ? setSerchBar(false) : setSerchBar(true)} onChange={(event) => setSearchValue(event.target.value)} onKeyDown={(event) => event.key == "Enter" ? search() : ''}/>
        </div>
      </div>


      {/* Small Sorter */}
      <div className={`small-sorter sm:hidden flex flex-col bg-red-500 fixed right-0 overflow-auto overflow-x-hidden ${dropdown ? 'w-full' : 'w-0'} h-screen top-0 z-50`}>
        <FontAwesomeIcon icon={faXmark} className='text-xl w-fit p-3 text-white cursor-pointer' onClick={() => setDropdown(!dropdown)} />

        {generations.map((gen, index) => (
          <a href={`../generation/${gen.toLowerCase()}`} key={index} className={`text-white font-bold bg-red-500 w-full flex justify-center items-center py-5 duration-100 hover:bg-red-400`}>Generation {gen}</a>
        ))}
      </div>
    </>
  )
}

export default Navbar