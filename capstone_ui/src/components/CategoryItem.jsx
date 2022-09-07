import styled from "styled-components";
import {Link} from "react-router-dom";
import { mobile } from "../responsive";

const Container = styled.div`
  flex: 1;
  margin: 25px 40px;
  display: flex;
  justify-content: center;
  border-radius:10px;
  align-items: center;
  min-height:400px;
  height: 50vh;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 0px 5px 0px;
  ${mobile({ height: "20vh",margin:'0px' })}

  position: relative;
`;

const Image = styled.img`
  width: 200px;
  height: 300px;
  object-fit: cover;
  border-radius: 4px;
  &:focus {
    outline: none;
    border-color: red;
  }
`;

const Info = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  width: 200px;
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  color: white;
  font-size: 25px;
  /* width: 80%;
height: 100%; */
  font-weight: 600;
  border: none;
  margin-bottom: 10px;
  text-decoration: none;
  text-align: center;
  &:hover {
    transform: scale(1.1);
  }
`;

const Button = styled.button`
  border: none;
  padding: 10px;
  background-color: white;
  color: gray;
  cursor: pointer;
  font-weight: 600;
  &:hover {
    background-color: teal;
    color: white;
    transform: scale(1.1);
  }
`;

const CategoryItem = ({ item }) => {

  return (
    <Container>
      <Link style={{display:'inline-block', padding:'20px',position:'relative',boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'}} to={`/books/${item.cat}`}>
        <Image src={item.img} />
        <Info>
          <Title>{item.title}</Title>
          <Button>SHOP NOW</Button>
        </Info>
      </Link>
    </Container>
  );
};

export default CategoryItem;