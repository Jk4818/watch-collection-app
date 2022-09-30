import React from 'react';
import {Link} from 'react-router-dom';

function Navbar(props) {
  return (

    <div className="w-screen h-20 flex items-center p-4">
      <div className="font-extrabold text-4xl uppercase font-Alegreya"><Link to="/">wc.</Link></div>
    </div>
  );
}

export default Navbar;