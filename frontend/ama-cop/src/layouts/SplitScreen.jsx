
import React from 'react'

function SplitScreen({ left: Left, right: Right }) {
  return (
    <div className='flex'>
      <div className='bg-slate-700 p-4 hidden md:block md:w-[15%]'>
        <Left />
      </div>
      <div className='bg-gray-200 p-4 w-[100%] md:w-[85%]'>
        <Right />
      </div>
    </div>
  )
}

export default SplitScreen