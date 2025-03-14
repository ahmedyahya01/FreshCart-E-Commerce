import axios from "axios";
import React, { useEffect } from "react";
import ProductItem from "../../ProductItem/ProductItem";
import { useQuery } from "@tanstack/react-query";
import InternetAlert from "../../InternetAlert/InternetAlert";

export default function RelatedProducts({ categoryId }) {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  function getSimilarProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }
  const { data, error, isLoading } = useQuery({
    queryKey: ["similarProducts"],
    queryFn: getSimilarProducts,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
  const simProducts = data?.data?.data.filter(
    (product) => product.category._id == categoryId
  );
  if (isLoading) {
    return "";
  }
  if (error) {
    return <InternetAlert />;
  }
  return (
    <>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {simProducts.map((product) => (
          <ProductItem product={product} key={product.id} />
        ))}
      </div>
    </>
  );
}
