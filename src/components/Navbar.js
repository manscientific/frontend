import React from "react";
import { Link } from "react-router-dom";
import { 
  FaLeaf, 
  FaUser, 
  FaSignOutAlt, 
  FaTachometerAlt,
  FaHistory,
  FaHome,
  FaSeedling,
  FaCloudSun
} from "react-icons/fa";
import { GiWheat } from "react-icons/gi";
import styles from "./Navbar.module.css";

const Navbar = ({ farmer, onLogout }) => {
  return (
    <nav className={styles.navbar}>
      {/* Logo & Brand */}
      <div className={styles.navBrand}>
        <div className={styles.logo}>
          <FaSeedling className={styles.logoIcon} />
          <div className={styles.logoText}>
            <span className={styles.logoTitle}>AgriSmart</span>
            <span className={styles.logoSubtitle}>AI Crop Advisory</span>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <div className={styles.navLinks}>
        <Link to="/dashboard" className={styles.navLink}>
          <FaTachometerAlt className={styles.linkIcon} />
          <span>Dashboard</span>
        </Link>
        
        <Link to="/" className={styles.navLink}>
          <FaCloudSun className={styles.linkIcon} />
          <span>Advisory</span>
        </Link>
        
        <Link to="/history" className={styles.navLink}>
          <FaHistory className={styles.linkIcon} />
          <span>History</span>
        </Link>
        
        {farmer && (
          <Link to="/profile" className={styles.navLink}>
            <FaUser className={styles.linkIcon} />
            <span>Profile</span>
          </Link>
        )}
      </div>

      {/* User Actions */}
      <div className={styles.userSection}>
        {farmer ? (
          <>
            <div className={styles.userInfo}>
              <div className={styles.userAvatar}>
                <FaUser className={styles.avatarIcon} />
              </div>
              <div className={styles.userDetails}>
                <span className={styles.userName}>Hi, {farmer.name}</span>
                <span className={styles.userRole}>Farmer</span>
              </div>
            </div>
            
            <button className={styles.logoutButton} onClick={onLogout}>
              <FaSignOutAlt className={styles.logoutIcon} />
              <span>Logout</span>
            </button>
          </>
        ) : (
          <div className={styles.authButtons}>
            <Link to="/login" className={styles.loginButton}>
              <FaUser className={styles.buttonIcon} />
              <span>Login</span>
            </Link>
            <Link to="/register" className={styles.registerButton}>
              <FaSeedling className={styles.buttonIcon} />
              <span>Register</span>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;