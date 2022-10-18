import { nanoid } from 'nanoid';
import React, { useState } from 'react';
import { useForm } from "react-hook-form";

import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { auth, db} from "../firebase";

import { AiOutlinePlus } from 'react-icons/ai';
import {BsArrowRightShort} from 'react-icons/bs';

function Card({addCard,}) {

  const colRef = collection(db, 'watches');

  const [form, setForm] = useState(false);

  const { register, handleSubmit } = useForm();
  const onSubmit = data => {

    let newCard = {
      id: nanoid(),
      name: data.Watch_Name,
      dateObtained: Timestamp.fromDate(new Date(data.Date_Obtained)),
      pricePurchased: data.Price_Purchased,
      resaleValue: data.Resale_Value,
      imgURL: data.Image_URL
    }

    auth.onAuthStateChanged(user => {
      if(user){
        addDoc(colRef, newCard).then(() => {
          setForm(false);
        }).catch(err => {
          console.log(err.message);
        });
      }
      else{
        console.log("Failed to add new watch.");
      }

    })
    
  };

  return (
    <div

    className="w-80 h-80 p-4 border-2 border-black aspect-square rounded-xl flex flex-col gap-2 font-Actor">


        <div className='w-full h-full '>
          {form ?
            <div className='w-full h-full flex items-center font-Actor text-xl'>
              <form onSubmit={handleSubmit(onSubmit)} className='h-full w-full flex flex-col '>
                <div className='h-3/4 flex flex-col justify-between whitespace-nowrap'>

                  <div className='flex items-center justify-between gap-3'>
                    <label className='w-max' htmlFor="Date Obtained">Name: </label>
                    <input className='w-full px-2 rounded-lg bg-transparent border-2 border-gray-400' type="text"  placeholder='' {...register("Watch_Name", { required: true, maxLength: 80 })} />
                  </div>

                  <div className='flex items-center justify-between gap-3'>
                    <label className='w-max' htmlFor="Date Obtained">Date Obtained: </label>
                    <input className='w-full px-2 rounded-lg bg-transparent border-2 border-gray-400' name="Date Obtained" type="datetime-local" placeholder='' {...register("Date_Obtained", { required: true, maxLength: 100 })} />
                  </div>

                  <div className='flex items-center justify-between gap-3'>
                    <label htmlFor="Date Obtained">Price Purchased: </label>
                    <input className='w-full px-2 rounded-lg bg-transparent border-2 border-gray-400' type="number" placeholder='' {...register("Price_Purchased", { required: true, min: 0, maxLength: 15 })} />
                  </div>

                  <div className='flex items-center justify-between gap-3'>
                    <label htmlFor="Date Obtained">Resale Value: </label>
                    <input className='w-full px-2 rounded-lg bg-transparent border-2 border-gray-400' type="number"  placeholder='' {...register("Resale_Value", { required: true, min: 0, maxLength: 17 })} />
                  </div>
                  
                  <div className='flex items-center justify-between gap-3'>
                    <label className='w-max' htmlFor="Date Obtained">Image URL: </label>
                    <input className='w-full px-2 rounded-lg bg-transparent border-2 border-gray-400' type="text"  placeholder='' {...register("Image_URL", { required: true})} />
                  </div>
                </div>

                <button className='mt-auto font-bold text-center flex text-lg items-center justify-center'><input type="submit" /><BsArrowRightShort className='text-4xl'/></button>
              </form>
            </div>

            :

            <div className='w-full h-full flex items-center justify-center text-center text-5xl'> <button onClick={() => setForm(true)}>
              <AiOutlinePlus />
            </button>
            </div>

          }
        </div>
      

    </div>
  );
}

export default Card;