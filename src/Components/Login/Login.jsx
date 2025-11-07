import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { ColorRing, ThreeCircles } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { authContext } from "../AuthContext/AuthContext";

const ValidateScima = yup.object({
  email: yup
    .string()
    .required("email is required")
    .email(`The email must contain ("@", ".")`),
  password: yup
    .string()
    .required("password is required")
    .matches(/^[A-Za-z][A-Za-z0-9]{5,8}$/, `password pattern is inavalid `),
});
export default function Login() {
  const { setToken } = useContext(authContext);

  const inshialData = {
    email: "",
    password: "",
  };

  const [isClick, setisClick] = useState(false);
  const Navigate = useNavigate();
  function onClick() {
    if (isClick === true) {
      return (
        <>
          <div className="d-flex vh-100 bg-dark bg-opacity-50 justify-content-center align-items-center">
            <ThreeCircles
              visible={true}
              height="100"
              width="100"
              color="#fff"
              ariaLabel="three-circles-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </div>
        </>
      );
    }
  }
  const onsubmit = async (values) => {
    ////   call Api
    setisClick(true);

    await axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
      .then(function (x) {
        if (x.data.message === "success") {
          console.log("token", x.data.token);
          localStorage.setItem("tkn", x.data.token);
          setToken(x.data.token);
          setTimeout(() => {
            Navigate("/home");
            setisClick(false);
          }, 500);
        }
      })
      .catch(function (x) {
        console.log("error", x);
      });

    setisClick(false);
  };

  const myFormik = useFormik({
    initialValues: inshialData,
    onSubmit: onsubmit,
    validationSchema: ValidateScima,
  });

  return (
    <>
      <div className="container m-auto p-5">
        <h2 className="mb-3 mt-5 Log_Reg">login now</h2>

        <form onSubmit={myFormik.handleSubmit}>
          <label htmlFor="email"> Email :</label>
          <input
            onBlur={myFormik.handleBlur}
            onChange={myFormik.handleChange}
            value={myFormik.values.email}
            type="email"
            id="email"
            className="form-control mb-2"
          />
          {myFormik.errors.email && myFormik.touched.email ? (
            <div className="alert alert-danger"> {myFormik.errors.email} </div>
          ) : (
            ""
          )}

          <label htmlFor="password">Password :</label>
          <input
            onBlur={myFormik.handleBlur}
            onChange={myFormik.handleChange}
            value={myFormik.values.password}
            type="password"
            id="password"
            className="form-control mb-2"
          />
          {myFormik.errors.password && myFormik.touched.password ? (
            <div className="alert alert-danger">
              {" "}
              {myFormik.errors.password}{" "}
            </div>
          ) : (
            ""
          )}

          <div className="d-flex">
            <p className="me-auto forgetLogin ">forget your password ?</p>

            <button
              onClick={() => {
                onClick();
              }}
              type="submit"
              className="rounded-3 btn before-btn ms-auto "
            >
              {isClick ? (
                <ColorRing
                  visible={true}
                  height="30"
                  width="30"
                  ariaLabel="color-ring-loading"
                  wrapperStyle={{}}
                  wrapperClass="color-ring-wrapper"
                  colors={["black", "black", "black", "black", "black"]}
                />
              ) : (
                "login Now"
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
