import React from 'react';
import { motion } from "framer-motion";

import Navbar from "../components/navbar";

import {
  Link
} from "react-router-dom";

import HandGIF from "../assets/gifs/hand.gif";
import ManyGIF from "../assets/gifs/many.gif";
import SubGIF from "../assets/gifs/sub.gif";
import tickingGIF from "../assets/gifs/ticking.gif";
import watchLogo from "../assets/watch_logos.png";
import watchDiagram from "../assets/diagram.png";
import arrow from "../assets/arrow_1.png";

import { BsArrowRight } from "react-icons/bs";

function Home(props) {
  const pageVariants = {
    initial: {
      opacity: 0,
    },
    in: {
      opacity: 1,
    },
    out: {
      opacity: 0,
    },
  }

  return (

    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}

      className="App w-screen bg-main">
      <Navbar />
      <main className="">
        <section className='h-[38rem] w-full grid grid-cols-2 mb-10'>
          <div className='w-full flex items-center justify-center '>
            <h1 className='font-Alegreya text-4xl uppercase w-[30rem]'>INTRODUCING A NEW WAY TO ORGANISE YOUR DREAM WATCH COLLECTION</h1>
          </div>
          <div className='relative w-full h-full'>
            <img className='absolute top-10 left-10 w-96 object-contain' src={ManyGIF} alt="many" />
            <img className='absolute bottom-28 left-40 w-64 object-contain' src={tickingGIF} alt="ticking" />
            <img className='absolute bottom-10  right-40 w-50 object-contain' src={SubGIF} alt="sub" />
            <img className='absolute top-16 right-36 w-96 object-contain' src={HandGIF} alt="hand" />
          </div>
        </section>
        <section className='w-full h-52 flex items-center justify-center border-black border-y-2'>
          <img className='mix-blend-multiply w-2/3' src={watchLogo} alt="Logos" />
        </section>
        <div className='w-full h-[34rem] flex items-center justify-center'>
          <img className=' h-3/4' src={arrow} alt="arrow" />
        </div>
        <div className='w-full h-[34rem] flex items-center justify-center'>
          <img className='mix-blend-multiply  w-1/2' src={watchDiagram} alt="watchDiagram" />
        </div>
        <div className='w-full h-96 font-Alegreya text-xl font-extrabold flex  items-center justify-center'>
          <Link to="/collection" className='flex gap-4 text-center  items-center justify-center'>
            <h3>Start Building Today</h3>
            <BsArrowRight />
          </Link>
        </div>
      </main>
    </motion.div>
  );
}

export default Home;