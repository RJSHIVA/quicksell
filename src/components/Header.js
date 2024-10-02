import React, { useState, useEffect } from 'react';
import './Header.css';
import { BiAbacus } from "react-icons/bi";
import { MdKeyboardArrowDown } from "react-icons/md";

const Header = ({ setGroupBy, setSortBy }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedGroupBy, setSelectedGroupBy] = useState('');  // Track selected "Group By"
  const [selectedSortBy, setSelectedSortBy] = useState('');    // Track selected "Sort By"

  // Load stored preferences from localStorage on component mount
  useEffect(() => {
    const storedGroupBy = localStorage.getItem('groupBy');
    const storedSortBy = localStorage.getItem('sortBy');

    if (storedGroupBy) {
      setSelectedGroupBy(storedGroupBy);
      setGroupBy(storedGroupBy);
    }

    if (storedSortBy) {
      setSelectedSortBy(storedSortBy);
      setSortBy(storedSortBy);
    }
  }, [setGroupBy, setSortBy]);

  // Toggle popup visibility
  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  // Handle "Group By" option change
  const handleGroupByChange = (e) => {
    const value = e.target.value;
    setSelectedGroupBy(value);
    setGroupBy(value);
    localStorage.setItem('groupBy', value); // Save preference to localStorage
    setShowPopup(false); // Close popup after selection
  };

  // Handle "Sort By" option change
  const handleSortByChange = (e) => {
    const value = e.target.value;
    setSelectedSortBy(value);
    setSortBy(value);
    localStorage.setItem('sortBy', value); // Save preference to localStorage
    setShowPopup(false); // Close popup after selection
  };

  return (
    <div className="navbar">
      <button className="popup-btn" onClick={togglePopup}>
        <BiAbacus /> Display <MdKeyboardArrowDown />
      </button>

      {showPopup && (
        <div className="popup">
          <div className="group-by">
            <h3>Grouping</h3>
            <select value={selectedGroupBy} onChange={handleGroupByChange}>
              <option value="">Select Group By</option>
              <option value="status">Status</option>
              <option value="user">User</option>
              <option value="priority">Priority</option>
            </select>
          </div>
          <div className="sort-by">
            <h3>Ordering</h3>
            <select value={selectedSortBy} onChange={handleSortByChange}>
              <option value="">Select Sort By</option>
              <option value="priority">Priority</option>
              <option value="title">Title</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
