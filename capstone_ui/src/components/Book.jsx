import {
  FavoriteBorderOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
`;

const Container = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 200px;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5fbfd;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  position: relative;
  &:hover ${Info} {
    opacity: 1;
  }
`;

const Image = styled.img`
  height: 75%;
  z-index: 2;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border: 1px solid teal;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  color: white;
`;

const Button = styled.button`
  border: none;
  padding: 10px 30px;
  border: 1px solid teal;
  border-radius: 4px;
  background-color: white;
  color: teal;
  cursor: pointer;
  font-weight: 600;
  &:hover {
    background-color: teal;
    color:white;
    transform: scale(1.1);
  }
`;

const Book = ({ item }) => {
  return (
    <Container>
      <Image src={item.img} />
      <Info>
          <Link style={{display:'flex', flexDirection:'column',alignItems:'center'}} to={`/book/${item._id}`}>
        <Icon>
            <ShoppingCartOutlined style={{color:'teal'}}/>
        </Icon>
        <Button>$ {item.price}</Button>
          </Link>
      </Info>
    </Container>
  );
};

export default Book;
