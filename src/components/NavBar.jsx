import {
  FaRegLightbulb,
  FaSearch,
  FaFilter,
  FaChair,
  FaBed,
  FaBoxOpen,
  FaThLarge,
  FaChevronDown,
  FaShoppingCart,
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';

const menuItems = [
  { name: 'Home', link: '/' },
  {
    name: 'CATEGORIES',
    link: '#',
    hasDropdown: true,
    categories: [
      {
        name: 'Furniture',
        icon: <FaThLarge />,
        subcategories: [
          'Beds', 'Nightstands', 'Dressers', 'Closets & Wardrobes', 'Benches',
          'Headboards', 'Chairs', 'Vanity Tables'
        ]
      },
      {
        name: 'Decor',
        icon: <FaBoxOpen />,
        subcategories: [
          'Mirrors', 'Curtains & Window Treatments', 'Scented Candles',
          'Plants & Planters', 'Wall Decor'
        ]
      },
      {
        name: 'Fabrics',
        icon: <FaBed />,
        subcategories: [
          'Pillows', 'Blankets', 'Rugs', 'Bed Linens', 'Carpets',
          'Cushions', 'Towels'
        ]
      },
      {
        name: 'Lighting',
        icon: <FaRegLightbulb />,
        subcategories: [
          'Ceiling Lights', 'Pendant Lights', 'Floor Lamps',
          'Table Lamps', 'Wall Lamps'
        ]
      },
      {
        name: 'Bath',
        icon: <FaBoxOpen />,
        subcategories: [
          'Bath Sinks', 'Bath Tubs', 'Bathroom Cabinets',
          'Bathroom Vanities', 'Faucets', 'Showers'
        ]
      },
    ]
  },
  { name: 'Shop', link: '/shop' },
  { name: 'About Us', link: '/about' },
  { name: 'Creative Space', link: '/viewer' },
];

const menuTextSize = 'text-xl';

export default function NavBar() {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleCategoryClick = (subcategory) => {
    const formatted = subcategory.toLowerCase().replace(/\s+/g, '-');
    navigate(`/category/${formatted}`);
    setDropdownOpen(false);
  };

  // Close dropdown when click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="sticky top-0 z-50 w-full bg-[#d3cfc5] shadow-md px-10 py-1 flex items-center justify-between min-h-[90px]">
      {/* Logo */}
      <div className="flex items-center gap-6 pl-8">
        <img src="/logos/logo-fureal2-1.png" alt="Logo" className="w-[120px] h-auto" />
      </div>

      {/* Main Menu */}
      <div className={`hidden lg:flex flex-1 justify-center gap-10 text-black tracking-wide uppercase font-AlegreySC ${menuTextSize}`}>
        {menuItems.map((item, index) => (
          <div key={index} className="relative" ref={item.name === 'CATEGORIES' ? dropdownRef : null}>
            {item.hasDropdown ? (
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 hover:text-[#5e0000] hover:font-semibold transition duration-200"
              >
                {item.name}
                <FaChevronDown className={`transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>
            ) : (
              <a href={item.link} className="hover:text-[#5e0000] hover:font-semibold transition duration-200">
                {item.name}
              </a>
            )}

            {/* Dropdown */}
            {item.categories && dropdownOpen && (
              <div className="absolute top-full left-0 mt-2 bg-white shadow-lg rounded-md w-[600px] py-4 px-6 z-50 animate-fade-in grid grid-cols-2 gap-6">
                {item.categories.map((cat, i) => (
                  <div key={i}>
                    <div className="flex items-center gap-2 mb-2 text-[#5e0000] font-semibold text-lg">
                      {cat.icon}
                      <span>{cat.name}</span>
                    </div>
                    <ul className="space-y-1">
                      {cat.subcategories.map((sub, j) => (
                        <li key={j}>
                          <button
                            onClick={() => handleCategoryClick(sub)}
                            className="text-left text-sm text-gray-700 hover:text-[#5e0000] hover:underline"
                          >
                            {sub}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Right section */}
      <div className="flex items-center gap-10">
        <div className="relative flex items-center bg-white rounded-full overflow-hidden w-[400px] max-w-[80vw] border border-gray-200">
          <input
            type="text"
            placeholder="Search here..."
            className="pl-4 pr-16 py-1 text-lg w-full text-[#5e0000] placeholder-[#5e0000] focus:outline-none font-AlegreySC"
          />
          <FaSearch className="absolute right-12 text-[#5e0000] text-xl" />
          <FaFilter className="absolute right-4 text-[#5e0000] text-xl" />
        </div>

        <button
          onClick={() => navigate('/cart')}
          className="text-black text-3xl hover:animate-shake transition"
          aria-label="Cart"
        >
          <FaShoppingCart />
        </button>

        <button
  onClick={() => navigate('/login')}
  className="text-[#5e0000] text-xl px-5 py-2 uppercase font-semibold font-AlegreySC tracking-wide"
>
  Login
</button>

      </div>
    </nav>
  );
}
