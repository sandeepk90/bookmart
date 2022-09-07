import React, { useEffect, useState } from "react";
import { userRequest } from "../../requestMethods";
import './widgetSm.css';
import { Visibility } from "@mui/icons-material";

export default function WidgetSm() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await userRequest.get("users/?new=true");
        setUsers(res.data);
      } catch {}
    };
    getUsers();
  }, []);

  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {users.map((user) => (
          <li className="widgetSmListItem" key={user._id}>
            <img
              src={
                user.img ||
                "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"
              }
              alt=""
              className="widgetSmImg"
            />
            <div className="widgetSmUser">
              <span className="widgetSmUsername">{user.email}</span>
            </div>
            <button className="widgetSmButton">
              {/* <Visibility className="widgetSmIcon" /> */}
              {user.username}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}