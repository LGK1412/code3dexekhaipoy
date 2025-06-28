export default function NavBar() {
  return (
    <nav className="sticky top-0 z-50 w-full bg-[#d3cfc5] shadow-md px-4 py-2 flex flex-col md:flex-row items-center justify-between gap-4 min-h-[60px] md:h-[60px]">
      {/* Logo center trên mobile, giữa nav ở desktop */}
      <img
        src="/logos/logo-fureal2-1.png"
        alt="Logo"
        className="w-[100px] h-auto lg:mr-6 md:order-2 p-0 m-0"
      />

      {/* Nav items trái */}
      <div className="flex flex-wrap justify-center gap-6 md:order-1 text-black text-base font-medium font-AlegreySC tracking-wide">
        <a href="/" className="hover:underline font-AlegreySC uppercase lg:pl-12">Home</a>
        <a href="#" className="hover:underline font-AlegreySC uppercase lg:pl-12">Shop</a>
        <a href="/about" className="hover:underline font-AlegreySC uppercase lg:pl-12">About Us</a>
      </div>

      {/* Nav items phải */}
      <div className="flex items-center gap-4 md:order-3">
        <a href="#" className="hover:underline font-AlegreySC uppercase text-black text-base font-medium ">
          Creative Space
        </a>

        <img
          src="https://c.animaapp.com/mcf156xlDfx350/img/box-den-1.png"
          alt="button"
          className="w-[57px] h-[44px]"
        />

        {/* Login Button */}
        <div className="lg:pr-12">
          <a href="" className="bg-red-900 flex items-center justify-center text-white text-sm font-AlegreySC uppercase font-medium">
            <p className="px-2" style={{ paddingTop: "2px", paddingBottom: "1px" }}>Login</p>
          </a>
        </div>

      </div>
    </nav>
  );
}
