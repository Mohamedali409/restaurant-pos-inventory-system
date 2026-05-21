import { FaCog, FaSignOutAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { getDefaultPathByRole } from "../../../Routers/ProtectedRoute";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate(getDefaultPathByRole(localStorage.getItem("role")));
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.left}>
        <div className={styles.logo}>POS</div>
        <div>
          <div className={styles.title}>Restaurant POS</div>
          <div className={styles.subtitle}>Cashier: Admin User</div>
        </div>
      </div>
      <div className={styles.icons}>
        <Link to="/" className={styles.iconBtn}>
          <FaCog />
        </Link>
        <button
          onClick={logout}
          className={`${styles.iconBtn} ${styles.iconBtnRed}`}>
          <FaSignOutAlt />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
