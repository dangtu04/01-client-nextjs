import { Skeleton } from "antd";
import "./product.card.skeleton.scss";

const ProductCardSkeleton = () => {
  return (
    <div className="product-card skeleton">
      {/* Image */}
      <Skeleton.Image
        active
        style={{
          width: "100%",
          height: 260,
          borderRadius: 12,
        }}
      />

      {/* Content */}
      <div className="product-card__content">
        {/* Name */}
        <Skeleton
          active
          title={false}
          paragraph={{ rows: 2, width: ["100%", "80%"] }}
        />

        {/* Price */}
        <Skeleton.Button
          active
          size="small"
          style={{ width: 80, marginTop: 8 }}
        />
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
