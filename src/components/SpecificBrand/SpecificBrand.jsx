import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductItem from "../ProductItem/ProductItem";
import Loader from "../LoadingScreen/Loader";
import InternetAlert from "../InternetAlert/InternetAlert";
import { Helmet } from "react-helmet";
export default function SpecificBrand() {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  const { BrandId } = useParams();
  function getSpecificBrand() {
    return axios.get(
      `https://ecommerce.routemisr.com/api/v1/brands/${BrandId}`
    );
  }
  function getAllProductsInBrand() {
    return axios.get(
      `https://ecommerce.routemisr.com/api/v1/products?brand=${BrandId}`
    );
  }
  const specificBrandData = useQuery({
    queryKey: ["SpecificBrand"],
    queryFn: getSpecificBrand,
  });
  const ProductsInBrand = useQuery({
    queryKey: ["ProductsInBrand"],
    queryFn: getAllProductsInBrand,
  });
  if (specificBrandData && ProductsInBrand.isLoading) {
    return <Loader />;
  }
  if (specificBrandData && ProductsInBrand.error) {
    return <InternetAlert />;
  }
  const allSpecificBrandData = specificBrandData.data?.data?.data;
  const allProductsInBrand = ProductsInBrand.data?.data?.data;
  return (
    <>
      <Helmet>
        <title>{allSpecificBrandData.name} Products | FreshCart</title>
        <meta
          name="description"
          content={`Explore top-quality products from ${allSpecificBrandData.name} at FreshCart. Find the best deals and latest collections.`}
        />
        <meta
          name="keywords"
          content={`FreshCart, ${allSpecificBrandData.name}, ${allSpecificBrandData.name} products, buy ${allSpecificBrandData.name}, ${allSpecificBrandData.name} offers`}
        />
        <meta
          property="og:title"
          content={`${allSpecificBrandData.name} Products | FreshCart`}
        />
        <meta
          property="og:description"
          content={`Shop for the latest ${allSpecificBrandData.name} products on FreshCart. Best prices and exclusive discounts.`}
        />
      </Helmet>

      <section id="specificBrand" className="py-10">
        <div className="container">
          <div
            key={allSpecificBrandData._id}
            className="flex flex-col items-center gap-3"
          >
            <div>
              <img
                src={allSpecificBrandData.image}
                className="w-full rounded-lg"
                alt={allSpecificBrandData.name}
              />
            </div>
            <h1 className="text-lg lg:text-3xl font-semibold">
              {allSpecificBrandData.name}
            </h1>
          </div>
          <div>
            {allProductsInBrand.length == 0 ? (
              <p className="text-center mt-4 text-lg md:text-xl lg:text-2xl leading-6">
                Sorry, there are no products in this category at the moment!
              </p>
            ) : (
              <div className="grid md:grid-cols-2 mt-14 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {allProductsInBrand.map((product) => (
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
