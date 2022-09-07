import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import BookList from "./pages/BookList";
import Book from "./pages/Book";
import Register from "./pages/Register";
import Success from "./pages/Success";
import { useSelector } from "react-redux";

function App() {
  const user = useSelector((state) => state.user.currentUser);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books/:category" element={<BookList />} />
        <Route path="/book/:id" element={<Book />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/success" element={<Success />} />

        <Route
          path="/login"
          element={user ? <Navigate to="/" replace={true} /> : <Login />}
        />
        <Route
          path="/register"
          element={user ? <Navigate to="/" replace={true} /> : <Register />}
        />
      </Routes>
    </Router>
  );
}

export default App;
