"use client";

import { IProductCard } from "@/types/models/product.model";
import ProductCard from "../product/product.card";
import "./new.product.section.scss";
import { handleGetNewProductsAction } from "@/actions/products.actions";
import { useState } from "react";
import ProductCardSkeleton from "../product/product.card.skeleton";

interface IProps {
  initialProducts: IProductCard[];
}

const NewProductSection = ({ initialProducts }: IProps) => {
  const [products, setProducts] = useState(initialProducts);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleClickMore = async () => {
    setLoading(true);
    try {
      const nextPage = currentPage + 1;
      // await new Promise((resolve) => setTimeout(resolve, 1500));
      const res = await handleGetNewProductsAction(nextPage, 8);
      const newProducts = res.data?.results ?? [];

      setProducts([...products, ...newProducts]);
      setCurrentPage(nextPage);
    } catch (error) {
      console.error("Error loading more products:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="new-product-section">
      <div className="new-product-title">Sản phẩm mới</div>
      <div className="new-product-section__container">
        <div className="new-product-section__grid">
          {products.map((product) => (
            <ProductCard
              key={product?._id}
              image={product?.thumbnail?.secureUrl}
              name={product?.name}
              price={product?.price}
            />
          ))}
          {/* hiển thị skeleton khi đang load */}
          {loading &&
            Array.from({ length: 4 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
        </div>
        {currentPage < 10 && (
          <button
            className="btn-more"
            onClick={handleClickMore}
            disabled={loading}
          >
            {loading ? "Đang tải..." : "Xem thêm"}
          </button>
        )}
      </div>
    </section>
  );
};

export default NewProductSection;
