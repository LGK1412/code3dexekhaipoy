import { Link } from 'react-router-dom';

function ProductCard({ item }) {
  return (
    <Link to={`/product/${item.id}`} className="block">
      <div className="shadow-md rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-300">
        <img src={item.image} alt={item.name} className="w-full h-80 object-cover" />
        <div className="p-4 text-center">
          <h3 className="text-lg font-semibold font-Brygada 1918 italic">{item.name}</h3>
          <p className="text-2sm text-gray-600">{item.description}</p>
          <p className="text-2sm font-bold mt-2">{item.price}</p>
          <button
            className="mt-2 px-4 py-1 bg-[#4B0000] text-white text-sm rounded-full hover:bg-red-700"
            onClick={(e) => e.preventDefault()} // Ngăn chuyển trang khi nhấn Add to cart
          >
            Add to cart
          </button>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
