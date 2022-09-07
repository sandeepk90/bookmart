import { loginStart, loginSuccess, loginFailure, registerStart, registerSuccess, registerFailure } from "./userRedux";
import { publicRequest } from "../requestMethods";
import Swal from "sweetalert2";

export const login = async (dispatch, user) => {
    dispatch(loginStart());
    try {
        const res = await publicRequest.post("/auth/login", user);
        // console.log(res);
        dispatch(loginSuccess(res.data));
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
        Toast.fire({
            icon: "success",
            title: "Signed in successfully",
        });
    } catch (err) {
        // console.log(err);
        dispatch(loginFailure());
        Swal.fire({
            icon: "error",
            title: "Something Went Wrong!",
            text: err.response.data.error.message,
            confirmButtonText: 'Close',
        });
    }
};

export const register = async (dispatch, user) => {
    dispatch(registerStart());
    try {
        const res = await publicRequest.post("/auth/register", user);
        // console.log(res);
        dispatch(registerSuccess(res.data));
    } catch (err) {
        // console.log(err);
        dispatch(registerFailure());
    }
};