import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext) as any;

  return (
    <div className="border rounded-lg shadow-sm p-4 bg-white flex flex-col justify-between">
      <div>
        <div className="bg-gray-200 h-40 rounded-md mb-4 flex items-center justify-center text-gray-500">
          [Image Placeholder]
        </div>
        <h3 className="text-lg font-bold text-gray-800">{product.name}</h3>
        <p className="text-sm text-gray-500 mb-2">{product.category}</p>
        <p className="text-xl font-bold text-primary mb-4">₱{product.price}</p>
      </div>
      <button 
        onClick={() => addToCart(product)}
        className="w-full bg-dark text-white py-2.5 rounded-full hover:bg-primary transition-all font-bold text-sm"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;