import React, { useState } from "react";
import styled from "styled-components";
import {useLocation} from "react-router-dom"
import Navbar from "../components/Navbar";

import Announcement from "../components/Announcement";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import Books from "../components/Books";
import { mobile } from "../responsive";


const Container = styled.div``;

const Title = styled.h1`
  margin: 20px;
  color: #06283d;
  font-size: 30px;
  font-weight: 1000;
  font-style: italic;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column", padding: "0px 35px" })}
`;

const Filter = styled.div`
  margin: 20px;
`;
const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  color: #06283d;
`;
const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
`;

const Option = styled.option``;

const BookList = () => {

  const location = useLocation();
  const cat = location.pathname.split('/')[2];
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState('newest')

  const handleFilters = (e) => {
    const value = e.target.value;

    setFilters({
      ...filters,
      [e.target.name]:value
    })
  }

  return (
    <div>
      <Container>
        <Navbar />
        {/* <Announcement /> */}
        <Title>{cat}</Title>
        <FilterContainer>
          <Filter>
            <FilterText>Filter By Range:</FilterText>
            <Select
              name="range"
              defaultValue={"default"}
              onChange={handleFilters}
            >
              <Option value={"default"} disabled>
                Range
              </Option>
              <Option value="all">All Price</Option>
              <Option value="5">Under $5</Option>
              <Option value="5-10">$5 - $10</Option>
              <Option value="over10">Over $10</Option>
            </Select>
          </Filter>
          <Filter>
            <FilterText>Sort Books:</FilterText>
            <Select
              name="sort"
              defaultValue={"default"}
              onChange={(e) => setSort(e.target.value)}
            >
              <Option value={"default"} disabled>
                Select
              </Option>
              <Option value="asc">Price (low-high)</Option>
              <Option value="desc">Price (high-low)</Option>
            </Select>
          </Filter>
        </FilterContainer>
        <Books cat={cat} filters={filters} sort={sort} />
        {/* <Newsletter /> */}
        <Footer />
      </Container>
    </div>
  );
};
export default BookList;
