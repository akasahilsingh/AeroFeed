import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
  return (
    <div className='mx-8 sm:mx-16 xl:mx-24 relative'>
      <div className='text-center mt-20 mb-8'>
        <img src={assets.gradientBackground} alt="gradient background" className='absolute -top-50 -z-1 opacity-50'/> 
      <h1 className='text-3xl sm:text-6xl font-semibold sm:leading-16 text-gray-700'>
        Your Own <span className='text-primary'>Blogging</span> <br /> Platfrom.
      </h1>
      <p className='my-6 sm:my-8 max-w-2xl m-auto max-sm:text-xs'>This is your space to think out loud, to share what matters, and to write without filters. Whether it's one word or a thousand, your story starts right here.</p>
      <form className='flex justify-between max-w-lg max-sm:scale-75 mx-auto border border-gray-300 bg-white rounded overflow-hidden'>
        <input type="text" placeholder='Search for blogs' className="w-full pl-4 outline-none" required />
        <button type="submit" className='bg-primary text-white px-8 py-2 m-1.5 rounded hover:scale-105 transition-all cursor-pointer'>Search</button>
      </form>
      </div>
      
    </div>
  )
}

export default Header
