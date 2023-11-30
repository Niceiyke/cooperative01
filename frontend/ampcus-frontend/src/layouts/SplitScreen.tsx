
import React from 'react'

function SplitScreen({ left: Left, right: Right }) {
  return (
    <div className='flex'>
      <div className='hidden md:block '>
        <Left />
      </div>
      <div className='bg-gray-200 w-[100%] md:w-[85%]'>
        <Right />
      </div>
    </div>
  )
}

export default SplitScreen