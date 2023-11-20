import React from "react";
import { Link } from "react-router-dom";

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
  return (
    <nav className="navbar animated-fade-in">
      <div className="container">
        <div className="nav-item">
          <Link to="/" className="nav-link">
            <h3 className="text-primary">Character Maker</h3>
          </Link>
        </div>
        <div className="nav-item">
          <Link to="/character" className="nav-link">
            <h3 className="text-primary">Character List</h3>
          </Link>
        </div>
        <div className="nav-item">
          <Link to="/gmGames" className="nav-link">
            <h3 className="text-primary">Gm Games</h3>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
