import React  from 'react';
import {AnimatePresence} from 'framer-motion';

import {
  BrowserRouter as Router,
  Routes ,
  Route,
} from "react-router-dom";

import Collection from "./Collection";
import Home from "./Home";


function App() {


  return (
    <Router>
      <AnimatePresence mode="wait">
        <div className='w-screen overflow-x-hidden'>
          <Routes >
            <Route exact path="/" element={<Home/>}/>
            <Route path="/collection" element={<Collection/>} />
          </Routes >
        </div>
      </AnimatePresence>

    </Router>
  );
}

export default App;
