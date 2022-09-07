import React from "react";
import "./sidebar.css";
import {
  LineStyle,
  Logout,
  PermIdentity,
  Storefront,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { logout } from "../../redux/userRedux";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";


const Sidebar = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(logout());
    // console.log(JSON.parse(localStorage.getItem("persist:root")));
Swal.fire({
  icon: "success",
  title: "Logout!",
  text: "Logout Successfully",
  confirmButtonText: "Close",
});
  }

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/" className="link">
              <li className="sidebarListItem">
                <LineStyle className="sidebarIcon" />
                Home
              </li>
            </Link>
          </ul>
        </div>

        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quick Menu</h3>
          <ul className="sidebarList">
            <Link to="/users" className="link">
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                Users
              </li>
            </Link>
            <Link to="/books" className="link">
              <li className="sidebarListItem">
                <Storefront className="sidebarIcon" />
                Books
              </li>
            </Link>
          </ul>
        </div>

        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Logout</h3>
          <ul className="sidebarList">
            {/* <Link to="/login" className="link"> */}
            <li onClick={handleClick} className="sidebarListItem">
              <Logout className="sidebarIcon" />
              Logout
            </li>
            {/* </Link> */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
