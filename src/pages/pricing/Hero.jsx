import React from 'react'

export const HeroSectionPricing = () => {
  return (
    <div className='mt-5 flex justify-center items-center'>
        <form  className='flex flex-col gap-10 max-w-[1000px] items-center'>
            <button className='bg-blue-50 text-blue-600 px-4 py-2 hover:bg-blue-100 rounded-xl font-semibold cursor-pointer'>Meet the new Noble AI</button>
            <h1 className='text-6xl text-center mb-4 font-bold'>One tool for your whole company.
            Free for teams to try.</h1>
            <div className="logos flex gap-3">
                <img className='w-[100px]' src="R.svg" alt="" />
                <img className='w-[100px]' src="S.svg" alt="" />
                <img className='w-[100px]' src="T.svg" alt="" />
                <img className='w-[100px]' src="V.svg" alt="" />
                <img className='w-[100px]' src="F.svg" alt="" />
            </div>
        </form>
    </div>
  )
}
