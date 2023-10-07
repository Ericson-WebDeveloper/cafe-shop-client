import React from 'react'

// type Props = {}

const TopBar = React.memo(() => {
  return (
    <div className='w-full h-[75px] flex bg-red-500'>
        <div className='w-full h-full flex justify-center items-center'>
            <h1 className='text-xl text-gray-200 font-serif'>Free Delivery upon order over PHP 249.00 </h1>
        </div>
    </div>
  )
})

export default TopBar