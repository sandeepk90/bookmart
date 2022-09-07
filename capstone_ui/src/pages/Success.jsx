import { useEffect, useState } from "react";
import {useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { userRequest } from "../requestMethods";
import { useNavigate, Link } from "react-router-dom";
import { mobile } from "../responsive";
import styled from "styled-components";
import { emptyCart } from "../redux/cartRedux";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://img.freepik.com/free-photo/abstract-blur-defocused-bookshelf-library_1203-9640.jpg?t=st=1658555863~exp=1658556463~hmac=939b9d832c3c2d89606bcba844a6a8bb86fb3cd2eed6d41715969d2b57cc63e2&w=900")
      center;
  background-size: cover;
  display: flex;
 
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.div`
  width: 30%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;
const Order=styled.div`
font-style: italic;
display: flex;

`
const Click=styled.div`
padding-top: 10px;
text-decoration:none;
/* display: flex; */

`
const SuccesButton = styled.button`
  padding: 15px;
  border: 2px solid teal;
  color: white;
  background-color: teal;
  cursor: pointer;
  font-weight: 500;
  &:hover {
    background-color:white;
    color:teal;
  }
`;


const Success = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state.paypalData;
  const cart = location.state.cart;
  const currentUser = useSelector((state) => state.user.currentUser);
  const [orderId, setOrderId] = useState(null);

  const handleClick = () => {
    dispatch(emptyCart());
    navigate("/", {replace:true});
  }

  useEffect(() => {
    const createOrder = async () => {
      try {
        const res = await userRequest.post("/orders", {
          userId: currentUser._id,
          books: cart.books.filter(item => item.quantity !== 0).map((item) => ({
            bookId: item._id,
            quantity: item.quantity,
          })),
          amount: cart.total,
          address: data.purchase_units[0].shipping.address.address_line_1
        });
        setOrderId(res.data._id);
      } catch {}
    };
    data && createOrder();
  }, [cart, data, currentUser]);

  return (
    // <div
    //   style={{
    //     height: "100vh",
    //     display: "flex",
    //     flexDirection: "column",
    //     alignItems: "center",
    //     justifyContent: "center",
    //   }}
    // >
    <Container>
      <Wrapper>
        <Order>
      {orderId
        ? `Order has been created successfully. Your order number is ${orderId}`
        : `Successfull. Your order is being prepared...`}
        </Order>
        {/* <Link to='/'> */}
      {/* <button style={{ padding: 10, marginTop: 20 }}> */}
      <Click>
      <SuccesButton onClick={handleClick}>Go to Homepage</SuccesButton>
      </Click>
      {/* </button> */}
      {/* </Link> */}
      </Wrapper>
      </Container>
    // </div>
  );
};

export default Success;
