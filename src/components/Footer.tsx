
import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary text-white pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">KJ CONNECT</h3>
            <p className="text-sm text-gray-300 mb-4">
              A platform for connecting students with events, opportunities, and academic information.
            </p>
            <div className="flex space-x-4">
              {/* Social media links would go here */}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-accent transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/events" className="hover:text-accent transition-colors">Events</Link>
              </li>
              <li>
                <Link to="/exam-cell" className="hover:text-accent transition-colors">Exam Cell</Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-accent transition-colors">Login</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                <span>K J Somaiya College of Engineering, Vidyavihar, Mumbai</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2" />
                <span>+91 22 1234 5678</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2" />
                <span>info@somaiya.edu</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} KJ CONNECT. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
