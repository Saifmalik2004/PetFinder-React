import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Menu, X, ChevronRight, Home } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useState } from "react";

interface RouteMapping {
  [key: string]: {
    label: string;
    parent?: string;
  };
}

const routeMapping: RouteMapping = {
  "": { label: "Home" },
  "adoption": { label: "Adoption", parent: "" },
  "lost-pets": { label: "Lost Pets", parent: "" },
  "found-pets": { label: "Found Pets", parent: "" },
  "reunited-pets": { label: "Reunited Pets", parent: "" },
  "report-lost": { label: "Report Lost Pet", parent: "lost-pets" },
  "report-found": { label: "Report Found Pet", parent: "found-pets" },
  "contact": { label: "Contact", parent: "" },
  "auth": { label: "Authentication", parent: "" },
  "admin": { label: "Admin Dashboard", parent: "" },
};


const generateBreadcrumbs = (path: string) => {
  // Remove trailing slash if it exists
  const normalizedPath = path.endsWith("/") ? path.slice(0, -1) : path;
  
  // Split the path into segments
  const pathSegments = normalizedPath.split("/").filter(Boolean);
  
  if (pathSegments.length === 0) {
    return [{ label: "Home", path: "/" }];
  }
  
  const breadcrumbs = [{ label: "Home", path: "/" }];
  let currentPath = "";
  
  for (let i = 0; i < pathSegments.length; i++) {
    const segment = pathSegments[i];
    currentPath += `/${segment}`;
    
    if (routeMapping[segment]) {
      breadcrumbs.push({
        label: routeMapping[segment].label,
        path: currentPath,
      });
    } else if (segment.match(/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/)) {
      // If the segment is a UUID, it's likely a detail page
      breadcrumbs.push({
        label: "Details",
        path: currentPath,
      });
    } else {
      breadcrumbs.push({
        label: segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " "),
        path: currentPath,
      });
    }
  }
  
  return breadcrumbs;
};

const Header = () => {
  const { user, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const breadcrumbs = generateBreadcrumbs(location.pathname);
  const isLastItem = (index: number) => index === breadcrumbs.length - 1;

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="bg-white sticky top-0 z-50">
      <div className="container mx-auto py-4 px-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-gray-800">
          Pet Finder
        </Link>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-gray-600 focus:outline-none"
          onClick={toggleMobileMenu}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-4">
          <Link to="/lost-pets" className="text-gray-600 hover:text-gray-800">
            Lost Pets
          </Link>
          <Link to="/found-pets" className="text-gray-600 hover:text-gray-800">
            Found Pets
          </Link>
          <Link to="/reunited-pets" className="text-gray-600 hover:text-gray-800">
            Reunited Pets
          </Link>
          <Link to="/adoption" className="text-gray-600 hover:text-gray-800">
            Adoption
          </Link>
          <Link to="/contact" className="text-gray-600 hover:text-gray-800">
            Contact
          </Link>

          {user ? (
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={signOut}>
                Logout
              </Button>
            </div>
          ) : (
            <Link to="/auth">
              <Button variant="outline" size="sm">
                Login/Register
              </Button>
            </Link>
          )}
        </nav>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white shadow-md z-50 md:hidden">
          <div className="flex flex-col p-4">
            <Link 
              to="/lost-pets" 
              className="py-2 text-gray-600 hover:text-gray-800"
              onClick={() => setMobileMenuOpen(false)}
            >
              Lost Pets
            </Link>
            <Link 
              to="/found-pets" 
              className="py-2 text-gray-600 hover:text-gray-800"
              onClick={() => setMobileMenuOpen(false)}
            >
              Found Pets
            </Link>
            <Link 
              to="/reunited-pets" 
              className="py-2 text-gray-600 hover:text-gray-800"
              onClick={() => setMobileMenuOpen(false)}
            >
              Reunited Pets
            </Link>
            <Link 
              to="/adoption" 
              className="py-2 text-gray-600 hover:text-gray-800"
              onClick={() => setMobileMenuOpen(false)}
            >
              Adoption
            </Link>
            <Link 
              to="/contact" 
              className="py-2 text-gray-600 hover:text-gray-800"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
            
            {user ? (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => {
                  signOut();
                  setMobileMenuOpen(false);
                }}
                className="mt-2"
              >
                Logout
              </Button>
            ) : (
              <Link to="/auth" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" size="sm" className="mt-2 w-full">
                  Login/Register
                </Button>
              </Link>
            )}
          </div>
        </div>
      )}

      {/* Breadcrumbs */}
      {location.pathname !== "/" && (
        <div className="bg-gray-50 py-2 md:py-3 border-b sticky top-16 z-40">
          <div className="container px-4 sm:px-6">
            <Breadcrumb>
              <BreadcrumbList>
                {breadcrumbs.map((breadcrumb, index) => (
                  <React.Fragment key={breadcrumb.path}>
                    <BreadcrumbItem>
                      {isLastItem(index) ? (
                        <BreadcrumbPage className="text-sm">{breadcrumb.label}</BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink asChild>
                          <Link to={breadcrumb.path} className="text-sm flex items-center">
                            {index === 0 && <Home className="h-3.5 w-3.5 mr-1" />}
                            {breadcrumb.label}
                          </Link>
                        </BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                    {!isLastItem(index) && <BreadcrumbSeparator />}
                  </React.Fragment>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          
        </div>
      )}
      
      
    </header>
    
    
  );
};

export default Header;