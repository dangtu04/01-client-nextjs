"use client";

import { Image } from "antd";
import "./product.detail.images.scss";

interface IProps {
  listImages: string[];
}

const ProductDetailImages = ({ listImages }: IProps) => {
  const moreImagesCount = listImages.length - 4;
  
  return (
    <div className="product-detail-images">
      <Image.PreviewGroup items={listImages}>
        <div className="main-image">
          <Image alt="Product main view" src={listImages[0]} />
        </div>
        <div className="thumbnail-list">
          {listImages.slice(1, 4).map((img, index) => (
            <div className="thumbnail-item" key={index}>
              <Image alt={`Product view ${index + 1}`} src={img} />
            </div>
          ))}
          {listImages[4] && (
            <div className="thumbnail-item thumbnail-more">
              <Image alt="More images" src={listImages[4]} />
              {moreImagesCount > 0 && (
                <div className="overlay">
                  <span className="count">+{moreImagesCount}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </Image.PreviewGroup>
    </div>
  );
};

export default ProductDetailImages;