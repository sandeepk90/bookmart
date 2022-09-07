import React, { useEffect, useState } from 'react';
import './featuredInfo.css';
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import { userRequest } from "../../requestMethods";
// import { useSelector } from "react-redux";

export default function FeaturedInfo() {
  // const admin = useSelector((state) => state.user.currentUser?.isAdmin);
  const [income, setIncome] = useState([]);
  const [perc, setPerc] = useState(0);
  const [totalUsers, setTotalUsers] = useState('');
  const [totalBooks, setTotalBooks] = useState('');

  useEffect(() => {
    const getIncome = async () => {
      try {
        const res = await userRequest.get("orders/income");
        setIncome(res.data);
        setPerc((res.data[1].total * 100) / res.data[0].total - 100);
      } catch {}
    };
    getIncome();
  }, []);

  useEffect(() => {
    const getTotalUsers = async () => {
      try {
        const res = await userRequest.get("users");
        setTotalUsers(res.data.length);
      } catch {}
    };
    getTotalUsers();
  }, []);

  useEffect(() => {
    const getTotalBooks = async () => {
      try {
        const res = await userRequest.get("books");
        setTotalBooks(res.data.length);
      } catch {}
    };
    getTotalBooks();
  }, []);

  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Revanue</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">${income[1]?.total}</span>
          <span className="featuredMoneyRate">
            %{Math.floor(perc)}{" "}
            {perc < 0 ? (
              <ArrowDownward className="featuredIcon negative" />
            ) : (
              <ArrowUpward className="featuredIcon" />
            )}
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Total Users Available</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{totalUsers}</span>
        </div>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Total Books Available</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{totalBooks}</span>
        </div>
      </div>
    </div>
  );
}