import { Add, Remove } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { publicRequest } from "../requestMethods";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Books from "../components/Books";
import { addBook } from "../redux/cartRedux";
import { useDispatch } from "react-redux";
import { mobile } from "../responsive";
import Swal from "sweetalert2";

const Container = styled.div``;
const Wrapper = styled.div`
  padding: 30px;
  display: flex;
  ${mobile({ flexDirection: "column"})}
`;

const ImgContainer = styled.div`
  flex: 1;
  /* height: 80vh;
  width: 50%;
  padding-left: 50px;
  align-items: center; */
  /* @media (min-width: 700px){
    height: 60vh;
    width: 80%;
} */
  /* padding-right: 30px; */
  /* box-shadow: 0px 0px 10px 3px black; */
  /* border:2px solid black */
`;

const Image = styled.img`
  border: 1px solid black;
  box-shadow: 0px 0px 10px 3px black;
  width: 50%;
  height: 60vh;
  object-fit: cover;
  ${mobile({ height: "40vh", width: "100%" })}
`;
const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  padding: 0px 60px;
  ${mobile({ padding: "10px" })}
`;
const InfoContainer1 = styled.div`
  display: flex;
  width: 100%;
`;
const InfoContainer2 = styled.div`
  display: flex;
  justify-content: space-between;
  width: 70%;
  padding-top: 5px;
  ${mobile({ padding: "10px" })}
`;
const InfoContainer3 = styled.div`
  display: flex;
  justify-content: space-between;
  width: 70%;
  padding-top: 5px;
  ${mobile({ padding: "10px" })}
`;
const Title = styled.h1`
  font-weight: 500;
  color: teal;
  font-style: italic;
  margin-bottom:10px;
`;
const Author = styled.span``;
const ReleaseDate = styled.span``;
const Publisher = styled.span``;
const Desc = styled.p`
  margin: 20px 0px;
  display: flex;
  font-size: 13px;
  color: #4d4b4b;
  line-height:1.5;
  ${mobile({ padding: "10px" })}
  font-style: italic;
`;

const Price = styled.span`
  font-weight: 300;
  font-size: 30px;
`;
const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
  margin-top:10px;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;
  &:hover {
    background-color: teal;
    color: white;
  }
`;

const Book = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [book, setBook] = useState({});
  const [quantity, setQuantity] = useState(1);

  const handleQuantity = (type) => {
    if (type === "dec") {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };

  useEffect(() => {
    const getBook = async () => {
      try {
        const res = await publicRequest.get("/books/find/" + id);
        setBook(res.data);
      } catch (error) {}
    };
    getBook();
  }, [id]);

  const handleClick = () => {
    if(book.inStock === false){
Swal.fire({
  icon: "warning",
  title: "Not Available!",
  text: "Book Is Out Of Stock",
  confirmButtonText: "Close",
});
return;
    }
    dispatch(addBook({ ...book, quantity }));
    setQuantity(1);
    Swal.fire({
      icon: "success",
      title: "Added!",
      text: "Book Added To Cart Successfully",
      confirmButtonText: "Close",
    });
  };

  return (
    <div>
      <Container>
        <Navbar />

        <Wrapper>
          <ImgContainer>
            <Image src={book.img}></Image>
          </ImgContainer>
          <InfoContainer>
            <InfoContainer1>
              <Title>{book.title}</Title>
              <br></br>
              {/* <Publisher>Publisher:Jaico Publishing House</Publisher> */}
            </InfoContainer1>

            <InfoContainer3>
              <Author>
                {" "}
                <b>Author: </b>
                {book.author}{" "}
              </Author>
            </InfoContainer3>

            <InfoContainer2>
              <Publisher>
                {" "}
                <b>Publisher: </b>
                {book.publisher}
              </Publisher>{" "}
            </InfoContainer2>
            <InfoContainer3>
              <Author>
                {" "}
                <b>Available: </b>
                {book.inStock ? "Yes" : "No"}
              </Author>
            </InfoContainer3>
            <br></br>
            <hr style={{ marginBottom: "10px" }}></hr>
            <b>
              <i>About the book </i>
            </b>
            <Desc>{book.desc}</Desc>
            <Price>$ {book.price}</Price>

            <AddContainer>
              <AmountContainer>
                <Remove onClick={() => handleQuantity("dec")} />
                <Amount>{quantity}</Amount>
                <Add onClick={() => handleQuantity("inc")} />
              </AmountContainer>
            </AddContainer>
            <br></br>
            <Button
              // style={book?.inStock ? {cursor:'pointer'}: {cursor:'not-allowed'} }
              onClick={handleClick}
            >
              ADD TO CART
            </Button>
          </InfoContainer>
        </Wrapper>
        {/* <Books/> */}
        {/* <Newsletter /> */}
        <Footer />
      </Container>
    </div>
  );
};
export default Book;
