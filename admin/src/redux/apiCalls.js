import { loginFailure, loginStart, loginSuccess } from "./userRedux";
import { publicRequest, userRequest } from "../requestMethods";
import {
  getBookFailure,
  getBookStart,
  getBookSuccess,
  deleteBookFailure,
  deleteBookStart,
  deleteBookSuccess,
  updateBookFailure,
  updateBookStart,
  updateBookSuccess,
  addBookFailure,
  addBookStart,
  addBookSuccess,
} from "./bookRedux";

import {
  getUserStart,
  getUserSuccess,
  getUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  addUserStart,
  addUserSuccess,
  addUserFailure,
} from "./adminRedux";
import Swal from "sweetalert2";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    // dispatch(loginSuccess(res.data));

    const Toast = Swal.mixin({
      toast: true,
      position: "top",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });
    if ( res.data.isAdmin === true) {
      // console.log('if');
      dispatch(loginSuccess(res.data));
      Toast.fire({
        icon: "success",
        title: "Signed in successfully",
      });

    } else if (res.data.isAdmin === false) {
      // console.log('else if');
      Toast.fire({
        icon: "error",
        title: "Permission Denied",
      });
    }



  } catch (err) {
    dispatch(loginFailure());
    Swal.fire({
      icon: "error",
      title: "Something Went Wrong!",
      text: err.response.data.error.message,
      confirmButtonText: 'Close',
    });
  }
};

export const getBooks = async (dispatch) => {
  dispatch(getBookStart());
  try {
    const res = await publicRequest.get("/books");
    dispatch(getBookSuccess(res.data));
  } catch (err) {
    dispatch(getBookFailure());
  }
};

export const deleteBook = async (id, dispatch) => {
  dispatch(deleteBookStart());
  try {
    const res = await userRequest.delete(`/books/${id}`);
    dispatch(deleteBookSuccess(id));
  } catch (err) {
    dispatch(deleteBookFailure());
  }
};

export const updateBook = async (id, book, dispatch) => {
  dispatch(updateBookStart());
  try {
    // update
    const res = await userRequest.put(`/books/${id}`, book);
    dispatch(updateBookSuccess( res.data ));
  } catch (err) {
    dispatch(updateBookFailure());
  }
};
export const addBook = async (book, dispatch) => {
  dispatch(addBookStart());
  try {
    const res = await userRequest.post(`/books`, book);
    dispatch(addBookSuccess(res.data));
    Swal.fire({
      icon: "success",
      title: "Added!",
      text: "Book Added Successfully",
      confirmButtonText: "Close",
    })
  } catch (err) {
    dispatch(addBookFailure());
    Swal.fire({
      icon: "error",
      title: "Something Went Wrong!",
      text: err.response.data.error.message,
      confirmButtonText: 'Close',
    });
  }
};


export const getUsers = async (dispatch) => {
  dispatch(getUserStart());
  try {
    const res = await userRequest.get("/users");
    dispatch(getUserSuccess(res.data));
  } catch (err) {
    dispatch(getUserFailure());
  }
};

export const deleteUser = async (id, dispatch) => {
  dispatch(deleteUserStart());
  try {
    const res = await userRequest.delete(`/users/${id}`);
    dispatch(deleteUserSuccess(id));
  } catch (err) {
    dispatch(deleteUserFailure());
  }
};

export const updateUser = async (id, user, dispatch) => {
  dispatch(updateUserStart());
  try {
    // update
    const res = await userRequest.put(`/users/${id}`, user);
    dispatch(updateUserSuccess(res.data));
  } catch (err) {
    dispatch(updateUserFailure());
  }
};
export const addUser = async (user, dispatch) => {
  dispatch(addUserStart());
  try {
    const res = await userRequest.post(`/users`, user);
    dispatch(addUserSuccess(res.data));
    Swal.fire({
      icon: "success",
      title: "Added!",
      text: "User Added Successfully",
      confirmButtonText: "Close",
    })
  } catch (err) {
    dispatch(addUserFailure());
    Swal.fire({
      icon: "error",
      title: "Something Went Wrong!",
      text: err.response.data.error.message,
      confirmButtonText: 'Close',
    });
  }
};