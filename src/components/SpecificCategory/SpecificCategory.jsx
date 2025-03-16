import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "../LoadingScreen/Loader";
import InternetAlert from "../InternetAlert/InternetAlert";
import ProductItem from "./../ProductItem/ProductItem";
import { Helmet } from "react-helmet";

export default function SpecificCategory() {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  const { categoryId } = useParams();
  function getSpecificCategory() {
    return axios.get(
      `https://ecommerce.routemisr.com/api/v1/categories/${categoryId}`
    );
  }
  const specificCategoryQuery = useQuery({
    queryKey: ["specificCategory"],
    queryFn: getSpecificCategory,
  });
  function getAllProductsInCategory() {
    return axios(
      `https://ecommerce.routemisr.com/api/v1/products?category[in]=${categoryId}`
    );
  }
  const allProductsInCategory = useQuery({
    queryKey: ["allProductsInCategory"],
    queryFn: getAllProductsInCategory,
  });
  if (specificCategoryQuery && allProductsInCategory.isLoading) {
    return <Loader />;
  }
  if (specificCategoryQuery && allProductsInCategory.error) {
    return <InternetAlert />;
  }
  const specificCategoryData = specificCategoryQuery?.data?.data?.data;
  const ProductsInCategory = allProductsInCategory?.data?.data?.data;
  return (
    <>
      <Helmet>
        <title>{specificCategoryData?.name} Products | FreshCart</title>
        <meta
          name="description"
          content={`Discover the best ${specificCategoryData?.name} products on FreshCart. Shop now for exclusive deals and top-quality items.`}
        />
        <meta
          name="keywords"
          content={`FreshCart, ${specificCategoryData?.name}, buy ${specificCategoryData?.name}, ${specificCategoryData?.name} deals, ${specificCategoryData?.name} products`}
        />
        <meta
          property="og:title"
          content={`${specificCategoryData?.name} Products | FreshCart`}
        />
        <meta
          property="og:description"
          content={`Explore a wide range of ${specificCategoryData?.name} products at FreshCart. Best prices and offers available.`}
        />
      </Helmet>

      <section id="specificCategory" className="py-10">
        <div className="container">
          <div
            key={specificCategoryData?._id}
            className="flex flex-col items-center gap-3"
          >
            <div>
              <img
                src={specificCategoryData?.image}
                className="w-full rounded-lg h-[400px]"
                alt={specificCategoryData?.name}
              />
            </div>
            <h1 className="text-lg lg:text-3xl font-semibold">
              {specificCategoryData?.name}
            </h1>
          </div>
          <div>
            {ProductsInCategory?.length == 0 ? (
              <p className="text-center mt-4 text-lg md:text-xl lg:text-2xl leading-6">
                Sorry, there are no products in this category at the moment!
              </p>
            ) : (
              <div className="grid md:grid-cols-2 mt-7 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {ProductsInCategory?.map((product) => (
                  <ProductItem product={product} key={product.id} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
