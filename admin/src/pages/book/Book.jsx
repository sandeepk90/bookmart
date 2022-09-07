import { useState } from "react";
import "./book.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Publish } from "@mui/icons-material";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import { updateBook } from "../../redux/apiCalls";
import { useFormik } from "formik";
import * as Yup from 'yup';
import Swal from "sweetalert2";

export default function Book() {
   const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const location = useLocation();
  const bookId = location.pathname.split("/")[2];

  const book = useSelector((state) =>
    state.book.books.find((book) => book._id === bookId)
  );
  
  const initialValues = {
      price: book.price,
      inStock: book.inStock
    }

    const validationSchema = Yup.object({
      price: Yup.number()
        .typeError("Price must be a number")
        .required("Required"),
      inStock: Yup.boolean().required("Required"),
    });


  const onSubmit= (values) => {
      const fileName = new Date().getTime() + file?.name;
      const storage = file ? getStorage(app) : null;
      const storageRef = file ? ref(storage, fileName) : null;
      const uploadTask = file ? uploadBytesResumable(storageRef, file) : null;


      file
        ? uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log("Upload is " + progress + "% done");
              switch (snapshot.state) {
                case "paused":
                  console.log("Upload is paused");
                  break;
                case "running":
                  console.log("Upload is running");
                  break;
                default:
              }
            },
            (error) => {
              // Handle unsuccessful uploads
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                updateBook(book._id, { ...values, img: downloadURL }, dispatch);
              });
            }
          )
        : updateBook(book._id, values, dispatch);

        Swal.fire({
          icon: "success",
          title: "Updated!",
          text: "Book Updated Successfully",
          confirmButtonText: "Close",
        }).then(() => {
          navigate("/books", { replace: true });
          // window.location.reload();
        });
    }

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema
  });

  return (
    <div className="book">
      <div className="bookTitleContainer">
        <h1 className="bookTitle">Book</h1>
        <Link to="/newbook">
          <button className="bookAddButton">Create</button>
        </Link>
      </div>
      <div className="bookTop">
        <div className="bookTopRight">
          <div className="bookInfoTop">
            <img src={book.img} alt="" className="bookInfoImg" />
            <span className="bookName">{book.title}</span>
          </div>
          <div className="bookInfoBottom">
            <div className="bookInfoItem">
              <span className="bookInfoKey">id:</span>
              <span className="bookInfoValue">{book._id}</span>
            </div>
            <div className="bookInfoItem">
              <span className="bookInfoKey">Author:</span>
              <span className="bookInfoValue">{book.author}</span>
            </div>
            <div className="bookInfoItem">
              <span className="bookInfoKey">Publisher:</span>
              <span className="bookInfoValue">{book.publisher}</span>
            </div>
            <div className="bookInfoItem">
              <span className="bookInfoKey">Price:</span>
              <span className="bookInfoValue">{book.price}</span>
            </div>
            <div className="bookInfoItem">
              <span className="bookInfoKey">in stock:</span>
              <span className="bookInfoValue">
                {book.inStock ? "true" : "false"}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="bookBottom">
        <form className="bookForm" onSubmit={formik.handleSubmit}>
          <div className="bookFormLeft">
            <label>Book Name</label>
            <input
              name="title"
              type="text"
              placeholder={book.title}
              disabled
              defaultValue={book.title}
              style={{ cursor: "not-allowed" }}
              // onChange={handleChange}
            />
            <label>Author</label>
            <input
              name="author"
              type="text"
              placeholder={book.author}
              disabled
              defaultValue={book.author}
              style={{ cursor: "not-allowed" }}
              //   onChange={handleChange}
            />
            <label>Publisher</label>
            <input
              name="publisher"
              type="text"
              placeholder={book.publisher}
              disabled
              defaultValue={book.publisher}
              //   onChange={handleChange}
              style={{ cursor: "not-allowed" }}
            />

            <label>Book Description </label>
            <input
              name="desc"
              type="text"
              placeholder={book.desc}
              disabled
              defaultValue={book.desc}
              // onChange={handleChange}
              style={{ cursor: "not-allowed" }}
            />

            <label>Price</label>
            <input
              name="price"
              type="text"
              placeholder={book.price}
              className="bookUpdateInput"
              style={{ outline: "none" }}
              {...formik.getFieldProps("price")}
            />
            {formik.touched.price && formik.errors.price ? (
              <span style={{ color: "red" }}>{formik.errors.price}</span>
            ) : null}

            <label>Categories</label>
            <input
              type="text"
              placeholder="fiction,finance"
              disabled
              defaultValue={book.categories[0]}
              style={{ cursor: "not-allowed" }}
              //   onChange={handleCat}
              className="bookUpdateInput"
            />

            <label>In Stock</label>
            <select
              name="inStock"
              id="inStock"
              {...formik.getFieldProps("inStock")}
              className="bookUpdateInput"
            >
              <option value="" disabled>
                Choose
              </option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
            {formik.touched.inStock && formik.errors.inStock ? (
              <span style={{ color: "red" }}>{formik.errors.inStock}</span>
            ) : null}
          </div>

          <div className="bookFormRight">
            <div className="bookUpload">
              <img src={book.img} alt="" className="bookUploadImg" />
              <label htmlFor="file">
                <Publish />
              </label>
              <input
                type="file"
                id="file"
                onChange={(e) => setFile(e.target.files[0])}
                style={{ display: "none" }}
              />
            </div>
            <button type="submit" className="bookButton">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
