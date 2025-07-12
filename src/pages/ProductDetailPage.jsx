import { useParams } from 'react-router-dom';
import ProductList from '../components/ProductList'; // Đúng tên export
import NavBar from '../components/NavBar';
import FooterSection from '../components/FooterSection';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import OtherProductOnly from '../components/OtherProductOnly';

function ProductDetailPage() {
  const { id } = useParams();
  const product = ProductList.find((p) => p.id === parseInt(id));

  if (!product) return <div className="text-center py-20">Product not found</div>;

  // Sửa logic: chỉ loại trừ sản phẩm hiện tại
  const otherProducts = ProductList.filter((item) => item.id !== parseInt(id));

  return (
    <div
      className="relative bg-cover bg-center min-h-screen"
      style={{ backgroundImage: `url('/background/BG5.png')` }}
    >
      <div className="absolute inset-0 bg-white/60 backdrop-blur-sm"></div>

      <div className="relative z-10">
        <NavBar />

        <div className="max-w-7xl mx-auto p-8">
          {/* Breadcrumb */}
          <div className="text-sm text-gray-500 mb-4">
            Homepage &gt; Shop &gt; <span className="text-black">{product.name}</span>
          </div>

          <div className="flex flex-col md:flex-row gap-10">
            {/* Left Image Gallery */}
            <div className="md:w-1/2">
              <img src={product.image} alt={product.name} className="w-full rounded shadow" />
              <div className="flex gap-3 mt-4">
                {[...Array(5)].map((_, i) => (
                  <img
                    key={i}
                    src={product.image}
                    alt={`thumb-${i}`}
                    className="w-20 h-20 object-cover rounded border"
                  />
                ))}
              </div>
            </div>

            {/* Right Product Info */}
            <div className="md:w-1/2">
              <h1 className="text-3xl font-serif mb-2">{product.name}</h1>
              <p className="text-sm text-gray-500 mb-4">(23 Reviews)</p>

              <div className="flex items-center gap-4 mb-4">
                <div className="text-yellow-400 text-xl">★★★★★</div>
                <div className="text-3xl font-bold text-red-700">{product.price}</div>
                <div className="line-through text-gray-400">$170.00</div>
              </div>

              <p className="text-sm text-gray-500 italic mb-4">
                Starting at $50.00/mo with LOREM
              </p>

              <div className="bg-gray-100 p-4 rounded mb-6">
                <h3 className="font-semibold mb-2">Product Material</h3>
                <img
                  src="/background/product-size.png"
                  alt="material"
                  className="rounded"
                />
              </div>

              <div className="border-t pt-4">
                <h4 className="font-semibold mb-2">SPEC & DESCRIPTION</h4>
                {['Script', 'Script', 'Script', 'Script'].map((text, i) => (
                  <div
                    key={i}
                    className="flex justify-between text-sm border-b py-2"
                  >
                    <span>{text}</span>
                    <span>1234</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 border-t pt-4">
                <h4 className="font-semibold mb-2">Policy</h4>
                <p className="text-sm text-gray-600">
                  Return within 30 days. Warranty included.
                </p>
              </div>

             <button className="mt-6 flex items-center gap-2 border border-red text-black px-6 py-2 rounded-full hover:bg-red hover:text-white transition-all duration-200">
  <FontAwesomeIcon icon={faCartPlus} />
  Add to Cart
</button>


            </div>
          </div>
        </div>

        {/* Other Products */}
        <div className="mt-12">
          <OtherProductOnly data={otherProducts} />
        </div>

        <FooterSection bgName="BG1" />
      </div>
    </div>
  );
}

export default ProductDetailPage;
