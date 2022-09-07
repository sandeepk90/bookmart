import React from "react";
import "./topbar.css";
import {
  NotificationsNone,
  Language,
  Settings,
  PersonOutline,
} from "@mui/icons-material";
import { useSelector } from "react-redux";
import styled from "styled-components";

const MenuItem = styled.div`
  font-size: 20px;
  cursor: pointer;
  margin-left: 25px;
  color: darkblue;
  font-weight: bold;
`;

const Topbar = () => {
  const admin = useSelector((state) => state.user.currentUser);
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">Book Mart</span>
        </div>
        <div className="topRight">
          {/* <img
            src={
              admin.img ||
              "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
            }
            alt=""
            className="topAvatar"
          /> */}
          <MenuItem style={{ display: "flex", alignItems: "center" }}>
            <PersonOutline style={{ margin: "0 5px" }} />
            {admin.username?.length > 2
              ? admin?.username.slice(0).toUpperCase()
              : admin.username.toUpperCase()}
          </MenuItem>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
