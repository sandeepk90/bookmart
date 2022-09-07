import React from "react";
import { Badge } from "@mui/material";
import {
  PersonOutline,
  Logout,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { logout } from "../redux/userRedux";
import { emptyCart } from "../redux/cartRedux";
import { mobile } from "../responsive";
import Swal from "sweetalert2";

const Container = styled.div`
  width: 100%;
  height: 60px;
  background-color: #06283d;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  color: white;
  ${mobile({ flexDirection: "column", height: "30vh"})}
`;
const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ flexDirection: "column", height: "10vh", width: "70%" })}
`;
const Left = styled.div`
 flex: 1;
  display: flex;
  align-items: center;
  padding-left: 50px;
  ${mobile({ margin:'12px 0'})}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
  flex: 4;
`;

const Input = styled.input`
  border: none;
  flex: 4;
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  cursor: pointer;
  color: white;
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-weight:700;
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  color: white;
`;
const NavbarLink = styled(Link)`
  color: white;
  font-size: 15px;

  font-family: Arial, Helvetica, sans-serif;
  text-decoration: none;
  /* margin: 12px; */
  :hover {
    color: blue;
  }
  /* @media  ( max-width:700px) {
        display: none;
        
    } */
`;

const Navbar = () => {
  const quantity = useSelector((state) => state.cart.quantity);
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(emptyCart());
    Swal.fire({
      icon: "success",
      title: "Logout!",
      text: "Logout Successfully",
      confirmButtonText: "Close",
    });
  };
  return (
    <Container>
      <Wrapper>
        <Left>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Logo>Book Mart</Logo>
          </Link>
        </Left>
        <Right>
          {!user && (
            <>
              <NavbarLink to="/register">
                <MenuItem>REGISTER</MenuItem>
              </NavbarLink>
              <NavbarLink to="/login">
                <MenuItem>SIGN IN</MenuItem>
              </NavbarLink>
            </>
          )}
          {user && (
            <>
              <MenuItem style={{ display: "flex", alignItems: "center" }}>
                <MenuItem style={{ display: "flex", alignItems: "center" }}>
                  <PersonOutline style={{ margin: "0 5px" }} />
                  {user.username?.length > 2
                    ? user?.username.slice(0, 3).toUpperCase()
                    : user.username.toUpperCase()}
                </MenuItem>
                <MenuItem
                  onClick={handleLogout}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <Logout style={{ margin: "0 5px" }} />
                  Logout
                </MenuItem>
              </MenuItem>
            </>
          )}
          <Link to="/cart">
            <MenuItem>
              <Badge badgeContent={`${quantity}`} color="warning">
                <ShoppingCartOutlined />
              </Badge>
            </MenuItem>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  );
};
export default Navbar;
