
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { UserRound, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`fixed top-0 py-2 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-background/75 backdrop-blur-md shadow-md' : 'bg-[#060d1c]/45'}`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <span className="text-[35px] font-bold bg-gradient-to-r  from-green-400   to-[#7e4feb] to-[#0696d8] text-transparent bg-clip-text mb-4 ">EcoAi</span>
            </Link>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="text-[20px] font-medium text-muted-foreground hover:text-foreground transition-colors duration-300 glow-effect px-3 py-2">
              Home
            </Link>
            {/* <button 
              onClick={() => scrollToSection('about')} 
              className="text-[20px] font-medium text-muted-foreground hover:text-foreground transition-colors duration-300 glow-effect px-3 py-2"
            >
              About
            </button> */}
            <Link to="/leaderboard" className="text-[20px] font-medium text-muted-foreground hover:text-foreground transition-colors duration-300 glow-effect px-3 py-2 flex items-center">
              <Award className="h-4 w-4 mr-1" />
              Leaderboard
            </Link>
            <Link to="/ContactUs" className="text-[20px] font-medium text-muted-foreground hover:text-foreground transition-colors duration-300 glow-effect px-3 py-2">
              Contact Us
            </Link>
            <Link to="/user" className="text-[20px] font-medium text-muted-foreground hover:text-foreground transition-colors duration-300 glow-effect px-3 py-2">
              User Page
            </Link>
            <Button variant="ghost" size="icon" className="glow-effect">
              <UserRound className="h-6" />
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <Button variant="ghost" size="icon" aria-label="Toggle menu">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
