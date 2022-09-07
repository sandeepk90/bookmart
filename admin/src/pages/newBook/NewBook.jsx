import { useState } from "react";
import "./newBook.css";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import { addBook } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function NewBook() {
   const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState([]);
  const [inputError, setInputError] = useState({
    cat: false,
    file: false,
  });
  const dispatch = useDispatch();

  const initialValues = {
    title: "",
    author: "",
    publisher: "",
    desc: "",
    price: "",
    inStock: "",
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Required"),
    author: Yup.string().required("Required"),
    publisher: Yup.string().required("Required"),
    desc: Yup.string().required("Required"),
    price: Yup.number()
      .typeError("Price must be a number")
      .required("Required"),
    inStock: Yup.boolean().required("Required"),
  });

  const handleCat = (e) => {
    const str = e.target.value;

    const result = str
      .split(",")
      .map((element) => element.trim())
      .filter((element) => element !== "");

    setCat(result);
    setInputError((prev) => {
      return { ...prev, cat: false };
    });
  };


  const handleFile = (e) => {
    setFile(e.target.files[0]);
    setInputError((prev) => {
      return { ...prev, "file": false };
    });
  }

  const onSubmit = (values) => {

    let fileInputField = document.getElementById("file");

    if (fileInputField.files.length === 0 || cat.length === 0) {
      if (fileInputField.files.length === 0) {
        setInputError({ ...inputError, "file": true });
      }
      if (cat.length === 0) {
        setInputError((prev) => {
          return { ...prev, "cat": true };
        });
      }
      return;
    }

    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
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
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const book = { ...values, img: downloadURL, categories: cat };
          addBook(book, dispatch);
          navigate("/books", { replace: true });
        });
      }
    );

    // Swal.fire({
    //   icon: "success",
    //   title: "Added!",
    //   text: "Book Added Successfully",
    //   confirmButtonText: "Close",
    // }).then(() => {
    //   navigate("/books", { replace: true });
    //   // window.location.reload();
    // });
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  return (
    <div className="newBook">
      <h1 className="addBookTitle">New Book</h1>
      <form className="addBookForm" onSubmit={formik.handleSubmit}>
        <div className="addBookItem">
          <label>Image</label>
          <input
            type="file"
            id="file"
            onChange={handleFile}
          />
          {inputError.file ? (
            <span style={{ color: "red" }}>Please select a file!</span>
          ) : null}
        </div>
        <div className="addBookItem">
          <label>Title</label>
          <input
            name="title"
            type="text"
            placeholder="Title of your book"
            // onChange={handleChange}
            {...formik.getFieldProps("title")}
          />
          {formik.touched.title && formik.errors.title ? (
            <span style={{ color: "red" }}>{formik.errors.title}</span>
          ) : null}
        </div>
        <div className="addBookItem">
          <label>Author</label>
          <input
            name="author"
            type="text"
            placeholder="Author Name"
            // onChange={handleChange}
            {...formik.getFieldProps("author")}
          />
          {formik.touched.author && formik.errors.author ? (
            <span style={{ color: "red" }}>{formik.errors.author}</span>
          ) : null}
        </div>
        <div className="addBookItem">
          <label>Publisher</label>
          <input
            name="publisher"
            type="text"
            placeholder="Publisher Name"
            // onChange={handleChange}
            {...formik.getFieldProps("publisher")}
          />
          {formik.touched.publisher && formik.errors.publisher ? (
            <span style={{ color: "red" }}>{formik.errors.publisher}</span>
          ) : null}
        </div>
        <div className="addBookItem">
          <label>Description</label>
          <input
            name="desc"
            type="text"
            placeholder="description..."
            // onChange={handleChange}
            {...formik.getFieldProps("desc")}
          />
          {formik.touched.desc && formik.errors.desc ? (
            <span style={{ color: "red" }}>{formik.errors.desc}</span>
          ) : null}
        </div>
        <div className="addBookItem">
          <label>Price</label>
          <input
            name="price"
            type="number"
            placeholder="Enter Price"
            // onChange={handleChange}
            {...formik.getFieldProps("price")}
          />
          {formik.touched.price && formik.errors.price ? (
            <span style={{ color: "red" }}>{formik.errors.price}</span>
          ) : null}
        </div>
        <div className="addBookItem">
          <label>Categories</label>
          <input
            type="text"
            placeholder="fiction,finance"
            onChange={handleCat}
          />
          {inputError.cat ? (
            <span style={{ color: "red" }}>Required</span>
          ) : null}
        </div>
        <div className="addBookItem">
          <label>Stock</label>
          <select name="inStock" {...formik.getFieldProps("inStock")}>
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
        <button type="submit" className="addBookButton">
          Create
        </button>
      </form>
    </div>
  );
}
