
import React, { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import ResponsiveContainer from "./ResponsiveContainer";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const { isAdmin } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      {isAdmin && (
        <div className="bg-purple-50 py-2">
          <ResponsiveContainer>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-purple-700 font-medium text-sm">Admin Mode</span>
              </div>
              <Link to="/admin">
                <Button size="sm" variant="outline" className="h-8">
                  <Settings className="h-4 w-4 mr-1" />
                  Admin Dashboard
                </Button>
              </Link>
            </div>
          </ResponsiveContainer>
        </div>
      )}
      
     
      
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
