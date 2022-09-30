import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { motion } from "framer-motion";

import { Droppable, DragDropContext } from "react-beautiful-dnd";
import { collection, getDocs } from 'firebase/firestore';

import Navbar from "../components/navbar";
import { db, } from "../firebase";
import CardsContainer from '../components/cardsContainer';




function Collection() {
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



  const sandboxData = [
    {
      id: 'column-1',
      columnTitle: 'My Collection',
      cards: [
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
      ]
    },
    {
      id: 'column-2',
      columnTitle: 'Wish List',
      cards: [
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
      ]
    },
    {
      id: 'column-3',
      columnTitle: 'Archived',
      cards: [
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
      ]
    },
  ];

  const [columnData, setColumnData] = useState(sandboxData);


  //FIRESTORE DATABASE SERVICES
  const colRef = collection(db, 'watches');



  // useEffect(() => {
  //   const getWatches = async () => {

  //     console.log("Search Database");

  //     getDocs(colRef).then((snapshot) => {
  //       let watches = [];
  //       snapshot.docs.forEach((doc) => {
  //         let watch = {
  //           name: doc.data().name,
  //           dateObtained: new Date(doc.data().dateObtained.seconds*1000).toISOString().slice(0, 10),
  //           pricePurchased: doc.data().pricePurchased,
  //           resaleValue: doc.data().resaleValue,
  //           imgURL: doc.data().imgURL,
  //         }

  //         watches.push({ ...watch, id: doc.id })
  //       })

  //       setCurrentCards(watches);
  //     })
  //     .catch(err => {
  //       console.log("Error in getDocs: ", err.message);
  //     })
  //   }

  //   getWatches();

  // }, [])


  const onDragEnd = result => {
    if (!result.destination) return;
    const { source, destination } = result;

    

    if (source.droppableId !== destination.droppableId) {
      console.log("different container");

      const sourceColIndex = columnData.findIndex(e => e.id === source.droppableId);
      const destinationColIndex = columnData.findIndex(e => e.id === destination.droppableId);

      const sourceCol = columnData[sourceColIndex];
      const destinationCol = columnData[destinationColIndex];

      const sourceCards = [...sourceCol.cards];
      const destinationCards = [...destinationCol.cards];

      const [removed] = sourceCards.splice(source.index, 1);
      destinationCards.splice(destination.index, 0, removed);

      columnData[sourceColIndex].cards = sourceCards;
      columnData[destinationColIndex].cards = destinationCards;

      setColumnData(columnData);
    }
    else{
      console.log("same container");
      
      const sourceColIndex = columnData.findIndex(e => e.id === source.droppableId);
      const sourceCol = columnData[sourceColIndex];
      const sourceCards = [...sourceCol.cards];

      const [reorderedCard] = sourceCards.splice(source.index, 1);
      sourceCards.splice(result.destination.index, 0, reorderedCard);
      columnData[sourceColIndex].cards = sourceCards;

      setColumnData(columnData);

    }
  }


  return (
    <motion.div 
    initial="initial"
    animate="in"
    exit="out"
    variants={pageVariants}
    
    className="Collection w-screen bg-main ">
      <Navbar />

      <main className="mt-10 w-full">
        <DragDropContext onDragEnd={onDragEnd}>

          {columnData.map(column => (
            <Droppable key={column.id} droppableId={column.id} direction="horizontal">

              {(provided) => (
                <div
                {...provided.droppableProps}
                ref={provided.innerRef}>
                  <CardsContainer
                    columnData={column} provided={provided} cards={column.cards} setCards={setColumnData} />
                </div>
              )}
            </Droppable>
          ))}

        </DragDropContext>

      </main>
    </motion.div>
  );
}

export default Collection;
