import React from 'react';
import Card from './card';
import './KanbanBoard.css';
import { IoIosAddCircleOutline } from "react-icons/io"; 
import { PiDotsThree } from "react-icons/pi";

const KanbanBoard = ({ tickets, users, groupBy, sortBy }) => {
  const priorityDetails = {
    4: { label: 'Urgent', icon: '/Img - High Priority.svg' },
    3: { label: 'High', icon: '/Img - High Priority.svg' },
    2: { label: 'Medium', icon: '/Img - Medium Priority.svg' },
    1: { label: 'Low', icon: '/Img - Low Priority.svg' },
    0: { label: 'No priority', icon: '/no-priority.svg' },
  };

  const groupTickets = (tickets) => {
    if (groupBy === 'user') {
      return users.reduce((acc, user) => {
        acc[user.name] = tickets.filter((ticket) => ticket.userId === user.id);
        return acc;
      }, {});
    } else if (groupBy === 'priority') {
      return tickets.reduce((acc, ticket) => {
        const priority = ticket.priority;
        if (!acc[priority]) acc[priority] = [];
        acc[priority].push(ticket);
        return acc;
      }, {});
    } else {
      return tickets.reduce((acc, ticket) => {
        const status = ticket.status;
        if (!acc[status]) acc[status] = [];
        acc[status].push(ticket);
        return acc;
      }, {});
    }
  };

  const sortTickets = (tickets) => {
    return tickets.sort((a, b) => {
      if (sortBy === 'priority') {
        return b.priority - a.priority;
      } else if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });
  };

  const groupedTickets = groupTickets(tickets);

  const sortedGroupedTickets = Object.keys(groupedTickets).reduce((acc, key) => {
    acc[key] = sortTickets(groupedTickets[key]);
    return acc;
  }, {});

  return (
    <div className="kanban-board">
      {Object.keys(sortedGroupedTickets).map((key) => (
        <div key={key} className="kanban-column">
          <h2>
            {groupBy === 'priority' ? (
              <>
                <img
                  src={priorityDetails[key]?.icon}
                  alt={`${priorityDetails[key]?.label} icon`}
                  className="priority-icon"
                />
                <div className='space-icon'>
                  {` ${priorityDetails[key]?.label} ${sortedGroupedTickets[key].length}`}
                  <div className="add-icon ">
                    <IoIosAddCircleOutline />
                    <PiDotsThree />
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className='space-icon'>
                  {`${key} ${sortedGroupedTickets[key].length} `}
                  <div className="add-icon ">
                    <IoIosAddCircleOutline />
                    <PiDotsThree />
                  </div>
                </div>
              </>
            )}
          </h2>
          {sortedGroupedTickets[key].map((ticket) => {
            const user = users.find(user => user.id === ticket.userId);
            return (
              <Card key={ticket.id} ticket={ticket} user={user} />
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default KanbanBoard;
