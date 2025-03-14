import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect } from "react";
import Loader from "../LoadingScreen/Loader";
import InternetAlert from "../InternetAlert/InternetAlert";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Brands() {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  function getAllBrands() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/brands");
  }
  const { data, isLoading, error } = useQuery({
    queryKey: ["brands"],
    queryFn: getAllBrands,
  });
  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    return <InternetAlert />;
  }
  return (
    <>
      <Helmet>
        <title>Brands | FreshCart</title>
        <meta
          name="description"
          content="Discover top brands on FreshCart and shop for high-quality products."
        />
        <meta
          name="keywords"
          content="brands, FreshCart, shopping, top brands, quality products"
        />
        <meta property="og:title" content="Brands | FreshCart" />
        <meta
          property="og:description"
          content="Discover top brands on FreshCart and shop for high-quality products."
        />
        <meta name="robots" content="index, follow" />
      </Helmet>
      <section id="brands" className="py-12">
        <div className="container">
          <h1 className="text-xl lg:text-2xl xl:text-3xl text-center mb-5 font-semibold">
            Discover Top Brands You Love
          </h1>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
            {data?.data?.data.map((brand) => {
              return (
                <Link key={brand._id} to={`/SpecificBrand/${brand._id}`}>
                  <div className="brand bg-[#F0F3F2] rounded-lg border border-gray-300 shadow-md p-5 hover:scale-[1.02] duration-500">
                    <img
                      src={brand.image}
                      alt={brand.name}
                      className="w-full h-56 mb-2"
                    />
                    <p className="text-lg md:text-xl text-center">
                      {brand.name}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
