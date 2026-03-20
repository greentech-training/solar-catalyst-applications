import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import solarcatalyst from "@/assets/logos/solar-catalyst.png";

const Navigation = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Detect scroll to change navbar style
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "The Program", path: "/program" },
    { name: "About Us", path: "/about" },
    { name: "Locations", path: "/locations" },
    { name: "FAQ", path: "/faq" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        scrolled
          ? "bg-white/98 backdrop-blur-sm border-border shadow-sm"
          : "bg-white/95 backdrop-blur-sm border-border/50"
      }`}
    >
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-[80px]">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-70 h-[90px] rounded-sm overflow-hidden flex items-center justify-center transition-transform">
              <img
                src={solarcatalyst}
                alt="Solar Catalyst Logo"
                className="w-full h-full object-contain"
              />
            </div>
          </Link>
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium relative transition-colors group ${
                  isActive(item.path)
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.name}
                <span
                  className={`absolute -bottom-1 left-1/2 h-[2px] bg-primary transition-all duration-300 ${
                    isActive(item.path)
                      ? "w-full -translate-x-1/2"
                      : "w-0 -translate-x-1/2 group-hover:w-full"
                  }`}
                />
              </Link>
            ))}
            <Link to="/enroll">
              <Button 
                className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold px-6 py-2 rounded-sm transition-all duration-200"
              >
                Apply Now
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden p-2 transition-transform duration-300 ${
              mobileMenuOpen ? "rotate-90" : ""
            }`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-foreground" />
            ) : (
              <Menu className="h-6 w-6 text-foreground" />
            )}
          </button>
        </div>
      </div>

      {/* Background overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-foreground/20 z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="absolute top-[80px] left-0 right-0 z-50 bg-card shadow-lg border-t border-border animate-slideDown rounded-b-sm md:hidden">
          <div className="flex flex-col py-4 space-y-2 px-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-sm font-medium transition-colors ${
                  isActive(item.path)
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Link
              to="/enroll"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 pt-2"
            >
              <Button className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold py-2 rounded-sm">
                Apply Now
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;