// car-rental-platform/src/components/common/Navbar/Navbar.jsx

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { NavLink, Link, useNavigate } from "react-router-dom";

import {
  Heart,
  Menu,
  X,
  ArrowUpRight,
} from "lucide-react";

import Button from "../Button/Button";
import "../Navbar/Navbar.scss";

import { useFavorites } from "../../../context/FavoritesContext";

const navLinks = [
  {
    label: "Fleet",
    path: "/cars",
  },
  {
    label: "Experiences",
    path: "/#experiences",
  },
  {
    label: "About",
    path: "/about",
  },
  {
    label: "Contact",
    path: "/contact",
  },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navigate = useNavigate();

  const { favoriteCount } = useFavorites();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const closeMobileMenu = () => {
    setMobileOpen(false);
  };

  return (
    <>
      <header
        className={`navbar ${
          scrolled ? "navbar--scrolled" : ""
        }`}
      >
        <div className="navbar__inner container">
          {/* Logo */}
          <Link
            to="/"
            className="navbar__logo"
            onClick={closeMobileMenu}
          >
            <span className="navbar__logo-mark">
              D
            </span>

            <span className="navbar__logo-text">
              DRIVIO <span className="navbar__logo-side">RÉNT N RIDÉ</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="navbar__nav">
            {navLinks.map((link) => (
              <NavLink
                key={link.label}
                to={link.path}
                className={({ isActive }) =>
                  `navbar__link ${
                    isActive ? "navbar__link--active" : ""
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="navbar__actions">
            <Link
               to="/cars"
               className="navbar__favorites"
               aria-label="Favorites"
             >
             <Heart size={18} strokeWidth={1.8} />

              {favoriteCount > 0 && (
               <span className="navbar__favorites-count">
                 {favoriteCount}
               </span>
              )}
            </Link>

            <Button
               variant="primary"
               icon
               className="navbar__cta"
               onClick={() => navigate("/cars")}
           >
             Book a car
           </Button>

          </div>

          {/* Mobile Controls */}
          <div className="navbar__mobile-actions">
            <Link
                to="/cars"
                className="navbar__mobile-favorite"
                aria-label="Favorites"
             >
                <Heart size={20} />

               {favoriteCount > 0 && (
                 <span className="navbar__favorites-count">
                  {favoriteCount}
                 </span>
               )}
             </Link>

            <button
              type="button"
              className="navbar__menu-button"
              onClick={() =>
                setMobileOpen((previous) => !previous)
              }
              aria-label={
                mobileOpen
                  ? "Close navigation menu"
                  : "Open navigation menu"
              }
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? (
                <X size={22} />
              ) : (
                <Menu size={22} />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="mobile-menu__backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMobileMenu}
            />

            <motion.div
              className="mobile-menu__panel"
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{
                duration: 0.35,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className="mobile-menu__header">
                <span>Navigation</span>

                <button
                  type="button"
                  onClick={closeMobileMenu}
                  aria-label="Close menu"
                >
                  <X size={22} />
                </button>
              </div>

              <nav className="mobile-menu__nav">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.label}
                    initial={{
                      opacity: 0,
                      y: 15,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      delay: index * 0.06,
                    }}
                  >
                    <NavLink
                      to={link.path}
                      onClick={closeMobileMenu}
                      className="mobile-menu__link"
                    >
                      <span>
                        0{index + 1}
                      </span>

                      {link.label}

                      <ArrowUpRight size={20} />
                    </NavLink>
                  </motion.div>
                ))}
              </nav>

              <div className="mobile-menu__footer">
                <p>
                  Premium mobility.
                  <br />
                  Exceptional journeys.
                </p>

                <Link
                  to="/cars"
                  onClick={closeMobileMenu}
                  className="mobile-menu__book"
                >
                  Browse fleet
                  <ArrowUpRight size={18} />
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;