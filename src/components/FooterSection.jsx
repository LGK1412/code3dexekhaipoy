export default function FooterSection() {
  const footerLinks = [
    {
      title: "ABOUT FUREAL",
      links: ["Privacy Policy", "Terms of Use", "Announcements"],
    },
    {
      title: "FOR USERS",
      links: [
        "Start Designing",
        "Feng Shui Guide",
        "Explore 3D Model",
        "Room Templates",
      ],
    },
    {
      title: "FOR PROs",
      links: ["Fureal for Designers", "3D Layout Tools", "Partner with Us"],
    },
    {
      title: "GET HELP",
      links: [
        "FAQs",
        "Your Projects",
        "Contact Support",
        "Returns & Refunds",
        "Accessibility",
        "Feedback",
      ],
    },
    {
      title: "CONNECT WITH US",
      links: ["Facebook", "Instagram", "Tiktok"],
    },
  ];

  return (
    <footer className="w-full bg-cover bg-center pt-16 px-6">
      {/* Logo */}
      <div className="flex justify-center mb-10">
        <img
          src="/logos/logo-fureal2-1.png"
          alt="Fureal Logo"
          className="w-[200px] h-auto object-contain"
        />
      </div>

      {/* Link Grid */}
      <nav className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 text-center">
        {footerLinks.map((category, index) => (
          <div key={`category-${index}`}>
            <h3 className="font-bebas text-lg text-black mb-4">
              {category.title}
            </h3>
            <ul className="space-y-2 text-sm text-black font-bebas leading-relaxed">
              {category.links.map((link, linkIndex) => (
                <li key={`link-${index}-${linkIndex}`}>
                  <a href="#" className="hover:underline">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </footer>
  );
}
