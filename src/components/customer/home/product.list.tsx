"use client";

import ProductCard from "@/components/customer/product/product.card";
import { IProductCard } from "@/types/models/product.model";
import Link from "next/link";
import "./product.list.scss";

interface IProps {
  products: IProductCard[];
  categoryName?: string;
  categoryId?: string;
}

const ProductList = ({ products, categoryName, categoryId }: IProps) => {
  return (
    <section className="product-list-section">
      <div className="product-list-section__container">
        <div className="product-list-header">
          <h2 className="product-list-header__title">{categoryName}</h2>
          <Link href={`/product?categoryId=${categoryId}`}>
            <button className="product-list-header__btn-view-all">
              Xem tất cả
            </button>
          </Link>
        </div>
        <div className="product-list-section__grid">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              image={product.thumbnail.secureUrl}
              name={product.name}
              price={product.price}
              slug={product.slug}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductList;