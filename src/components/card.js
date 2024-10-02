import React from 'react';
import { GoDotFill } from "react-icons/go";// Importing the add icon
import { PiDotsThree } from 'react-icons/pi'; // Importing the three-dot menu icon

const Card = ({ ticket }) => {
  return (
    <div className="card">
      {/* Header of the card with add and three-dot menu icons */}
      <div className="card-header">
      <div className="checkbox-title">
  <input className='check' type="checkbox" id={`checkbox-${ticket.id}`} />
  <label htmlFor={`checkbox-${ticket.id}`} className="custom-checkbox"></label>
</div>

        <h3>{ticket.title}</h3>
      
        </div>
        
        <div className='bottom icon'>
        <div className="card-icons">
          <PiDotsThree className="card-icon" />  
        </div>
        <div className='bottom'> <GoDotFill />
        <h3>Feature request</h3></div>
        </div>
       
      </div>
   
  );
};

export default Card;
