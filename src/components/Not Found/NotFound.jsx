import React from "react";
import notFoundImage from "../../assets/images/error.svg";
import { Helmet } from "react-helmet";
export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>Page Not Found | FreshCart</title>
        <meta
          name="description"
          content="Oops! The page you're looking for doesn't exist."
        />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="container flex justify-center items-center flex-col py-20 md:py-10">
        <img src={notFoundImage} alt="Not Found" />
        <p className="text-4xl font-semibold mb-3 text-center">
          Page Not Found
        </p>
        <p className="text-2xl text-[#808080] text-center">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
      </div>
    </>
  );
}
