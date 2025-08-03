import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loading from '../assets/Loading4.webm'
import Breadcrums from '../components/Breadcrums';
import { IoCartOutline } from 'react-icons/io5';
import { useCart } from '../context/CartContext';

const SingleProduct = () => {
  const params = useParams()
  const [singleProduct, setSingleProduct] = useState("")
  const { addToCart } = useCart();

  const getSingleProduct = async () => {
    try {
      const res = await axios.get(`https://fakestoreapi.in/api/products/${params.id}`);
      const product = res.data.product;
      setSingleProduct(product)
      // console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getSingleProduct()
  }, [])

  const originalPrice = Math.round(singleProduct.price + (singleProduct.price * singleProduct.discount / 100))

  return (
    <div>
      {
        SingleProduct ? <div className='px-4 pb-4 md:px-0'>
          <Breadcrums title={singleProduct.title} />
          {/* Product Image */}
          <div className='max-w-6xl mx-auto md:p-6 grid grid-cols-1 md:grid-cols-2 gap-10'>
            <div className='w-full'>
              <img src={singleProduct.image}
                alt={singleProduct.title}
                className='rounded-2xl w-full object-cover' />
            </div>

            {/* Product Detail */}
            <div className='flex flex-col gap-6'>
              <h1 className='md:text-3xl text-xl font-bold to-gray-800'>
                {singleProduct.title}
              </h1>
              <div className='to-gray-700'>
                {singleProduct.brand?.toUpperCase()}
                / {singleProduct.category?.toUpperCase()} / {singleProduct.model}
              </div>

              <p className='text-xl text-red-500 font-bold'>
                ${singleProduct.price} <span className='line-through to-gray-700'>
                  ${originalPrice}
                </span> <span className='bg-red-500 text-white px-4 py-2 rounded-full'>
                  {singleProduct.discount}% discount
                </span>
              </p>
              <p className='to-gray-600'>{singleProduct.description}</p>

              {/* Quantity Selector */}
              <div className='flex items-center gap-4'>
                <label htmlFor="" className='text-sm font-medium text-gray-700'>Quantity:</label>
                <input type="number" defaultValue={1} min={1}
                  className='w-20 border bg-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-red-500' />
              </div>

              <div className='flex gap-4 mt-4'>
                <button onClick={() => addToCart(singleProduct)} className='px-6 flex gap-2 py-2 text-lg bg-red-500 text-white rounded-md cursor-pointer'>
                  <IoCartOutline className='w-6 h-6' />Add To Cart</button>
              </div>
            </div>
          </div>
        </div> :
          <div className='flex items-center justify-center h-screen'>
            <video muted autoPlay loop>
              <source src={Loading} type='video/webm' />
            </video>
          </div>
      }
    </div>
  )
}

export default SingleProduct
