import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Navigation(){
    return (
        <nav>
        <ul className="flex-row">
          <li className="nav-links">
            <Link to="/featured">
              Featured Music
            </Link>
          </li>
          <li className="nav-links">
            <Link to="/genres">
              Genres
            </Link>
          </li>
          <li className="nav-links">
            <Link to="/About">
              About
            </Link>
          </li>
        </ul>
        </nav>
      );
}

export default Navigation;