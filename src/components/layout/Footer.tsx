
import { Link } from "react-router-dom";
import { PawPrint, Heart, Mail, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 pb-8 pt-16">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <PawPrint className="h-6 w-6 text-purple-600" strokeWidth={2} />
              <span className="text-lg font-display font-semibold">PawPal</span>
            </Link>
            <p className="text-sm text-gray-600 max-w-xs">
              Helping reunite lost pets with their families and finding forever homes for animals in need.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-gray-600 hover:text-purple-600 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/lost-pets" className="text-gray-600 hover:text-purple-600 transition-colors">
                  Lost Pets
                </Link>
              </li>
              <li>
                <Link to="/found-pets" className="text-gray-600 hover:text-purple-600 transition-colors">
                  Found Pets
                </Link>
              </li>
              <li>
                <Link to="/adoption" className="text-gray-600 hover:text-purple-600 transition-colors">
                  Adoption
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold mb-4">Report</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/report/lost" className="text-gray-600 hover:text-purple-600 transition-colors">
                  Report Lost Pet
                </Link>
              </li>
              <li>
                <Link to="/report/found" className="text-gray-600 hover:text-purple-600 transition-colors">
                  Report Found Pet
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-purple-600 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Mail className="h-5 w-5 text-purple-500 shrink-0" />
                <span className="text-gray-600">support@pawpal.com</span>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="h-5 w-5 text-purple-500 shrink-0" />
                <span className="text-gray-600">(555) 123-4567</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 border-t border-gray-200 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-gray-500 mb-4 md:mb-0">
            © {new Date().getFullYear()} PawPal. All rights reserved.
          </p>
          <p className="text-xs text-gray-500 flex items-center">
            Made with <Heart className="h-3 w-3 text-red-500 mx-1" /> for all our furry friends
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
