import { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const furnitureTypes = [
    // Shelf
    { type: 'Furniture', description: 'Stylish and functional shelf unit.', price: '149.00$', image: '/image/cabinet1.jpg' },
    { type: 'Furniture', description: 'Minimalist black shelf for books.', price: '99.00$', image: '/image/cabinet1.jpg' },
    { type: 'Furniture', description: 'Oak wall-mounted shelf.', price: '129.00$', image: '/image/cabinet1.jpg' },
    { type: 'Furniture', description: 'Industrial metal shelf rack.', price: '159.00$', image: '/image/cabinet1.jpg' },
    { type: 'Furniture', description: 'Scandinavian style corner shelf.', price: '89.00$', image: '/image/cabinet1.jpg' },
    { type: 'Furniture', description: 'Floating wood wall shelf.', price: '69.00$', image: '/image/cabinet1.jpg' },
    { type: 'Furniture', description: 'Modern cube bookshelf.', price: '119.00$', image: '/image/cabinet1.jpg' },
    { type: 'Furniture', description: 'Ladder bookshelf for decor.', price: '139.00$', image: '/image/cabinet1.jpg' },
  
    // Fabrics
    { type: 'Fabrics', description: 'Comfortable modern bed frame.', price: '399.00$', image: '/image/cabinet1.jpg' },
    { type: 'Fabrics', description: 'Classic wooden bed with storage.', price: '459.00$', image: '/image/cabinet1.jpg' },
    { type: 'Fabrics', description: 'Upholstered queen bed.', price: '499.00$', image: '/image/cabinet1.jpg' },
    { type: 'Fabrics', description: 'Canopy bed with sleek design.', price: '529.00$', image: '/image/cabinet1.jpg' },
    { type: 'Fabrics', description: 'Low-profile platform bed.', price: '349.00$', image: '/image/cabinet1.jpg' },
    { type: 'Fabrics', description: 'Rustic wooden bed frame.', price: '389.00$', image: '/image/cabinet1.jpg' },
    { type: 'Fabrics', description: 'Leather padded king bed.', price: '559.00$', image: '/image/cabinet1.jpg' },
    { type: 'Fabrics', description: 'Contemporary floating bed.', price: '599.00$', image: '/image/cabinet1.jpg' },
  
    // Chair
    { type: 'Lighting', description: 'Elegant and cozy chair.', price: '89.00$', image: '/image/cabinet1.jpg' },
    { type: 'Lighting', description: 'Rocking chair for relaxing.', price: '109.00$', image: '/image/cabinet1.jpg' },
    { type: 'Lighting', description: 'Minimalist white desk chair.', price: '69.00$', image: '/image/cabinet1.jpg' },
    { type: 'Lighting', description: 'Ergonomic mesh office chair.', price: '129.00$', image: '/image/cabinet1.jpg' },
    { type: 'Lighting', description: 'Velvet accent chair.', price: '149.00$', image: '/image/cabinet1.jpg' },
    { type: 'Lighting', description: 'Rattan lounge chair.', price: '119.00$', image: '/image/cabinet1.jpg' },
    { type: 'Lighting', description: 'Mid-century modern armchair.', price: '169.00$', image: '/image/cabinet1.jpg' },
    { type: 'Lighting', description: 'Foldable wooden dining chair.', price: '59.00$', image: '/image/cabinet1.jpg' },
  
    // Bath
    { type: 'Bath', description: 'Sleek storage cabinet.', price: '249.00$', image: '/image/cabinet1.jpg' },
    { type: 'Bath', description: 'Vintage cabinet with drawers.', price: '289.00$', image: '/image/cabinet1.jpg' },
    { type: 'Bath', description: 'Glass display cabinet.', price: '319.00$', image: '/image/cabinet1.jpg' },
    { type: 'Bath', description: 'Tall pantry kitchen cabinet.', price: '199.00$', image: '/image/cabinet1.jpg' },
    { type: 'Bath', description: 'Bathroom cabinet with mirror.', price: '179.00$', image: '/image/cabinet1.jpg' },
    { type: 'Bath', description: 'Metal industrial cabinet.', price: '229.00$', image: '/image/cabinet1.jpg' },
    { type: 'Bath', description: 'Wooden 3-drawer cabinet.', price: '189.00$', image: '/image/cabinet1.jpg' },
    { type: 'Bath', description: 'Entryway shoe storage cabinet.', price: '209.00$', image: '/image/cabinet1.jpg' },

    // Decor
    { type: 'Decor', description: 'Sleek storage cabinet.', price: '249.00$', image: '/image/cabinet1.jpg' },
    { type: 'Decor', description: 'Vintage cabinet with drawers.', price: '289.00$', image: '/image/cabinet1.jpg' },
    { type: 'Decor', description: 'Glass display cabinet.', price: '319.00$', image: '/image/cabinet1.jpg' },
    { type: 'Decor', description: 'Tall pantry kitchen cabinet.', price: '199.00$', image: '/image/cabinet1.jpg' },
    { type: 'Decor', description: 'Bathroom cabinet with mirror.', price: '179.00$', image: '/image/cabinet1.jpg' },
    { type: 'Decor', description: 'Metal industrial cabinet.', price: '229.00$', image: '/image/cabinet1.jpg' },
    { type: 'Decor', description: 'Wooden 3-drawer cabinet.', price: '189.00$', image: '/image/cabinet1.jpg' },
    { type: 'Decor', description: 'Entryway shoe storage cabinet.', price: '209.00$', image: '/image/cabinet1.jpg' },
  ];
  
  
  

const furnitureByType = furnitureTypes.reduce((acc, item) => {
  if (!acc[item.type]) acc[item.type] = [];
  acc[item.type].push(item);
  return acc;
}, {});

function FurnitureCarousel({ items, title }) {
  const [index, setIndex] = useState(0);
  const itemWidth = 364;
  const itemsPerPage = 4;
  const maxIndex = Math.ceil(items.length / itemsPerPage) - 1;

  const next = () => setIndex(prev => (prev + 1 > maxIndex ? 0 : prev + 1));
  const prev = () => setIndex(prev => (prev - 1 < 0 ? maxIndex : prev - 1));

  return (
    <div className="py-12 relative overflow-hidden">
      <h2 className="text-4xl font-serif  font-bold text-center mb-6">Explore {title}</h2>

      <div className="relative flex items-center justify-center">
        <button
          onClick={prev}
          className="absolute left-0 p-2  shadow rounded-full z-10"
        >
          <FaChevronLeft />
        </button>

        <div className="overflow-hidden w-[1400px] px-2">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{
              width: `${items.length * itemWidth}px`,
              transform: `translateX(-${index * itemWidth * itemsPerPage}px)`,
            }}
          >
            {items.map((item, idx) => (
              <div
                key={idx}
                className=" rounded-md p-4 text-center w-[300px] flex-shrink-0 mx-8 "
              >
                <img
                  src={item.image}
                  alt={item.type}
                  className="w-full h-72 object-cover rounded mb-3"
                />
                <p className="text-xl font-bold font-Brygada 1918 italic">{item.type}</p>
                <p className="text-base font-Brygada 1918 text-gray-500 my-2">{item.description}</p>
                <p className="text-[#4B0000] font-bold font-Brygada 1918 text-md">{item.price}</p>
                <button className="mt-4 px-5 py-2 border-2 border-black text-black  rounded-full hover:bg-[#4E7145] hover:text-white transition duration-300 text-base">
                  View More
                </button>
              </div>
              
            ))}
          </div>
        </div>

        <button
          onClick={next}
          className="absolute right-0 p-2  shadow rounded-full z-10"
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
    
  );
}

export default function FurnitureCategorySection() {
  return (
    <div className=" px-6 md:px-20">
      {Object.entries(furnitureByType).map(([type, items]) => (
        <FurnitureCarousel key={type} items={items} title={type} />
      ))}
      



    </div>
    
  );
}


