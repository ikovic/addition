import React from 'react';

import { MODE } from './../constants';

const Menu = ({ onModeSelect }) => (
  <div className="menu">
    <h3>Odaberi nacin igre:</h3>
    <div className="menuButtons">
      <button className="menuButton" onClick={() => onModeSelect(MODE.ADDITION)}>
        Zbrajanje
      </button>
      <button className="menuButton" onClick={() => onModeSelect(MODE.SUBTRACTION)}>
        Oduzimanje
      </button>
    </div>
  </div>
);

export default Menu;
