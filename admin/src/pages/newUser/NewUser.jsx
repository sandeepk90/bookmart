import { useState } from "react";
import "./newUser.css";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import { addUser } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";


export default function NewUser() {
   const navigate = useNavigate();
const [file, setFile] = useState(null);
const [fileError, setFileError] = useState(false);
const dispatch = useDispatch();


const initialValues = {
  username:'',
  email:'',
  passward:'',
  isAdmin:''
};

const validationSchema = Yup.object({
  username: Yup.string().min(3, "Should be min. 3 chars").required("Required"),
  email: Yup.string().email("Invalid email format").required("Required"),
  passward: Yup.string().min(6, "Should be min. 6 chars").required("Required"),
  isAdmin: Yup.boolean().required("Required"),
});

const handleFile = (e) => {
  setFile(e.target.files[0]);
  setFileError(false);
};

const onSubmit = (values) => {

  console.log(fileError)
  let fileInputField = document.getElementById("file");
  if (fileInputField.files.length === 0) {
  console.log(fileError);
      
    setFileError(true);
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
     const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
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
       const user = { ...values, img: downloadURL };
       addUser(user, dispatch);
       navigate("/users", { replace: true });
     });
   }
 );
//  Swal.fire({
//    icon: "success",
//    title: "Added!",
//    text: "User Added Successfully",
//    confirmButtonText: "Close",
//  })
//  .then(() => {
//    navigate("/users", { replace: true });
//    // window.location.reload();
//  });
}

const formik = useFormik({
  initialValues,
  onSubmit,
  validationSchema,
});


  return (
    <div className="newUser">
      <h1 className="newUserTitle">New User</h1>
      <form className="newUserForm" onSubmit={formik.handleSubmit}>
        <div className="addBookItem">
          <label>Image</label>
          <input type="file" id="file" onChange={handleFile} />
          {fileError ? (
            <span style={{ color: "red" }}>Please select a file!</span>
          ) : null}
        </div>
        <div className="newUserItem">
          <label>Username</label>
          <input
            name="username"
            type="text"
            placeholder="john"
            // onChange={handleChange}
            {...formik.getFieldProps("username")}
          />
          {formik.touched.username && formik.errors.username ? (
            <span style={{ color: "red" }}>{formik.errors.username}</span>
          ) : null}
        </div>

        <div className="newUserItem">
          <label>Email</label>
          <input
            name="email"
            type="email"
            placeholder="john@gmail.com"
            // onChange={handleChange}
            {...formik.getFieldProps("email")}
          />
          {formik.touched.email && formik.errors.email ? (
            <span style={{ color: "red" }}>{formik.errors.email}</span>
          ) : null}
        </div>
        <div className="newUserItem">
          <label>Password</label>
          <input
            name="passward"
            type="password"
            placeholder="password"
            // onChange={handleChange}
            {...formik.getFieldProps("passward")}
          />
          {formik.touched.passward && formik.errors.passward ? (
            <span style={{ color: "red" }}>{formik.errors.passward}</span>
          ) : null}
        </div>

        <div className="newUserItem">
          <label>Is Admin</label>
          <select
            name="isAdmin"
            // onChange={handleChange}
            className="newUserSelect"
            {...formik.getFieldProps("isAdmin")}
            id="isAdmin"
          >
            <option value="" disabled>
              Choose
            </option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
          {formik.touched.isAdmin && formik.errors.isAdmin ? (
            <span style={{ color: "red" }}>{formik.errors.isAdmin}</span>
          ) : null}
        </div>

        <button type="submit" className="newUserButton">
          Create
        </button>
      </form>
    </div>
  );
}