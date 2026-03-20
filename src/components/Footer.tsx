import { Link } from "react-router-dom";
import solarcatalyst from "@/assets/logos/solar-catalyst-white.png";
import CookiePreferencesButton from "./CookiePreferencesButton";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-[4fr_1fr_1fr] gap-4">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-60 h-30 md:w-96 md:h-56 flex items-center justify-center overflow-hidden">
                <img
                  src={solarcatalyst}
                  alt="Solar Catalyst Logo"
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            </div>
            <p className="text-primary-foreground/80 max-w-md">
              Building an international harmonised approach to<br/> training green skills.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/program" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">The Program</Link></li>
              <li><Link to="/about" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">About Us</Link></li>
              <li><Link to="/locations" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Locations</Link></li>
              <li><Link to="/faq" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="md:text-right">
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-primary-foreground/80">
              <li><Link to="/enroll" className="hover:text-primary-foreground transition-colors">Apply Now</Link></li>
              <li><Link to="/hiring-partners" className="hover:text-primary-foreground transition-colors">For Hiring Partners</Link></li>
            </ul>
          </div>

        </div>


        <div className="border-t border-primary-foreground/20 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-primary-foreground/60 text-sm">
            © {new Date().getFullYear()} Solar Catalyst. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link to="/imprint-privacy" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">
              Imprint & Privacy
            </Link>
            <Link to="/hiring-partners" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">
              For Hiring Partners
            </Link>
            <CookiePreferencesButton />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
