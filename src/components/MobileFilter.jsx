import React from 'react'
import { FaFilter } from 'react-icons/fa'
import { getData } from '../context/DataContext'

const MobileFilter = ({ openFilter, setOpenFilter, search, setSearch, brand, setBrand, priceRange, setPriceRange, category, setCategory, handleCategoryChange,
  handleBrandChange }) => {

  const { categoryOnlyData, brandOnlyData } = getData()

  const toggleFilter = () => {
    setOpenFilter(!openFilter)
  }

  return <>
    <div className='bg-gray-100 flex justify-between items-center md:hidden px-4 p-2 mt-5'>
      <h1 className='font-semibold text-xl'>Filters</h1>
      <FaFilter onClick={toggleFilter} className='text-gray-800' />
    </div>
    {
      openFilter ? <div className='bg-gray-100 p-2 md:hidden'>
        <input value={search}
          onChange={(e) => {
            setSearch(e.target.value)
          }}
          type="text" placeholder='Search...'
          className='bg-white p-2 rounded-md border-gray-400 border-2 w-full' />
        {/* Category only data */}
        <h1 className='mt-5 font-semibold text-xl'>Category</h1>
        <div className='flex flex-col gap-2 mt-3'>
          {
            categoryOnlyData?.map((item, id) => {
              return (<div key={id} className='flex gap-2'>
                <input
                  value={item}
                  onChange={handleCategoryChange}
                  type="checkBox" name={item} checked={category === item} className='cursor-pointer' />
                <button className='cursor-pointer uppercase'>{item}</button>
              </div>)
            })
          }
        </div>

        {/* Brand Only Data */}

        <h1 className='mt-5 font-semibold text-xl mb-3'>Brand</h1>
        <select name="" id="" className='cursor-pointer bg-white p-2 border-gray-200 border-2 rounded-md' value={brand} onChange={handleBrandChange}>
          {
            brandOnlyData?.map((item, id) => {
              return <option key={id} value={item}>
                {item.toUpperCase()}
              </option>
            })
          }
        </select>

        {/* Price Range */}
        <h1 className='mt-5 font-semibold text-xl mb-3'>Price Range</h1>
        <div className='flex flex-col gap-2'>
          <label htmlFor="">Price Range: ${priceRange[0]} - ${priceRange[1]}</label>
          <input min="0" max="5000" value={priceRange[1]} onChange={(e) => {
            setPriceRange([priceRange[0], Number(e.target.value)])
          }} type="range" className='cursor-pointer transition-all w-[200px]' />
        </div>
        <button
          onClick={() => {
            setSearch(''),
              setBrand('All'),
              setCategory('All'),
              setPriceRange([0, 5000])
              setOpenFilter(false)
          }}
          className='bg-red-500 text-white rounded-md px-3 py-1 mt-5 cursor-pointer'>Reset Filters</button>


      </div> : null
    }

  </>
}

export default MobileFilter
