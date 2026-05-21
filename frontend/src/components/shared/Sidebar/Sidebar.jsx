import { AiOutlineUser } from "react-icons/ai";
import {
  FaBox,
  FaClipboardList,
  FaCog,
  FaSignOutAlt,
  FaTachometerAlt,
  FaUsers,
} from "react-icons/fa";
import { FiArrowLeft } from "react-icons/fi";
import { HiOutlineX } from "react-icons/hi";
import { MdCategory, MdPointOfSale } from "react-icons/md";
import { Link, NavLink } from "react-router-dom";
import styles from "./Sidebar.module.css";

const Sidebar = ({ isOpen, onClose }) => {
  const role = localStorage.getItem("role");
  const menu = [
    { name: "Dashboard", icon: <FaTachometerAlt />, path: "/Dashboard" },
    { name: "POS", icon: <MdPointOfSale />, path: "/POS" },
    { name: "Products", icon: <FaBox />, path: "/Products" },
    { name: "Categories", icon: <MdCategory />, path: "/Categories" },
    { name: "Inventory", icon: <FaClipboardList />, path: "/Inventory" },
    { name: "Orders", icon: <FaClipboardList />, path: "/Orders" },
    { name: "Customers", icon: <FaUsers />, path: "/Customers" },
    { name: "Users", icon: <AiOutlineUser />, path: "/Users" },
    { name: "Payments", icon: <FaClipboardList />, path: "/Payments" },
    { name: "Reports", icon: <FaClipboardList />, path: "/Reports" },
    { name: "Settings", icon: <FaCog />, path: "/Settings" },
  ];
  const allowedMenu =
    role === "cashier"
      ? menu.filter((item) => item.path === "/POS")
      : menu;

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/auth";
  };

  return (
    <>
      <div
        className={`${styles.overlay} ${isOpen ? styles.overlayVisible : ""}`}
        onClick={onClose}
      />
      <aside
        className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ""}`}
      >
        <button className={styles.closeButton} type="button" onClick={onClose}>
          <HiOutlineX size={20} />
        </button>

        <div>
          <div className={styles.logoWrapper}>
            <div className={styles.logoCircle}>POS</div>
            <div className={styles.logoText}>
              <h5>Restaurant POS </h5>
              <small>Admin Panel</small>
            </div>
          </div>

          <div className={styles.userBox}>
            <AiOutlineUser size={30} />
            <div className={styles.userInfo}>
              <div>Admin User</div>
              <small>Admin</small>
            </div>
          </div>

          <ul className={styles.menu}>
            {allowedMenu.map((item, i) => (
              <NavLink
                key={i}
                className={({ isActive }) =>
                  `text-white text-decoration-none ${styles.menuItem} ${isActive ? styles.active : ""}`
                }
                onClick={onClose}
                to={item.path}
              >
                <span className={styles.icon}>{item.icon}</span>
                {item.name}
              </NavLink>
            ))}
          </ul>
        </div>

        <div className={styles.bottom}>
          <div className={styles.menuItem}>
            <span className={styles.icon}>
              <FiArrowLeft />
            </span>
            <Link className="nav-link" to="pos">
              Back to POS
            </Link>
          </div>

          <div onClick={logout} className={styles.menuItem}>
            <span className={styles.icon}>
              <FaSignOutAlt />
            </span>
            Logout
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
