import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ farmer, onLogout }) => {
  return (
    <>
      <div className="navbar">
        <div className="nav-left">
          <div className="nav-title">🌾 Weather → Crop Advisory</div>

          {/* Navigation Links */}
          <div className="nav-links">
            <Link to="/dashboard">Dashboard</Link>
            
            <Link to="/history">History</Link>
          </div>
        </div>

        <div className="nav-actions">
          {farmer ? (
            <>
              <span className="farmer-name">Hi, {farmer.name}</span>
              <button className="logout-btn" onClick={onLogout}>
                Logout
              </button>
            </>
          ) : (
            <span className="farmer-name">Farmer Portal</span>
          )}
        </div>
      </div>

      {/* CSS INCLUDED INSIDE THIS FILE */}
      <style jsx="true">{`
        .navbar {
          width: 100%;
          padding: 12px 18px;
          background-color: #111;
          color: white;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #333;
        }

        .nav-left {
          display: flex;
          align-items: center;
          gap: 24px;
        }

        .nav-title {
          font-size: 1.1rem;
          font-weight: 700;
        }

        .nav-links {
          display: flex;
          gap: 18px;
        }

        .nav-links a {
          color: #bbb;
          text-decoration: none;
          font-size: 0.95rem;
          transition: 0.2s;
        }

        .nav-links a:hover {
          color: #03dac6;
        }

        .nav-actions {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .farmer-name {
          color: #ddd;
          font-size: 0.95rem;
        }

        .logout-btn {
          background-color: #e63946;
          border: none;
          padding: 6px 12px;
          border-radius: 6px;
          color: white;
          cursor: pointer;
          font-weight: 600;
          transition: 0.2s;
        }

        .logout-btn:hover {
          background-color: #c62828;
        }

        /* Mobile */
        @media (max-width: 600px) {
          .navbar {
            flex-direction: column;
            gap: 10px;
          }

          .nav-left {
            flex-direction: column;
            gap: 8px;
          }

          .nav-links {
            gap: 12px;
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;
