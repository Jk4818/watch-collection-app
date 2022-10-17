import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Avatar from 'react-avatar';

import { auth } from "../firebase";

import { FiChevronDown } from "react-icons/fi";
import { MdLogout } from "react-icons/md";

function Navbar(props) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState("");

  const [dropdownState, setDropdownState] = useState(false);


  const signOutNavigate = useNavigate();
  function userSignOut() {
    auth.signOut().then(() => {
      console.log("You have been signed out.");
      signOutNavigate('/');
    }).catch((err) => {
      console.log(err);
    })
  }

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        console.log("logged in, ", user.email);
        setUser(user.email);
        setLoggedIn(true);
      } else {
        console.log("logged out");
        setLoggedIn(false);
      }
    })
  }, [])


  return (

    <div className="w-screen h-20 flex items-center p-4 lg:pr-8 justify-between">
      <div className="font-extrabold text-4xl uppercase font-Alegreya"><Link to="/">wc.</Link></div>

      {(!loggedIn ?
        <div className='flex gap-4 items-center'>
          <button className='relative group text-center'>
            <Link to="/login">Log In</Link>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all group-hover:w-full"></span>
          </button>
          <div className="border-2 p-2 border-black text-xl font-Actor shadow-[4px_5px_0_rgb(0,0,0)] hover:shadow-[0px_2px_0px_rgb(0,0,0)] ease-out hover:translate-y-1 hover:translate-x-1 transition-all"><Link to="/signup">Start Collection</Link></div>
        </div>

        :

        <div>
          <ul className='w-16 h-full flex group items-center cursor-pointer' onClick={() => setDropdownState(!dropdownState)}>
            <li className='flex items-center justify-center h-full w-8 group-focus:border-2 border-black'>
              <Avatar size="30" round={true} name={user} textSizeRatio={2.5} />
            </li>
            <li className='flex items-center justify-center h-full w-8  flex-grow group-hover:translate-y-1 transition-all'>
              <FiChevronDown />
            </li>
          </ul>

          <AnimatePresence>
            {(dropdownState &&
              <motion.div animate={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: "50%" }} exit={{ opacity: 0, y: "50%" }}
                className='top-16 right-4 lg:right-8 absolute w-40 h-max bg-main rounded-lg border-2 border-black z-50'>
                <ul className='p-2'>
                  <li className='flex items-center text-center gap-2 cursor-pointer hover:text- transition-all' onClick={() => userSignOut()}><MdLogout /> Log Out</li>
                </ul>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      )}

    </div>
  );
}

export default Navbar;