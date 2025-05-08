// // src/components/Navbar.js
// import React from 'react';
// import { Link, useLocation } from 'react-router-dom';

// const Navbar = () => {
//   const location = useLocation();

//   const linkClasses = "px-3 py-2 rounded-md text-sm font-medium";
//   const activeLinkClasses = "bg-slate-700 text-white";
//   const inactiveLinkClasses = "text-slate-300 hover:bg-slate-600 hover:text-white";

//   return (
//     <nav className="bg-slate-800 shadow-lg">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-16">
//           <div className="flex items-center">
//             <Link to="/" className="text-white font-bold text-xl">
//               BriefShortLink
//             </Link>
//           </div>
//           <div className="hidden md:block">
//             <div className="ml-10 flex items-baseline space-x-4">
//               <Link
//                 to="/"
//                 className={`${linkClasses} ${
//                   location.pathname === "/" ? activeLinkClasses : inactiveLinkClasses
//                 }`}
//               >
//                 Shorten URL
//               </Link>
//               <Link
//                 to="/list"
//                 className={`${linkClasses} ${
//                   location.pathname === "/list" || location.pathname.startsWith("/stats/") ? activeLinkClasses : inactiveLinkClasses
//                 }`}
//               >
//                 All URLs
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const linkClasses = "px-3 py-2 rounded-md text-sm font-medium";
  const activeLinkClasses = "bg-slate-700 text-white";
  const inactiveLinkClasses = "text-slate-300 hover:bg-slate-600 hover:text-white";

  const mobileLinkClasses = "block px-3 py-2 rounded-md text-base font-medium";


  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-slate-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Site Name */}
          <div className="flex items-center">
            <Link to="/" className="text-white font-bold text-xl">
              BriefShortLink
            </Link>
          </div>

          {/* Desktop Menu Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                to="/"
                className={`${linkClasses} ${
                  location.pathname === "/" ? activeLinkClasses : inactiveLinkClasses
                }`}
              >
                Shorten URL
              </Link>
              <Link
                to="/list"
                className={`${linkClasses} ${
                  location.pathname === "/list" || location.pathname.startsWith("/stats/") ? activeLinkClasses : inactiveLinkClasses
                }`}
              >
                All URLs
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {/* Hamburger Icon */}
              {!isMobileMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                // Close Icon (X)
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu, show/hide based on menu state */}
      {/* Tailwind class `md:hidden` ensures this section is only for mobile */}
      <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden`} id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            to="/"
            className={`${mobileLinkClasses} ${
              location.pathname === "/" ? activeLinkClasses : inactiveLinkClasses
            }`}
            onClick={() => setIsMobileMenuOpen(false)} // Close menu on click
          >
            Shorten URL
          </Link>
          <Link
            to="/list"
            className={`${mobileLinkClasses} ${
              location.pathname === "/list" || location.pathname.startsWith("/stats/") ? activeLinkClasses : inactiveLinkClasses
            }`}
            onClick={() => setIsMobileMenuOpen(false)} // Close menu on click
          >
            All URLs
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;