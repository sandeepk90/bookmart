import React from "react";
import Books from "../components/Books";
import Categories from "../components/Categories";

import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Slider from "../components/Slider";
import styled from "styled-components";
import { mobile } from "../responsive";



const Header = styled.h1`
  width: 100%;
  display: flex;
  margin: 6px;
  padding: 6px;
  justify-content: center;
  color: #06283d;
  ${mobile({ margin: "0px", padding: "0px", width:'95%' })}
`;

const Home = () => {
  return (
    <div
      style={{ display: "flex", flexDirection: "column",
      //  alignItems: "center"
       }}
    >
      <Navbar />
      <Slider/>
      <Categories />
      <Header>
        <span style={{padding:'0 20px',borderBottom:'3px solid teal'}}>Popular Books</span>
      </Header>
      <Books/>
      <Footer/>
    </div>
  );
};

export default Home;
