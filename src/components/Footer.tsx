import React from 'react'

// type Props = {}

const Footer = React.memo(() => {
  return (
    <div className='w-full h-auto md:h-[150px] bg-black bottom-0'>
        <div className='w-full h-full flex flex-col md:flex-row space-y-4 md:space-y-0 text-white font-sans text-lg'>
            <div className='flex flex-col flex-1 justify-center items-center'>
                <h1 className='text-sm md:text-lg font-sans font-semibold text-center'>Cafe Shop</h1>
                <h1 className='text-sm md:text-lg font-sans font-semibold text-center'>Github Link: </h1>
            </div>
            <div className='w-full h-full flex flex-col flex-1 justify-center items-center'>
                <h1 className='text-sm md:text-lg font-sans font-semibold'>Tech Stack</h1>
                <div className='flex w-full space-x-6 justify-center md:justify-between'>
                    <ul className='flex flex-col flex-1 justify-center items-center'>
                        <li className='text-sm md:text-lg font-sans font-semibold'>React</li>
                        <li className='text-sm md:text-lg font-sans font-semibold'>Typescript</li>
                        <li className='text-sm md:text-lg font-sans font-semibold text-center'>Node JS</li>
                    </ul>
                    <ul className='flex flex-col flex-1 justify-center items-center'>
                        <li className='text-sm md:text-lg font-sans font-semibold'>Express</li>
                        <li className='text-sm md:text-lg font-sans font-semibold text-center'>Mongo - DB</li>
                        <li className='text-sm md:text-lg font-sans font-semibold'>Stripe</li>
                    </ul>
                    <ul className='flex flex-col flex-1 justify-center items-center'>
                        <li className='text-sm md:text-lg font-sans font-semibold'>Paypal</li>
                        <li className='text-sm md:text-lg font-sans font-semibold text-center'>Hostinger VPS</li>
                    </ul>
                </div>
            </div>
            <div className='w-full h-full flex flex-1 justify-center items-center'>
                <h1 className='text-sm md:text-lg font-sans font-semibold'>For Portfolio Purpose</h1>
            </div>
        </div>
    </div>
  )
})

export default Footer