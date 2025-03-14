import React from "react";
import { Helmet } from "react-helmet";

export default function InternetAlert() {
  return (
    <>
      <Helmet>
        <title>No Internet Connection | FreshCart</title>
        <meta
          name="description"
          content="You are currently offline. Please check your internet connection and try again."
        />
        <meta
          name="keywords"
          content="FreshCart, no internet, connection lost, offline mode, network issue"
        />
        <meta
          property="og:title"
          content="No Internet Connection | FreshCart"
        />
        <meta
          property="og:description"
          content="It looks like you're offline. Please reconnect to continue using FreshCart."
        />
      </Helmet>

      <div className="py-72 lg:p-96">
        <div
          className="p-4 mb-4 text-lg lg:text-2xl text-center text-white rounded-lg bg-gray-800"
          role="alert"
        >
          <span class="font-medium">Please Check The Internet!</span>
        </div>
      </div>
    </>
  );
}
