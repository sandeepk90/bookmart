import { Add, Remove, DeleteOutline } from "@mui/icons-material";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import {useDispatch, useSelector } from "react-redux";
// import StripeCheckout from "react-stripe-checkout";
import { userRequest } from "../requestMethods";
import {useNavigate, Link} from "react-router-dom";
import {updateBook, deleteBook, emptyCart} from "../redux/cartRedux";
import Swal from "sweetalert2";

import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";




// const KEY = process.env.REACT_APP_STRIPE;
// const Key = "pk_test_51LERl9SDGTA2GkFNxFsT4xpU7aIgZzeXzWdWAyiRZBBWtzkPwMFNMpVzDFDzJGn7eBwohgEN95kFFmnjPgPCuVSY003AjoXwJ6";
// const stripePromise = loadStripe(Key);

const Container = styled.div`background-color: #f9f8f1;`;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 400;
  text-align: center;
  color: teal;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  ${mobile({ flexDirection: "column" })}
`;
const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "#06283d" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
  ${mobile({ margin: "5px" })}
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;
const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;
const Info = styled.div`
  flex: 3;
`;
const Image = styled.img`
  width: 200px;
  padding-bottom: 5px;
  margin: 5px;
  border: 1px solid black;
  box-shadow: 0px 0px 10px 0px black;  
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;
const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;
const ProductDetail = styled.div`
  flex: 2;
  display: flex;
  ${mobile({ flexDirection: "column" , alignItems:'center'})}
`;
const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;
const ProductAuthor = styled.span``;
const ProductPublisher = styled.span``;
const ProductReleaseDate = styled.span``;
const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 2px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;
const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;
const SummaryTitle = styled.h1`
  font-weight: 200;
`;
const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 15px;
  background-color: black;
  color: white;
  font-weight: 300;
  cursor: pointer;
  font-size:20px;
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  color:red;
`;

export const Cart = () => {

  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user.currentUser);
  // console.log(cart)
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleQuantity = (id,type) => {
    dispatch(updateBook({ id, type }));
  };

  const handleEmptyCart = () => {
    dispatch(emptyCart());
    Swal.fire({
      icon: "success",
      title: "Empty!",
      text: "Cart Empty Successfully",
      confirmButtonText: "Close",
    });
  }

  // This values are the props in the UI
  
  const amount = cart.total;
  const currency = "USD";
  const style = { layout: "vertical" };

  // Custom component to wrap the PayPalButtons and handle currency changes
  const ButtonWrapper = ({ currency, showSpinner }) => {
    // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
    // This is the main reason to wrap the PayPalButtons in a new component
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

    useEffect(() => {
      dispatch({
        type: "resetOptions",
        value: {
          ...options,
          currency: currency,
        },
      });
    }, [currency, showSpinner]);

    return (
      <>
        {showSpinner && isPending && <div className="spinner" />}
        <PayPalButtons
          // style={style}
          style={{...style, color: "black" }}
          disabled={cart.total !== 0 ? false: true}
          forceReRender={[amount, currency, style]}
          fundingSource={undefined}
          createOrder={(data, actions) => {
            return actions.order
              .create({
                purchase_units: [
                  {
                    amount: {
                      currency_code: currency,
                      value: amount,
                    },
                  },
                ],
              })
              .then((orderId) => {
                // Your code here after create the order
                return orderId;
              });
          }}
          onApprove={function (data, actions) {
            return actions.order.capture().then(function (details) {
              // Your code here after capture the order
              // console.log(details);
              // const shipping = details.purchase_units[0].shipping;
              // dispatch(emptyCart());

              

              navigate("/success", {
                state: {
                  paypalData: details,
                  cart: cart,
                },
              });
              Swal.fire({
                icon: "success",
                title: "Ordered!",
                text: "Book Ordered Successfully",
                confirmButtonText: "Close",
              });
            });
          }}
        />
      </>
    );
  };

  // const onToken = (token) => {
  //   setStripeToken(token);
  // };

  // useEffect(() => {
  //   const makeRequest = async () => {
  //     try {
  //       const res = await userRequest.post("/checkout/payment", {
  //         // tokenId: stripeToken.id,
  //         // amount: cart.total * 100,
  //         amount: 500,
  //       });
  //       navigate("/success", { replace: true, data: res.data });
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   stripeToken && makeRequest();
  // }, [stripeToken, cart.total, navigate]);

  return (
    <div>
      <Container>
        <Navbar />
        <Wrapper>
          <Title>Your Bag</Title>
          <Top>
            <TopButton style={{ cursor: "default" }}>
              Shopping Bag(
              {cart.books.length === 1
                ? ` ${cart.books.length} book `
                : ` ${cart.books.length} books `}
              )
            </TopButton>
            <TopButton onClick={handleEmptyCart} type="filled">
              EMPTY CART
            </TopButton>
          </Top>
          <Bottom>
            {cart.books.length !== 0 ? (
              <Info>
                {cart.books.map((book) => (
                  <Product key={book._id}>
                    <ProductDetail>
                      <Image src={book.img}></Image>
                      <Details>
                        <ProductName>
                          <b>Title:</b>
                          {book.title}
                        </ProductName>
                        {/* <ProductId>
                          <b>Id:</b>
                          {book._id}
                        </ProductId> */}
                      
                         <ProductAuthor>
                        <b>Author: </b>{book.author}
                      </ProductAuthor>
                      <ProductPublisher>
                        <b>Publisher: </b> {book.publisher}
                      </ProductPublisher>
                      {/* <ProductReleaseDate>
                        <b>Release: </b> 2005
                      </ProductReleaseDate> */} 
                      </Details>
                    </ProductDetail>
                    <PriceDetail>
                      {/* <b>Price:</b> */}
                      <MenuItem
                        style={{
                          margin: "0 0 10px",
                          border: "2px solid red",
                          borderRadius: "10px",
                          width:'30px',
                          height:'30px',
                          display:'flex',
                          justifyContent:'center',
                          alignItems:'center'
                        }}
                      >
                        <DeleteOutline
                          style={{ fontSize:'25px' }}
                          onClick={() => dispatch(deleteBook({ id: book._id }))}
                        />
                      </MenuItem>
                      <ProductAmountContainer>
                        <Remove
                          style={{ cursor: "pointer" }}
                          onClick={() => handleQuantity(book._id, "dec")}
                        />
                        <ProductAmount>{book.quantity}</ProductAmount>
                        <Add
                          style={{ cursor: "pointer" }}
                          onClick={() => handleQuantity(book._id, "inc")}
                        />
                      </ProductAmountContainer>
                      <ProductPrice>
                        $ {book.price * book.quantity}
                      </ProductPrice>
                    </PriceDetail>
                  </Product>
                ))}
                <Hr />
              </Info>
            ) : (
              <Info
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Title>YOUR CART IS EMPTY</Title>
                <Link to="/">
                  <TopButton>Continue Shopping </TopButton>
                </Link>
              </Info>
            )}
            <Summary>
              <SummaryTitle>ORDER SUMMARY</SummaryTitle>
              <SummaryItem>
                <SummaryItemText>Subtotal</SummaryItemText>
                <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem>
                <SummaryItemText>Estimated Shipping</SummaryItemText>
                <SummaryItemPrice>$ 0</SummaryItemPrice>
              </SummaryItem>

              <SummaryItem type="total">
                <SummaryItemText>Total</SummaryItemText>
                <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
              </SummaryItem>

              {user ? (
                <PayPalScriptProvider
                  options={{
                    "client-id":
                      "AdM_gr60TItUjdzy16q5P2CUPX8sra3ZDe_sv4VR9uE0MyfrUiyvqRbgKOCX6amgTBw1VKapPAxKDyBG",
                    components: "buttons",
                    currency: "USD",
                    "disable-funding": "credit,card,p24",
                  }}
                >
                  <ButtonWrapper currency={currency} showSpinner={false} />
                </PayPalScriptProvider>
              ) : (
                <Link to="/login">
                  <Button>Sign In</Button>
                </Link>
              )}
            </Summary>
          </Bottom>
        </Wrapper>
        <Footer />
      </Container>
    </div>
  );
};;
export default Cart;
