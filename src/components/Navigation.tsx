
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Search, Menu, X, Camera, Users, Upload, HelpCircle, Heart, LogIn, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import LoginModal from "./LoginModal";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, userRole, logout } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: "/", label: "Locations", icon: Camera },
    { path: "/scouts", label: "Scouts", icon: Users },
    { path: "/upload", label: "List Location", icon: Upload },
    { path: "/how-it-works", label: "How it Works", icon: HelpCircle },
    { path: "/support", label: "Support", icon: Heart },
  ];

  const handleLogoClick = () => {
    navigate("/");
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <button 
              onClick={handleLogoClick}
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            >
              <Camera className="h-8 w-8 text-coral-500" />
              <span className="text-2xl font-bold text-gray-900">LocationScout</span>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-6 py-3 rounded-xl text-base font-medium transition-all duration-200 ${
                    isActive(item.path)
                      ? "bg-coral-50 text-coral-600 shadow-sm border border-coral-200"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </Link>
              ))}
              
              {/* Auth Buttons */}
              {isAuthenticated ? (
                <div className="flex items-center gap-2 ml-4">
                  <Link
                    to="/admin"
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive("/admin")
                        ? "bg-coral-50 text-coral-600 border border-coral-200"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    }`}
                  >
                    Dashboard ({userRole})
                  </Link>
                  <Button
                    onClick={handleLogout}
                    variant="ghost"
                    size="sm"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={() => setIsLoginModalOpen(true)}
                  className="ml-4 bg-coral-500 hover:bg-coral-600 text-white"
                >
                  <LogIn className="h-4 w-4 mr-2" />
                  Login
                </Button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-3 rounded-xl text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200 bg-white">
              <div className="space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center gap-4 px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                      isActive(item.path)
                        ? "bg-coral-50 text-coral-600 border border-coral-200"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.label}
                  </Link>
                ))}
                
                {/* Mobile Auth */}
                {isAuthenticated ? (
                  <div className="space-y-2 pt-2 border-t border-gray-200">
                    <Link
                      to="/admin"
                      onClick={() => setIsMenuOpen(false)}
                      className={`flex items-center gap-4 px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                        isActive("/admin")
                          ? "bg-coral-50 text-coral-600 border border-coral-200"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                      }`}
                    >
                      Dashboard ({userRole})
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center gap-4 px-4 py-3 rounded-xl text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 w-full"
                    >
                      <LogOut className="h-5 w-5" />
                      Logout
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setIsLoginModalOpen(true);
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center gap-4 px-4 py-3 rounded-xl text-base font-medium bg-coral-500 text-white hover:bg-coral-600 w-full"
                  >
                    <LogIn className="h-5 w-5" />
                    Login
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>
      
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
      />
    </>
  );
};

export default Navigation;
