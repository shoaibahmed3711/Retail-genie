import React from 'react'
import { FaArrowRightLong } from "react-icons/fa6";

export const Used = () => {
  return (
    <>
    <div className='py-16 flex justify-between items-center'>
        <div className="left w-[500px] flex flex-col gap-5">
            <h1 className='text-[45px] font-semibold leading-11 tracking-tight text-[#191918]'>Used by the world’s most innovative teams</h1>
            <button className='flex gap-3 items-center w-fit cursor-pointer hover:bg-gray-100 font-semibold border border-gray-300 rounded-md px-6 py-2'>Read all customer stories <FaArrowRightLong /></button>
        </div>
        <div className="right">
            <img src="nan.PNG" alt="" />
        </div>
    </div>
    <div className='mb-12'>
        <img src="two.PNG" alt="" />
    </div>
    </>
  )
}
