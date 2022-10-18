import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import {  Draggable } from "react-beautiful-dnd";

import {sandboxWatches} from "../SandboxData";
import { auth, db, } from "../firebase";

import Card from "../components/card";
import NewCard from "../components/newCard";

function CardsContainer({provided, columnData, cardIds, setCards, archiveCards, setArchiveCards }) {

  const [cardData, setCardData] = useState([]);

  //CARD FUNCTIONS


  function addCard(card) {
    const newCards = [...cardData, {
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
    const newCards = [...cardData];
    newCards.splice(index, 1);
    setCards(newCards);
  }

  function archiveCard(index) {
    const currentCard = cardData[index];
    const newArchiveCards = [...archiveCards, currentCard];
    setArchiveCards(newArchiveCards);
    removeCard(index);
  }

  useEffect(() => {

    const getCardData = async (cards) => {
      cards.forEach(function(cardId){
        db.collection('watches').doc(cardId).get().then(doc => {
          let tempCardData = doc.data();
          tempCardData.id = doc.id;
          setCardData(oldArray => [...oldArray, tempCardData]);
          console.log("data: ", tempCardData);
        })
      });


    }

    auth.onAuthStateChanged(user => {
      if (user) {
        getCardData(cardIds);
      }
      else {
        let tempCardData = [];
        cardIds.forEach(function(cardId){
          let obj = sandboxWatches.find(o => o.id === cardId);
          tempCardData.push(obj);
        });
        console.log("data in state: ", tempCardData);
        setCardData(tempCardData);
      }
    })


  }, [cardIds])
  


  return (
    <div className="w-full my-10">
      <div className="px-4 text-2xl  font-Alegreya">{columnData.columnTitle}</div>
      <div className="w-full h-0.5 bg-black"></div>

            <div className="w-full h-96 scrollbar-thumb-rounded-md scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 overflow-x-scroll  flex mt-8 px-4  justify-start items-center gap-12">

              {cardData.map((card, index) => (

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