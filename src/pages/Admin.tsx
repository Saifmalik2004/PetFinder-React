import { useState, useEffect } from "react";
import { Routes, Route, Link, useLocation, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, FileSearch, FilePlus, Users, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import RequireAuth from "@/components/auth/RequireAuth";
import AdminDashboard from "@/components/admin/AdminDashboard";
import AdminLostPets from "@/components/admin/AdminLostPets";
import AdminFoundPets from "@/components/admin/AdminFoundPets";
import AdminAdoptions from "@/components/admin/AdminAdoptions";
import AdminReports from "@/components/admin/AdminReports";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";

const Admin = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("dashboard");
  const { isAdmin, user } = useAuth();
  const isMobile = useIsMobile();

  useEffect(() => {
    const path = location.pathname;
    if (path.includes("/admin/lost-pets")) setActiveTab("lost-pets");
    else if (path.includes("/admin/found-pets")) setActiveTab("found-pets");
    else if (path.includes("/admin/adoptions")) setActiveTab("adoptions");
    else if (path.includes("/admin/reports")) setActiveTab("reports");
    else setActiveTab("dashboard");
  }, [location]);

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (!isAdmin) {
    toast.error("Access denied. Admin privileges required.");
    return <Navigate to="/" replace />;
  }

  const tabs = [
    {
      id: "dashboard",
      label: "Dashboard",
      component: <AdminDashboard />,
      path: "/admin",
    },
    {
      id: "lost-pets",
      label: "Lost Pets",
      component: <AdminLostPets />,
      path: "/admin/lost-pets",
    },
    {
      id: "found-pets",
      label: "Found Pets",
      component: <AdminFoundPets />,
      path: "/admin/found-pets",
    },
    {
      id: "adoptions",
      label: "Adoptions",
      component: <AdminAdoptions />,
      path: "/admin/adoptions",
    },
    {
      id: "reports",
      label: "Reports",
      component: <AdminReports />,
      path: "/admin/reports",
    },
  ];

  return (
    <RequireAuth adminOnly>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow sticky top-0 z-10">
          <div className="container px-4 py-4 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Link to="/" className="text-gray-800 hover:text-purple-600">
                <Button variant="ghost" size="icon">
                  <span className="sr-only">Go to home page</span>
                  <User className="h-5 w-5" />
                </Button>
              </Link>
              <h1 className="text-xl font-bold">Admin Dashboard</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600 hidden sm:inline">Admin User</span>
              <Link to="/">
                <Button variant="outline" size="sm">Exit Admin</Button>
              </Link>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-2 py-2">
          <Tabs
            defaultValue="dashboard"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <div
              className={cn(
                "sticky top-16 z-20 bg-white shadow-sm rounded-lg p-1 mb-4"
              )}
            >
              <div
                className={cn(
                  "overflow-x-auto scrollbar-hidden",
                  isMobile ? "flex flex-nowrap gap-4" : "flex flex-wrap gap-4"
                )}
              >
                <TabsList className="bg-transparent flex w-full justify-between">
                  {tabs.map((tab) => (
                    <TabsTrigger
                      key={tab.id}
                      value={tab.id}
                      className={cn(
                        "flex items-center gap-2 p-1 text-sm whitespace-nowrap",
                        "data-[state=active]:bg-purple-50 data-[state=active]:text-purple-700",
                        isMobile ? "flex-1 min-w-[100px]" : "flex-1"
                      )}
                      asChild
                    >
                      <Link to={tab.path} onClick={() => setActiveTab(tab.id)}>
                        
                        <span>{tab.label}</span>
                      </Link>
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6 overflow-y-auto max-h-[calc(100vh-128px)]">
              <Routes>
                <Route index element={<AdminDashboard />} />
                <Route path="lost-pets" element={<AdminLostPets />} />
                <Route path="found-pets" element={<AdminFoundPets />} />
                <Route path="adoptions" element={<AdminAdoptions />} />
                <Route path="reports" element={<AdminReports />} />
              </Routes>
            </div>
          </Tabs>
        </div>
      </div>
    </RequireAuth>
  );
};

export default Admin;