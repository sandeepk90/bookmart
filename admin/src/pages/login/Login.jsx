import React, { useState } from "react";
import styled, { css } from "styled-components";
// import { mobile } from "";
import { login } from "../../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
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
    url("https://media.istockphoto.com/photos/abstract-blurred-public-library-interior-space-blurry-room-with-by-picture-id1132077472?k=20&m=1132077472&s=612x612&w=0&h=T94Q_dUWpSvJ0YooB2jVcZq_ATpXCwqiH4ehyBf7uhk=")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  
`;


const mobile = (props) => {
  return css`
    @media only screen and (max-width: 380px) {
      ${props}
    }
  `;
};
const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  border: 1px solid teal;
   ${mobile({ width: "80%" })}
`;

  

const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
`;

// const Form = styled.div`
//   display: flex;
//   flex-direction: column;
// `;

const DivWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 0;
  width: 80%;
`;

const styledForm = {
  display: "flex",
  flexDirection: "column",
};

// const Input = styled.div`
//   flex: 1;
//   min-width: 40%;
//   margin: 10px 0;
//   padding: 10px;
// `;

const styledInput = {
  flex: 1,
  minWidth: "40%",
  margin: "5px 0 0",
  padding: "10px",
};

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  &:disabled {
    color: green;
    cursor: not-allowed;
  }
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

const Login = () => {
  const dispatch = useDispatch();

  const initialValues = {
    email: "",
    passward: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Required"),
    passward: Yup.string().required("Required"),
  });

  const onSubmit = (values, { setSubmitting, resetForm }) => {
    login(dispatch, values);
      setSubmitting(false);
    resetForm();
  };

  return (
    // <div>
      <Container>
        <Wrapper>
          <Title>Sign In</Title>
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
                <Button type="submit" disabled={isSubmitting}>
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
        </Wrapper>
      </Container>
    // </div>
  );
};

export default Login;
