import React  from 'react';
import {AnimatePresence} from 'framer-motion';

import {
  BrowserRouter as Router,
  Routes ,
  Route,
} from "react-router-dom";

import Collection from "./Collection";
import Home from "./Home";
import SignUp from './SignUp';
import Login from './Login';
import Navbar from '../components/navbar';


function App() {


  return (
    <Router>
      <AnimatePresence mode="wait">
        <div className='w-screen '>
          <Navbar />
          <Routes >
            <Route exact path="/" element={<Home/>}/>
            <Route path="/collection" element={<Collection/>} />
            <Route path="/signup" element={<SignUp/>} />
            <Route path="/login" element={<Login/>} />
          </Routes >
        </div>
      </AnimatePresence>

    </Router>
  );
}

export default App;
