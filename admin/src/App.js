import "./App.css";
import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import BookList from "./pages/bookList/BookList";
import Book from "./pages/book/Book";
import NewBook from "./pages/newBook/NewBook";
import Login from "./pages/login/Login";
import { useSelector } from "react-redux";



function Layout() {
  return (
    <div>
      <Topbar />
      <div className="container">
        <Sidebar />
        <Outlet />
      </div>
    </div>
  )
}



function App() {
  const admin = useSelector((state) => state.user.currentUser?.isAdmin);
  return (
    <Router>
      <Routes>

        <Route path="/" element={admin ? <Layout /> : <Navigate to="/login" replace={true} />}>
          <Route index element={<Home />} />
          <Route exact path="/users" element={<UserList />} />
          <Route exact path="/user/:userId" element={<User />} />
          <Route exact path="/newUser" element={<NewUser />} />
          <Route exact path="/books" element={<BookList />} />
          <Route exact path="/book/:bookId" element={<Book />} />
          <Route exact path="/newBook" element={<NewBook />} />
        </Route>
      
        <Route
          path="/login"
          element={admin ? <Navigate to="/" replace={true} /> : <Login />}
        />
      
      
      </Routes>
      </Router>
      );
}

      export default App;