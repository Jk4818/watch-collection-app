import React, { useState } from 'react';
import { nanoid } from 'nanoid';

import {  Draggable } from "react-beautiful-dnd";


import Card from "../components/card";
import NewCard from "../components/newCard";

function CardsContainer({provided, columnData, cards, setCards, archiveCards, setArchiveCards }) {



  //CARD FUNCTIONS


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



  return (
    <div className="w-full my-10">
      <div className="px-4 text-2xl  font-Alegreya">{columnData.columnTitle}</div>
      <div className="w-full h-0.5 bg-black"></div>

            <div className="w-full h-96 scrollbar-thumb-rounded-md scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 overflow-x-scroll  flex mt-8 px-4  justify-start items-center gap-12">

              {cards.map((card, index) => (

                <Draggable key={card.id} draggableId={card.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.dragHandleProps}
                      {...provided.draggableProps}
                      style={{
                          ...provided.draggableProps.style,
                          opacity: snapshot.isDragging ? '0.5' : '1'
                      }}
                    >

                      <Card index={index} archiveCard={archiveCard} removeCard={removeCard} id={card.id} name={card.name} dateObtained={card.dateObtained} pricePurchased={card.pricePurchased} resaleValue={card.resaleValue} imgURL={card.imgURL} />
                    </div>
                  )}
                </Draggable>

              ))}

              {provided.placeholder}
              <NewCard addCard={addCard} />


            </div>

    </div>
  );
}

export default CardsContainer;