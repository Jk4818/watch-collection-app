import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import { collection, getDocs } from 'firebase/firestore';

import Navbar from "../components/navbar";
import {db, } from "../firebase";
import CardsContainer from '../components/cardsContainer';




function App() {


  const [currentCards, setCurrentCards] = useState([
    {
      id: nanoid(),
      name: "Omega Speedmaster Professional Moonwatch",
      dateObtained: "13/01/22",
      pricePurchased: "2500",
      resaleValue: "3000",
      imgURL: "https://www.omegawatches.com/media/catalog/product/cache/a5c37fddc1a529a1a44fea55d527b9a116f3738da3a2cc38006fcc613c37c391/o/m/omega-speedmaster-moonwatch-31130423001005-l.png",
    },
    {
      id: nanoid(),
      name: "Rolex Datejust 41mm",
      dateObtained: "13/01/22",
      pricePurchased: "2500",
      resaleValue: "3000",
      imgURL: "https://content.rolex.com/dam/2022/upright-bba/m126333-0010.png?impolicy=v6-upright",
    },
    {
      id: nanoid(),
      name: "Omega Seamaster Professional 300m",
      dateObtained: "13/01/22",
      pricePurchased: "2500",
      resaleValue: "3000",
      imgURL: "https://www.omegawatches.com/media/catalog/product/cache/a5c37fddc1a529a1a44fea55d527b9a116f3738da3a2cc38006fcc613c37c391/o/m/omega-seamaster-diver-300m-21030422004001-l.png",
    },
    {
      id: nanoid(),
      name: "Grand Seiko White Birch",
      dateObtained: "13/01/22",
      pricePurchased: "2500",
      resaleValue: "3000",
      imgURL: "https://www.grand-seiko.com/uk-en/-/media/Images/Product--Image/All/GrandSeiko/2022/02/19/23/14/SLGH005G/SLGH005G.png",
    },
    {
      id: nanoid(),
      name: "Breitling Navitimer",
      dateObtained: "13/01/22",
      pricePurchased: "2500",
      resaleValue: "3000",
      imgURL: "https://www.breitling.com/media/image/2/gallery_square_700/asset-version-4a836d168b/ab0139211g1p1-navitimer-b01-chronograph-41-soldier.png",
    },
  ]);

  const [prospectCards, setProspectCards] = useState([
    {
      id: nanoid(),
      name: "Omega Speedmaster Professional Moonwatch",
      dateObtained: "13/01/22",
      pricePurchased: "2500",
      resaleValue: "3000",
      imgURL: "https://www.omegawatches.com/media/catalog/product/cache/a5c37fddc1a529a1a44fea55d527b9a116f3738da3a2cc38006fcc613c37c391/o/m/omega-speedmaster-moonwatch-31130423001005-l.png",
    },
    {
      id: nanoid(),
      name: "Breitling Navitimer",
      dateObtained: "13/01/22",
      pricePurchased: "2500",
      resaleValue: "3000",
      imgURL: "https://www.breitling.com/media/image/2/gallery_square_700/asset-version-4a836d168b/ab0139211g1p1-navitimer-b01-chronograph-41-soldier.png",
    },
  ]);

  const [archiveCards, setArchiveCards] = useState([
    {
      id: nanoid(),
      name: "Rolex Datejust 41mm",
      dateObtained: "13/01/22",
      pricePurchased: "2500",
      resaleValue: "3000",
      imgURL: "https://content.rolex.com/dam/2022/upright-bba/m126333-0010.png?impolicy=v6-upright",
    },
    {
      id: nanoid(),
      name: "Grand Seiko White Birch",
      dateObtained: "13/01/22",
      pricePurchased: "2500",
      resaleValue: "3000",
      imgURL: "https://www.grand-seiko.com/uk-en/-/media/Images/Product--Image/All/GrandSeiko/2022/02/19/23/14/SLGH005G/SLGH005G.png",
    },
  ]);


  
  //FIRESTORE DATABASE SERVICES
  const colRef = collection(db, 'watches');



  useEffect(() => {
    const getWatches = async () => {
    
      console.log("Search Database");

      getDocs(colRef).then((snapshot) => {
        let watches = [];
        snapshot.docs.forEach((doc) => {
          let watch = {
            name: doc.data().name,
            dateObtained: new Date(doc.data().dateObtained.seconds*1000).toISOString().slice(0, 10),
            pricePurchased: doc.data().pricePurchased,
            resaleValue: doc.data().resaleValue,
            imgURL: doc.data().imgURL,
          }
    
          watches.push({ ...watch, id: doc.id })
        })
    
        setCurrentCards(watches);
      })
      .catch(err => {
        console.log("Error in getDocs: ", err.message);
      })
    }

    getWatches();

  }, [])
  








  return (
    <div className="App w-screen bg-main">
      <Navbar />

      <main className="mt-10">
        <CardsContainer cards={currentCards} setCards={setCurrentCards} archiveCards={archiveCards} setArchiveCards={setArchiveCards}/>
        {/* <CardsContainer type="wishList" cards={prospectCards} setCards={setProspectCards}/>
        <CardsContainer type="archive" cards={archiveCards} setCards={setArchiveCards}/> */}
      </main>
    </div>
  );
}

export default App;
