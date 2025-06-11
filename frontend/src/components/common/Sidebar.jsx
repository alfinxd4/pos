import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBuilding,
  faFile,
  faHome,
  faCog,
  faAngleDown,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, useRef  } from "react";
 

const Sidebar = () => {
  const location = useLocation();
  const [openMasterData, setOpenMasterData] = useState(false);
  const [openTransactions, setOpenTransactions] = useState(false);

  const isActive = (path) => location.pathname === path;

const isMasterDataActive = [
  "/admin/data/categories",
  "/admin/data/customers",
  "/admin/data/products",
  "/admin/data/roles",
  "/admin/data/suppliers",
  "/admin/data/users",
].includes(location.pathname);

const isTransactionsActive = [
  "/admin/transactions/history"
].includes(location.pathname);


 const toggleMenuMasterData = (e) => {
  e.stopPropagation();
  setOpenMasterData(!openMasterData);
  setOpenTransactions(false); 
};

const toggleMenuTransactions = (e) => {
  e.stopPropagation();
  setOpenTransactions(!openTransactions);
  setOpenMasterData(false);  
};


  const sidebarRef = useRef(null);

useEffect(() => {
  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setOpenMasterData(false);
      setOpenTransactions(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);
  document.addEventListener("touchstart", handleClickOutside); // untuk mobile

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
    document.removeEventListener("touchstart", handleClickOutside);
  };
}, []);


  return (
    <>
      <style>{`
        .nav-link {
          color: rgba(255, 255, 255, 0.5);
          transition: color 0.3s ease;
        }
        .nav-link:hover,
        .nav-link.active {
          color: #fff !important;
        }
        .nav-link svg {
          transition: color 0.3s ease;
          color: inherit;
          width: 20px;
        }
        .submenu {
          background: #fff;
          margin-left: 1rem;
          border-radius: 0.25rem;
        }
        .submenu a {
          color: #343a40 !important;
          font-size: 13px;
          padding: 6px 12px;
          display: block;
          text-decoration: none;
        }
        .submenu a:hover {
          background-color: rgba(0, 0, 0, 0.05);
          color: #000 !important;
        }
        .nav-item:hover .nav-link,
        .nav-link.active {
          color: #fff !important;
        }
      `}</style>

      <div
      ref={sidebarRef}
        className="text-white position-fixed"
        style={{
          backgroundColor: "#4E73DF",
          width: "225px",
          height: "100vh",
          top: 0,
          left: 0,
          zIndex: 1030,
        }}
      >
        <div className="text-center py-4 fw-bold">
          <Link
            to="/admin/dashboard"
            className="text-white text-decoration-none d-flex gap-1 align-items-center justify-content-center"
          >
            <span>POS</span>
            <FontAwesomeIcon icon={faBuilding} size="2x" />
          </Link>
        </div>
        <hr
          className="mx-3"
          style={{
            borderColor: "rgba(255, 255, 255, 0.8)",
            marginTop: "0.5rem",
          }}
        />

        <ul className="nav flex-column px-1 py-3">
          <li className="nav-item mb-2">
            <Link
              to="/admin/dashboard"
              className={`nav-link fw-medium d-flex align-items-center gap-2 ${
                isActive("/admin/dashboard") ? "active" : ""
              }`}
              style={{ fontSize: "14px" }}
            >
              <FontAwesomeIcon icon={faHome} />
              <span>Dashboard</span>
            </Link>
          </li>

          {/* Expandable menu */}
          <li className="nav-item mb-2">
            <div
              className={`nav-link fw-medium d-flex align-items-center justify-content-between ${
                isMasterDataActive ? "active" : ""
              }`}
              onClick={toggleMenuMasterData}
              style={{ fontSize: "14px", cursor: "pointer" }}
            >
              <div className="d-flex align-items-center gap-2">
                <FontAwesomeIcon icon={faCog} />
                <span>Master Data</span>
              </div>
              <FontAwesomeIcon icon={openMasterData ? faAngleDown : faAngleRight} />
            </div>

            {openMasterData && (
              <div className="submenu shadow-sm mt-1 py-2 px-3">
                <Link
                  to="/admin/data/categories"
                  className={`d-block py-1 text-decoration-none ${
                    isActive("/admin/data/categories")
                      ? "fw-bold text-dark"
                      : "text-muted"
                  }`}
                >
                  Categories Data
                </Link>

                <Link
                  to="/admin/data/products"
                  className={`d-block py-1 text-decoration-none ${
                    isActive("/admin/data/products")
                      ? "fw-bold text-dark"
                      : "text-muted"
                  }`}
                >
                  Products Data
                </Link>
                <Link
                  to="/admin/data/suppliers"
                  className={`d-block py-1 text-decoration-none ${
                    isActive("/admin/data/suppliers")
                      ? "fw-bold text-dark"
                      : "text-muted"
                  }`}
                >
                  Suppliers Data
                </Link>
                <Link
                  to="/admin/data/customers"
                  className={`d-block py-1 text-decoration-none ${
                    isActive("/admin/data/customers")
                      ? "fw-bold text-dark"
                      : "text-muted"
                  }`}
                >
                  Customers Data
                </Link>

                <Link
                  to="/admin/data/roles"
                  className={`d-block py-1 text-decoration-none ${
                    isActive("/admin/data/roles")
                      ? "fw-bold text-dark"
                      : "text-muted"
                  }`}
                >
                  Roles Data
                </Link>
                <Link
                  to="/admin/data/users"
                  className={`d-block py-1 text-decoration-none ${
                    isActive("/admin/data/users")
                      ? "fw-bold text-dark"
                      : "text-muted"
                  }`}
                >
                  Users Data
                </Link>
              </div>
            )}
          </li>

{/* Expandable menu */}
          <li className="nav-item mb-2">
            <div
              className={`nav-link fw-medium d-flex align-items-center justify-content-between ${
                isTransactionsActive ? "active" : ""
              }`}
              onClick={toggleMenuTransactions}
              style={{ fontSize: "14px", cursor: "pointer" }}
            >
              <div className="d-flex align-items-center gap-2">
                <FontAwesomeIcon icon={faFile} />
                <span>Transactions</span>
              </div>
              <FontAwesomeIcon icon={openTransactions ? faAngleDown : faAngleRight} />
            </div>

            {openTransactions && (
              <div className="submenu shadow-sm mt-1 py-2 px-3">
                <Link
                  to="/admin/transactions/purchase"
                  className={`d-block py-1 text-decoration-none ${
                    isActive("/admin/transactions/purchase")
                      ? "fw-bold text-dark"
                      : "text-muted"
                  }`}
                >
                  Purchase
                </Link>
                <Link
                  to="/admin/transactions/sale"
                  className={`d-block py-1 text-decoration-none ${
                    isActive("/admin/transactions/sales")
                      ? "fw-bold text-dark"
                      : "text-muted"
                  }`}
                >
                  Sales
                </Link>
                <Link
                  to="/admin/transactions/history"
                  className={`d-block py-1 text-decoration-none ${
                    isActive("/admin/transactions/history")
                      ? "fw-bold text-dark"
                      : "text-muted"
                  }`}
                >
                  History
                </Link>
                
              </div>
            )}
          </li>
          
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
