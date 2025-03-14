import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "./../LoadingScreen/Loader";
import AutoPlay from "../ProductsSlider/Slider";
import { useQuery } from "@tanstack/react-query";
import InternetAlert from "./../InternetAlert/InternetAlert";
import ProductItem from "../ProductItem/ProductItem";
import { Helmet } from "react-helmet";
export default function Products() {
  const [searchProducts, setSearchProducts] = useState("");
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  function getAllProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }
  const { data, error, isLoading } = useQuery({
    queryKey: ["allProducts"],
    queryFn: getAllProducts,
  });
  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    return <InternetAlert />;
  }
  function filterProducts(products, searchTerm) {
    return products.filter((product) =>
      [product?.title, product?.brand?.name, product?.category?.name].some(
        (field) => field?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }
  const allData = data?.data?.data || [];
  const filteredProducts = filterProducts(allData, searchProducts);
  return (
    <>
      <Helmet>
        <title>All Products | FreshCart</title>
        <meta
          name="description"
          content="Browse our wide collection of products at FreshCart. Find the best deals on electronics, fashion, groceries, and more!"
        />
        <meta
          name="keywords"
          content="all products, FreshCart, shopping, best deals, online store"
        />
        <meta property="og:title" content="All Products | FreshCart" />
        <meta
          property="og:description"
          content="Browse our wide collection of products at FreshCart. Find the best deals on electronics, fashion, groceries, and more!"
        />
        <meta name="robots" content="index, follow" />
      </Helmet>
      <section id="allProducts" className="py-12">
        <div className="container">
          <AutoPlay />
          <h1 className="text-xl lg:text-2xl xl:text-3xl text-center mb-3 font-semibold">
            Shop Now & Enjoy Exclusive Deals!
          </h1>
          <div className="md:w-3/4 xl:w-1/2 mx-auto mb-5">
            <input
              value={searchProducts}
              onChange={(e) => setSearchProducts(e.target.value)}
              type="text"
              placeholder="What are you looking for?"
              className="px-5 py-2 rounded-lg border border-gray-300 text-lg w-full outline-none caret-green-800 focus:border-[#268626]"
            />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductItem product={product} key={product.id} />
              ))
            ) : (
              <p className="text-center col-span-full text-gray-500">
                No products found matching "{searchProducts}"
              </p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
