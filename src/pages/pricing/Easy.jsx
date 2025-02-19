import React from 'react'

export const Easy = () => {
  return (
    <div className='flex items-end h-[500px]'>
        <div className="left">
            <img className='w-[260px]' src="easy.avif" alt="" />
        </div>
        <div className="right p-4 flex flex-col gap-4 mb-30 ml-37">
            <div className='text-center'>
                <img className='w-[80px] ml-34' src="N.avif" alt="" />
                <h1 className='text-[40px] font-semibold tracking-tight'>Try Noble Today</h1>
                <p className='text-center text-[20px] text-[#818181] font-semibold'>Get started for free.</p>
                <p className=' text-[20px] text-[#818181] font-semibold'>Add your whole team as your needs grow.</p>
            </div>
            <div className='text-center '>
                <button className='bg-[#262521] text-white font-semibold px-4 py-2 rounded-md cursor-pointer hover:bg-[#37352F]'>Try Noble free</button>
                <p className='text-[#818181] mt-4 font-semibold'>On a big team ?<a className='hover:text-blue-600' href='https://google.com'><u>Request a demo</u></a></p>
            </div>
        </div>
    </div>
  )
}
