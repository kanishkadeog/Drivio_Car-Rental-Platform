// car-rental-platform/src/components/common/Footer/Footer.jsx

import { Link } from "react-router-dom";
import {
  ArrowUpRight,
 
} from "lucide-react";

import {
  FaInstagram,
  FaLinkedinIn,
   FaTwitter,
} from "react-icons/fa";

import "../Footer/Footer.scss";

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        {/* Main CTA */}
        <div className="footer__cta">
          <div>
            <p className="footer__eyebrow">
              Your next journey
            </p>

            <h2>
              Ready to
              <br />
              <span>move differently?</span>
            </h2>
          </div>

          <Link to="/cars" className="footer__cta-button">
            <span>Explore the fleet</span>

            <span className="footer__cta-icon">
              <ArrowUpRight size={21} />
            </span>
          </Link>
        </div>

        {/* Footer Grid */}
        <div className="footer__grid">
          <div className="footer__brand">
            <Link to="/" className="footer__logo">
              
              <span className="footer__logo-mark">
              D
            </span>

            <span className="footer__logo-text">
              DRIVIO <span className="footer__logo-side">RÉNT N RIDÉ</span>
            </span>

            </Link>

            <p>
              Premium cars.
              <br />
              Exceptional journeys.
            </p>

            <div className="footer__socials">
              <a href="#" aria-label="Instagram">
                <FaInstagram size={17} />
              </a>

              <a href="#" aria-label="LinkedIn">
                <FaLinkedinIn size={17} />
              </a>

              <a href="#" aria-label="Twitter">
                <FaTwitter size={17} />
              </a>
            </div>
          </div>

          <div className="footer__column">
            <h3>Explore</h3>

            <Link to="/cars">Fleet</Link>
            <Link to="/#experiences">Experiences</Link>
            <Link to="/about">About us</Link>
            <Link to="/contact">Contact</Link>
          </div>

          <div className="footer__column">
            <h3>Support</h3>

            <a href="#">FAQ</a>
            <a href="#">Rental policy</a>
            <a href="#">Privacy policy</a>
            <a href="#">Terms & conditions</a>
          </div>

          <div className="footer__column footer__contact">
            <h3>Get in touch</h3>

            <a href="mailto:hello@velocitycars.in">
              hello@driviorentnridecars.in
            </a>

            <a href="tel:+919876543210">
              +91 98765 43210
            </a>

            <p>
              Pune · Mumbai · Bengaluru
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="footer__bottom">
          <p>
            © {new Date().getFullYear()} 
            <span className="footer__logo-text">
              DRIVIO <span className="footer__logo-side">RÉNT N RIDÉ</span>
            </span>.
            All rights reserved.
          </p>

          <p>
            Designed for the road ahead.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;