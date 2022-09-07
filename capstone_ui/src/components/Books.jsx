import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { popularBooks } from "../data";
import Book from "./Book";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;
const Button = styled.h1`
  font-family: "Poppins";
  font-style: italic;
  padding: 5px;
  color: #de6b28;
`;

const Books = ({ cat, filters, sort }) => {

  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);

  useEffect(() => {
    const getBooks = async () => {
      try {
        const res = await axios.get(
          cat
            ? `http://localhost:5000/api/books?category=${cat}`
            : "http://localhost:5000/api/books"
        );
        setBooks(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getBooks();
  }, [cat]);

  useEffect(() => {
    if (filters?.range === "5") {
      setFilteredBooks(books.filter((item) => item.price <5));
    } else if (filters?.range === "5-10") {
      setFilteredBooks(books.filter((item) => item.price >5 && item.price < 10));
    }else if (filters?.range === "over10"){
      setFilteredBooks(books.filter((item) => item.price > 10));
    }else {
      setFilteredBooks(books.filter((item) => true))
    }
  }, [books, cat, filters]);

  
  useEffect(()=>{
     if (sort === "asc") {
      setFilteredBooks((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    }else{
      setFilteredBooks((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
  )} 
  }, [sort]);
  // console.log(filteredBooks)

  return (
    <>
      {/* <Button>Best Seller</Button> */}
      <Container>
        {cat
          ? filteredBooks.map((item) => <Book item={item} key={item._id} />)
          : books.slice(0,10).map((item) => <Book item={item} key={item._id} />)}
      </Container>
    </>
  );
};

export default Books;
