import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";

import { Droppable, DragDropContext } from "react-beautiful-dnd";
import { collection, getDocs } from 'firebase/firestore';

import { auth, db, } from "../firebase";
import CardsContainer from '../components/cardsContainer';

import {sandboxData} from "../SandboxData";




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




  const [columnData, setColumnData] = useState([
  {
    id: 'column-1',
    columnTitle: 'My Collection',
    cards: []
  },
  {
    id: 'column-2',
    columnTitle: 'Wish List',
    cards: []
  },
  {
    id: 'column-3',
    columnTitle: 'Archived',
    cards: []
  }]);


  //FIRESTORE DATABASE SERVICES


  useEffect(() => {
    const getWatches = async (userUid) => {

      console.log("Search Database");

      // db.collection('watches').onSnapshot(snapshot => {
      //   let watches = [];
      //   snapshot.docs.forEach((doc) => {
      //     let watch = {
      //       name: doc.data().name,
      //       dateObtained: new Date(doc.data().dateObtained.seconds * 1000).toISOString().slice(0, 10),
      //       pricePurchased: doc.data().pricePurchased,
      //       resaleValue: doc.data().resaleValue,
      //       imgURL: doc.data().imgURL,
      //     }

      //     watches.push({ ...watch, id: doc.id })
      //   });

      //   setColumnData(
      //     [{
      //       id: 'column-1',
      //       columnTitle: 'My Collection',
      //       cards: watches
      //     },
      //     {
      //       id: 'column-2',
      //       columnTitle: 'Wish List',
      //       cards: []
      //     },
      //     {
      //       id: 'column-3',
      //       columnTitle: 'Archived',
      //       cards: []
      //     }]
      //   );
      //   console.log(watches);
      //   console.log("getting data");
      // }, err => {
      //   console.log("Error in getDocs: ", err.message);
      // });

      db.collection('users').doc(userUid).get().then(doc => {
        setColumnData(doc.data().collection);
        console.log("Received all data");
      })
    }


    auth.onAuthStateChanged(user => {
      if (user) {
        getWatches(user.uid);
      }
      else {
        console.log("Default sandbox");
        setColumnData(sandboxData);
      }
    })

  }, []);


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
    else {
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

      <main className="mt-10 w-full">
        <DragDropContext onDragEnd={onDragEnd}>

          {columnData.map(column => (
            <Droppable key={column.id} droppableId={column.id} direction="horizontal">

              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}>
                  <CardsContainer
                    columnData={column} provided={provided} cardIds={column.cards} setCards={setColumnData} />
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
