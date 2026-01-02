import "./product.card.scss";

const nullImage = "/null-product.png";

interface IProps {
  image: string;
  name: string;
  price: number;
}

const ProductCard = ({ image, name, price }: IProps) => {
  return (
    <div className="product-card">
      <div className="product-card__image-wrapper">
        <img
          src={image ?? nullImage}
          alt={name}
          className="product-card__image"
        />
      </div>
      <div className="product-card__content">
        <h3 className="product-card__title">{name}</h3>
        <p className="product-card__price">{price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
