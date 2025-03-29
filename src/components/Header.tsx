
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from "@/components/ui/button";
import { UserCircle, LogOut, Menu } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from 'react';

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Events', path: '/events' },
    { name: 'Exam Cell', path: '/exam-cell' },
  ];

  const userSpecificLinks = () => {
    if (user?.role === 'committee-head') {
      return [{ name: 'Post Event', path: '/post-event' }];
    }
    if (user?.role === 'exam-cell') {
      return [{ name: 'Post Exam Files', path: '/post-exam-file' }];
    }
    return [];
  };

  const allLinks = [...navLinks, ...userSpecificLinks()];

  return (
    <header className="bg-primary text-white py-4 px-6 md:px-8 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link to="/" className="flex items-center font-bold text-xl">
            <span className="mr-2">KJ</span>
            <span className="text-accent">CONNECT</span>
          </Link>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex space-x-6 ml-8">
            {allLinks.map((link) => (
              <Link 
                key={link.path} 
                to={link.path} 
                className="hover:text-accent transition-colors font-medium"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Mobile navigation */}
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <div className="flex flex-col space-y-4 pt-8">
                {allLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="py-2 hover:text-primary transition-colors font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
                {isAuthenticated && (
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* User menu (desktop) */}
        <div className="hidden md:block">
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-white flex items-center">
                  <UserCircle className="mr-2 h-5 w-5" />
                  {user?.name}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <span className="text-muted-foreground">
                    Role: {user?.role?.replace('-', ' ').charAt(0).toUpperCase() + user?.role?.replace('-', ' ').slice(1)}
                  </span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span className="text-muted-foreground">{user?.email}</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-500">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button 
              variant="secondary" 
              onClick={() => navigate('/login')}
            >
              Login
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
