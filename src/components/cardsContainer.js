import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import { motion } from "framer-motion";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";


import Card from "../components/card";
import NewCard from "../components/newCard";

function CardsContainer({ type, cards, setCards, archiveCards, setArchiveCards }) {

  //FRAMER MOTION ANIMATION
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: "50%" },
    show: {
      opacity: 1, y: 0, transition: {
        duration: 0.5,
      }
    }
  }


  //CARD FUNCTIONS

  function containerTitleSwitch(type) {
    switch (type) {
      case 'wishList': return "Wish List";
      case 'archive': return "Archived";
      default: return "Your Collection";
    }
  }

  function addCard(card) {
    const newCards = [...cards, {
      id: nanoid(),
      name: "Watch 1",
      dateObtained: "13/01/22",
      pricePurchased: "2500",
      resaleValue: "3000",
      imgURL: card.Image_URL,
    }];
    setCards(newCards);
  }

  function removeCard(index) {
    const newCards = [...cards];
    newCards.splice(index, 1);
    setCards(newCards);
  }

  function archiveCard(index) {
    const currentCard = cards[index];
    const newArchiveCards = [...archiveCards, currentCard];
    setArchiveCards(newArchiveCards);
    removeCard(index);
  }

  function handleDragEnd(result){
    if(!result.destination) return;
    const items = Array.from(cards);
    const [reorderData] = items.splice(result.source.index, 1);
    items.splice(result.destination.index,0,reorderData);;
    setCards(items);

  }


  return (
    <div className="w-screen my-10">
      <div className="px-4 text-2xl  font-Alegreya">{containerTitleSwitch(type)}</div>
      <div className="w-screen h-0.5 bg-black"></div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId='cards'>

          {(provided) => (
            <motion.div
              {...provided.droppableProps}
              ref={provided.innerRef}

              // variants={container}
              // initial="hidden"
              // animate="show"
              className="w-full overflow-scroll bg-red-400 flex mt-8 px-4  justify-center items-center gap-12">

              {cards.map((card, index) => (

                <Draggable key={card.id} draggableId={card.id} index={index}>
                  {(provided) => (
                    <motion.div 
                      ref={provided.innerRef}
                      {...provided.dragHandleProps}
                      {...provided.draggableProps}
                    
                      // key={index} variants={item}
                      >

                      <Card index={index} archiveCard={archiveCard} removeCard={removeCard} id={card.id} name={card.name} dateObtained={card.dateObtained} pricePurchased={card.pricePurchased} resaleValue={card.resaleValue} imgURL={card.imgURL} />
                    </motion.div>
                  )}
                </Draggable>

              ))}


              <motion.div variants={item}>
                <NewCard addCard={addCard} />
              </motion.div>

              {provided.placeholder}
            </motion.div>
          )}

        </Droppable>
      </DragDropContext>

    </div>
  );
}

export default CardsContainer;