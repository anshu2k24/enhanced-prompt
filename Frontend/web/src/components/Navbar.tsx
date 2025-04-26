import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { UserRound, Award, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { auth } from '../lib/firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
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
            <Link to="/" className="text-[18px] font-medium text-muted-foreground hover:text-foreground transition-colors duration-300 glow-effect px-3 py-2">
              Home
            </Link>
            <Link to="/leaderboard" className="text-[18px] font-medium text-muted-foreground hover:text-foreground transition-colors duration-300 glow-effect px-3 py-2 flex items-center">
              <Award className="h-4 w-4 mr-1" />
              Leaderboard
            </Link>
            <Link to="/Learn More" className="text-[18px] font-medium text-muted-foreground hover:text-foreground transition-colors duration-300 glow-effect px-3 py-2">
              Learn More
            </Link>
            <Link to="/ContactUs" className="text-[18px] font-medium text-muted-foreground hover:text-foreground transition-colors duration-300 glow-effect px-3 py-2">
              Contact Us
            </Link>
            
            {currentUser ? (
              <>
                <Link to="/user" className="text-[18px] font-medium text-muted-foreground hover:text-foreground transition-colors duration-300 glow-effect px-3 py-2">
                  My Profile
                </Link>
                <Button 
                  onClick={handleLogout}
                  variant="ghost" 
                  className="text-[18px] font-medium text-muted-foreground hover:text-foreground transition-colors duration-300 glow-effect px-3 py-2 flex items-center"
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  Logout
                </Button>
                <div className="flex items-center gap-2">
                  <img 
                    src={currentUser.photoURL || "https://via.placeholder.com/150"} 
                    alt="Profile" 
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-sm font-medium">
                    {currentUser.displayName || 'User'}
                  </span>
                </div>
              </>
            ) : (
              <Link to="/logsign" className="text-[18px] font-medium text-muted-foreground hover:text-foreground transition-colors duration-300 glow-effect px-3 py-2">
                Login
              </Link>
            )}
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