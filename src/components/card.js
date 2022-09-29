import React, { useState } from 'react';

import { IoMdClose } from 'react-icons/io';

function Card({ index, removeCard, id, name, dateObtained, pricePurchased, resaleValue, imgURL }) {



  return (
    <div

      className="relative w-80 h-80 p-4 border-2 bg-main border-black aspect-square rounded-xl flex flex-col gap-2 font-Actor group transition-all hover:-translate-y-1">

      <button className='absolute flex -top-4 -left-4 w-8 h-8  justify-center items-center text-center  bg-main border-2 border-black rounded-full text-xl hover:bg-white transition-all opacity-0 group-hover:opacity-100'
        onClick={() => removeCard(index)}>
        <IoMdClose />
      </button>

      <div className='w-full h-full'>
        <div className='w-full h-2/3 flex justify-center'>
          <img
            className='h-full'
            src={imgURL}
            alt={name}
          />
        </div>
        <div className='w-full h-1/3'>
          <h1 className='w-full overflow-hidden whitespace-nowrap text-xl text-center text-ellipsis'>{name}</h1>
          <ul className='text-sm pt-2 '>
            <li>Date Obtained: {dateObtained}</li>
            <li>Price Purchased: {pricePurchased}</li>
            <li>Resale Value: ${resaleValue}</li>
            <li className='text-[0.5rem]'>ID: {id}</li>
          </ul>
        </div>
      </div>



    </div>
  );
}

export default Card;