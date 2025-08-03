import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Loading from '../assets/Loading4.webm'
import ProductListView from '../components/ProductListView'
import { IoChevronBackOutline } from "react-icons/io5";

const CategoryProduct = () => {
  const [searchData, setSearchData] = useState([])
  const navigate = useNavigate()
  const params = useParams()
  const category = params.category

  const getFilterData = async () => {
    const res = await axios.get(`https://fakestoreapi.in/api/products/category?type=${category}`);
    const data = res.data.products;
    setSearchData(data)
    console.log(data);
  }

  useEffect(() => {
    getFilterData();
    window.scrollTo(0, 0)
  }, [])

  return (
    <div>
      {
        searchData.length > 0 ? (
          <div className='max-w-6xl mx-auto mt-10 mb-10 px-4'>
            <button onClick={() => navigate('/')} className='bg-gray-800 mb-5 text-white px-3 py-1 rounded-md cursor-pointer flex gap-1 items-center'>
              <span><IoChevronBackOutline />
              </span> Back
            </button>
            {
              searchData.map((product, id) => {
                return (
                  <ProductListView key={id} product={product} />
                )
              })
            }
          </div>) :
          (<div className='flex items-center justify-center h-[400px]'>
            <video muted autoPlay loop>
              <source src={Loading} type='video/webm' />
            </video>
          </div>)
      }
    </div>
  )
}

export default CategoryProduct
