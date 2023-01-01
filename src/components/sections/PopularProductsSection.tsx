import React from "react";
import db from "../../lib/prismadb";
import Border from "../Border";
import ProductCard from "../cards/ProductCard";

const fetchPopularProducts = async () => {
  const products = await db.product.findMany({
    take: 12,
    orderBy: {
      orderItems: {
        _count: "desc",
      },
    },
    include: {
      category: true,
      _count: {
        select: {
          orderItems: true,
        },
      },
    },
  });
  return products.map((product) => ({
    ...product,
    // decimal cannot be rendered on the client side later on, so we convert it to string
    sizes: product.sizes.map((size) => size.toString()),
  }));
};

const PopularProductsSection = async () => {
  const products = await fetchPopularProducts();

  return (
    <>
      <Border />
      <div className="sm:mx-3 px-2 sm:py-10 py-5">
        <h2 className="mx-auto max-w-6xl text-2xl font-black mb-4">
          Heat Sneakers 🔥
        </h2>
        <div className="mx-auto max-w-6xl w-full grid lg:grid-cols-6 sm:grid-cols-4 grid-cols-2 gap-1">
          {products.map((product) => (
            <ProductCard {...product} key={product.id} />
          ))}
        </div>
      </div>
    </>
  );
};

export default PopularProductsSection;
