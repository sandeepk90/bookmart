import { CalendarToday, MailOutline, Publish } from "@mui/icons-material";
import { useState } from "react";
import "./user.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import { updateUser } from "../../redux/apiCalls";
import Swal from "sweetalert2";



export default function User() {
   const navigate = useNavigate();
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const location = useLocation();
  const userId = location.pathname.split("/")[2];

  const user = useSelector((state) =>
    state.admin.users.find((user) => user._id === userId)
  );

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleClick = (e) => {
    e.preventDefault();

    // let updatedUser = { ...user, ...inputs };

    const fileName = new Date().getTime() + file?.name;
    const storage = file ? getStorage(app) : null;
    const storageRef = file ? ref(storage, fileName) : null;
    const uploadTask = file ? uploadBytesResumable(storageRef, file) : null;

    file
      ? // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
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
              inputs = { ...inputs, img: downloadURL };
              updateUser(user._id, inputs, dispatch);
            });
          }
        )
      : updateUser(user._id, inputs, dispatch);

    // console.log(updatedUser);
    Swal.fire({
      icon: "success",
      title: "Updated!",
      text: "User Updated Successfully",
      confirmButtonText: "Close",
    }).then(()=> {
      navigate("/users", { replace: true });
      // window.location.reload();
    });
  };

  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit User</h1>
        <Link to="/newUser">
          <button className="userAddButton">Create</button>
        </Link>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img
              src={
                user.img
                  ? user.img
                  : "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
              }
              alt=""
              className="userShowImg"
            />
            <div className="userShowTopTitle">
              <span className="userShowUsername">{user.username}</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">
                {new Date(user.createdAt).toLocaleDateString()}
              </span>
            </div>

            <span className="userShowTitle">Contact Details</span>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{user.email}</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Username</label>
                <input
                  name="username"
                  type="text"
                  placeholder={user.username}
                  disabled
                  defaultValue={user.username}
                  onChange={handleChange}
                  className="userUpdateInput"
                  style={{ cursor: "not-allowed" }}
                />
              </div>

              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  name="email"
                  type="email"
                  placeholder={user.email}
                  disabled
                  defaultValue={user.email}
                  onChange={handleChange}
                  className="userUpdateInput"
                  style={{ cursor: "not-allowed" }}
                />
              </div>
              <div className="userUpdateItem">
                <label>Is Admin</label>
                <select
                  name="isAdmin"
                  id="isAdmin"
                  // defaultValue={"default"}
                  defaultValue={user.isAdmin}
                  onChange={handleChange}
                  className="userUpdateInput"
                >
                  <option value={"default"} disabled>
                    Choose
                  </option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <img
                  className="userUpdateImg"
                  src={
                    user.img
                      ? user.img
                      : "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
                  }
                  alt=""
                />
                <label htmlFor="file">
                  <Publish className="userUpdateIcon" />
                </label>
                <input
                  type="file"
                  id="file"
                  style={{ display: "none" }}
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>
              <button onClick={handleClick} className="userUpdateButton">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
