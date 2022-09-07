import styled from "styled-components";
import { categories } from "../data";
import {mobile} from '../responsive';
import CategoryItem from "./CategoryItem";

const Container = styled.div`
  display: flex;
  padding: 10px 60px;
  margin:10px 60px;
  width:82%;
  flex-wrap:wrap;
  justify-content: space-between;
  ${mobile({ padding: "0px", flexDirection: "column",margin:'0px 33px' })}
`;
const Header = styled.h1`
  width: 100%;
  display: flex;
  margin: 6px;
  padding: 6px;
  justify-content: center;
  color: #06283d;
  ${mobile({ padding: "0px", margin: "15px 0px" })}
`;

const Categories = () => {
  return (
    <>
      <Header>
        <span style={{padding:'0 20px',borderBottom:'3px solid teal'}}>Featured Books</span>
      </Header>
      <Container>
        {categories.map((item) => (
          <CategoryItem item={item} key={item.id} />
        ))}
      </Container>
    </>
  );
};

export default Categories;