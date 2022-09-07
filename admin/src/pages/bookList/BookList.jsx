import "./bookList.css";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteBook, getBooks } from "../../redux/apiCalls";
import Swal from "sweetalert2";

export default function BookList() {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.book.books);

  useEffect(() => {
    getBooks(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
    deleteBook(id, dispatch);
    Swal.fire({
      icon: "success",
      title: "Deleted!",
      text: "Book Deleted Successfully",
      confirmButtonText: "Close",
    });
  };

  const columns = [
    // { field: "_id", headerName: "ID", width: 220 },
    {
      field: "book",
      headerName: "Book",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="bookListItem">
            <img className="bookListImg" src={params.row.img} alt="" />
            {params.row.title}
          </div>
        );
      },
    },
    { field: "author", headerName: "Author", width: 200 },
    { field: "publisher", headerName: "Publisher", width: 200 },
    { field: "inStock", headerName: "Stock", width: 200 },
    {
      field: "price",
      headerName: "Price",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/book/" + params.row._id}>
              <button className="bookListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="bookListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="bookList">
      <DataGrid
        rows={books}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={8}
        // checkboxSelection
      />
    </div>
  );
}