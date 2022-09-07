import React, { useState } from 'react'
import styled from 'styled-components';
import { useDispatch, useSelector } from "react-redux";
import { register } from "../redux/apiCalls";
import {mobile} from '../responsive'
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://img.freepik.com/free-photo/abstract-blur-defocused-bookshelf-library_1203-9640.jpg?t=st=1658555863~exp=1658556463~hmac=939b9d832c3c2d89606bcba844a6a8bb86fb3cd2eed6d41715969d2b57cc63e2&w=900")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  ${mobile({ height: "auto" })}
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  border: 1px solid teal;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
`;

const DivWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 0;
  minWidth: 40%;
`;

// const styledForm = styled.div`
//   display: flex;
//   flex-wrap: wrap;
// `;

const styledForm = {
  display: 'flex',
  flexWrap: 'wrap'
}

const styledInput = {
  flex: 1,
  minWidth: "40%",
  margin: "20px 10px 0px 0px",
  padding: "10px",
};

// const styledInput = styled.div`
//   flex: 1;
//   min-width: 40%;
//   margin: 20px 10px 0px 0px;
//   padding: 10px;
// `;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const LinkText = styled.span`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

const Error = styled.span`
  color: red;
`;

const Register = () => {

  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);

  const initialValues = {
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    passward: "",
    confirmPassward: "",
  };

  const validationSchema = Yup.object({
    firstname: Yup.string().required("Required"),
    lastname: Yup.string().required("Required"),
    username: Yup.string()
      .min(3, "Should be 3 chars min.")
      .required("Required"),
    email: Yup.string().email("Invalid email format").required("Required"),
    passward: Yup.string()
      .min(6, "Should be min. 6 chars")
      .required("Required"),
    confirmPassward: Yup.string()
      .oneOf([Yup.ref("passward"), ""], "Passwords must match")
      .required("Required"),
  });

  const onSubmit = (values, { setSubmitting, resetForm }) => {
    // console.log(values);
    const {username, email, passward} = values;
    // console.log(username, email, passward);
    register(dispatch, { username, email, passward });
    setSubmitting(false);
    Swal.fire({
      icon: "success",
      title: "Registered!",
      text: "User Registered Successfully",
      confirmButtonText: "Close",
    });
    resetForm();
  };


  // const handleChange = (e) => {
  //   setFormData({...formData, [e.target.name]:e.target.value})
  // };


  

  //  const handleRegister = (e) => {
  //    e.preventDefault();
  //    register(dispatch, formData);
  //   console.log(formData);
  //  };

  return (
    <div>
      <Container>
        <Wrapper>
          <Title>CREATE AN ACCOUNT</Title>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ isSubmitting }) => (
              <Form style={styledForm}>
                <DivWrapper>
                  <Field
                    style={styledInput}
                    type="text"
                    name="firstname"
                    placeholder="First Name"
                  />
                  <ErrorMessage
                    style={{ color: "red" }}
                    name="firstname"
                    component="div"
                  />
                </DivWrapper>
                <DivWrapper>
                  <Field
                    style={styledInput}
                    type="text"
                    name="lastname"
                    placeholder="Last Name"
                  />
                  <ErrorMessage
                    style={{ color: "red" }}
                    name="lastname"
                    component="div"
                  />
                </DivWrapper>
                <DivWrapper>
                  <Field
                    style={styledInput}
                    type="text"
                    name="username"
                    placeholder="Username"
                  />
                  <ErrorMessage
                    style={{ color: "red" }}
                    name="username"
                    component="div"
                  />
                </DivWrapper>
                <DivWrapper>
                  <Field
                    style={styledInput}
                    type="text"
                    name="email"
                    placeholder="Email"
                  />
                  <ErrorMessage
                    style={{ color: "red" }}
                    name="email"
                    component="div"
                  />
                </DivWrapper>
                <DivWrapper>
                  <Field
                    style={styledInput}
                    type="password"
                    name="passward"
                    placeholder="Password"
                  />
                  <ErrorMessage
                    style={{ color: "red" }}
                    name="passward"
                    component="div"
                  />
                </DivWrapper>
                <DivWrapper>
                  <Field
                    style={styledInput}
                    type="password"
                    name="confirmPassward"
                    placeholder="Confirm Password"
                  />
                  <ErrorMessage
                    style={{ color: "red" }}
                    name="confirmPassward"
                    component="div"
                  />
                </DivWrapper>
                <Agreement>
                  By creating an account, I consent to the processing of my
                  personal data in accordance with the <b>PRIVACY POLICY</b>
                </Agreement>
                <Button type="submit" disabled={isSubmitting}>
                  Submit
                </Button>
              </Form>
            )}
          </Formik>

          <Link to="/login">
            <LinkText>Already Have An Account </LinkText>
          </Link>
          {/* <Form>
            <Input
              placeholder="first name"
              name="firstname"
              onChange={handleChange}
            />
            <Input
              placeholder="last name"
              name="lastname"
              onChange={handleChange}
            />
            <Input
              placeholder="username"
              name="username"
              onChange={handleChange}
            />
            <Input placeholder="email" name="email" onChange={handleChange} />
            <Input
              name="passward"
              placeholder="password"
              type="password"
              onChange={handleChange}
            />
            <Input
              name="confirmPassward"
              placeholder="confirm password"
              type="password"
              onChange={handleChange}
            />
            <Agreement>
              By creating an account, I consent to the processing of my personal
              data in accordance with the <b>PRIVACY POLICY</b>
            </Agreement>
            <Button onClick={handleRegister} disabled={isFetching}>
              CREATE
            </Button>
            {error && <Error>Something went wrong...</Error>}
             {formError && <Error>{formError.message}</Error>}
            <Link to="/login">Already Have An Account</Link>
          </Form> */}
        </Wrapper>
      </Container>
    </div>
  );
}
export default Register;