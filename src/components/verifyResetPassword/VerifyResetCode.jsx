import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { authContextProvider } from "../../context/AuthContextProvider";
import { Helmet } from "react-helmet";

export default function VerifyResetCode() {
  const passwordRef = useRef();
  useEffect(() => {
    window.scroll(0, 0);
    passwordRef.current.focus();
  }, []);
  const { email, token } = useContext(authContextProvider);
  const [isFail, setIsFail] = useState(false);
  const navigate = useNavigate();
  async function resetCode(values) {
    try {
      const res = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        values
      );
      navigate("/ResetPassword");
    } catch (error) {
      setIsFail(error.response.data.message);
    }
    setTimeout(() => {
      setIsFail(false);
    }, 5000);
  }
  const otpCode = {
    resetCode: "",
  };
  const resetCodeFormik = useFormik({
    initialValues: otpCode,
    onSubmit: resetCode,
    validationSchema: yup.object().shape({
      resetCode: yup
        .string()
        .required("Code is Requires")
        .min(4, "resetCode must be between 4 and 6 characters")
        .max(6, "resetCode must be between 4 and 6 characters"),
    }),
  });
  useEffect(() => {
    if (token) {
      navigate("/home");
    }
  }, []);
  return (
    <>
      <Helmet>
        <title>OTP Verification | FreshCart</title>
        <meta
          name="description"
          content="Enter the one-time password (OTP) sent to your email to verify your identity on FreshCart."
        />
        <meta
          name="keywords"
          content="OTP verification, FreshCart, secure login, verify account"
        />
        <meta property="og:title" content="OTP Verification | FreshCart" />
        <meta
          property="og:description"
          content="Enter the one-time password (OTP) sent to your email to verify your identity on FreshCart."
        />
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      {isFail ? (
        <div
          className="p-4 mb-4 text-lg md:text-xl text-center text-red-800 rounded-lg bg-red-100"
          role="alert"
        >
          <span className="font-medium">{isFail}</span>
        </div>
      ) : (
        ""
      )}
      <section id="resetPasswordCode">
        <div className="container">
          <div className="relative flex flex-col justify-center overflow-hidden py-20">
            <div className="relative bg-[#f0f3f256] px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-3xl rounded-2xl">
              <div className="mx-auto flex w-full max-w-2xl flex-col space-y-5">
                <div className="flex flex-col items-center justify-center text-center space-y-2">
                  <div>
                    <h1 className="text-xl lg:text-2xl xl:text-3xl text-center font-semibold">
                      Otp Code Verification
                    </h1>
                  </div>
                  <div className="flex flex-row text-sm font-medium opacity-70">
                    <p className="md:text-lg">
                      We have sent a code to your email {email}
                    </p>
                  </div>
                </div>
                <div>
                  <form onSubmit={resetCodeFormik.handleSubmit}>
                    <div className="flex flex-col">
                      <div className="w-full sm:w-3/4 mx-auto text-center">
                        <input
                          ref={passwordRef}
                          name="resetCode"
                          id="resetCode"
                          onBlur={resetCodeFormik.handleBlur}
                          value={resetCodeFormik.values.resetCode}
                          onChange={resetCodeFormik.handleChange}
                          className="w-full md:w-3/4 h-11 text-center outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-[#4FC74F]"
                          type="text"
                        />
                        {resetCodeFormik.errors.resetCode &&
                        resetCodeFormik.touched.resetCode ? (
                          <div
                            className="mt-2 text-base text-red-800 w-3/4 mx-auto"
                            role="alert"
                          >
                            <span className="font-medium">
                              {resetCodeFormik.errors.resetCode}
                            </span>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                      <div>
                        <div className="flex justify-center">
                          <button className="text-center w-full md:w-3/4 text-white mt-3 bg-[#36bb36] hover:bg-[#4fc74f] duration-300 focus:outline-none font-medium rounded-md text-lg py-2">
                            Verify Code
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
