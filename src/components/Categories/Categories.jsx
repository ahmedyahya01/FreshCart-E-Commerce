import React, { useEffect } from "react";
import useAllCategories from "./../../CustomHooks/useAllCategories";
import Loader from "../LoadingScreen/Loader";
import InternetAlert from "../InternetAlert/InternetAlert";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Categories() {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  const { data, isLoading, error } = useAllCategories();
  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    return <InternetAlert />;
  }
  return (
    <>
      <Helmet>
        <title>Categories | FreshCart</title>
        <meta
          name="description"
          content="Explore a wide range of product categories on FreshCart and find what you need."
        />
        <meta
          name="keywords"
          content="categories, FreshCart, shopping, deals, best offers"
        />
        <meta property="og:title" content="Categories | FreshCart" />
        <meta
          property="og:description"
          content="Explore a wide range of product categories on FreshCart and find what you need."
        />
        <meta name="robots" content="index, follow" />
      </Helmet>
      <section id="categories" className="py-12">
        <div className="container">
          <h1 className="text-xl lg:text-2xl xl:text-3xl text-center mb-5 font-semibold">
            Explore Categories & Find Your Favorites
          </h1>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
            {data?.data?.data.map((category) => {
              return (
                <Link
                  key={category._id}
                  to={`/SpecificCategory/${category._id}`}
                >
                  <div className="category cursor-pointer bg-[#F0F3F2] rounded-lg border border-gray-300 shadow-md p-5 hover:scale-[1.02] duration-500">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-72 mb-2"
                    />
                    <p className="text-lg md:text-xl text-center">
                      {category.name}
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
