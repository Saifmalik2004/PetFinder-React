
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import RequireAuth from "@/components/auth/RequireAuth";
import Index from "./pages/Index";
import LostPets from "./pages/LostPets";
import FoundPets from "./pages/FoundPets";
import Adoption from "./pages/Adoption";
import Contact from "./pages/Contact";
import ReportLost from "./pages/ReportLost";
import ReportFound from "./pages/ReportFound";
import PetDetails from "./pages/PetDetails";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import ReunitedPets from "./pages/ReunitedPets";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/lost-pets" element={<LostPets />} />
            <Route path="/lost-pets/:id" element={<PetDetails />} />
            <Route path="/found-pets" element={<FoundPets />} />
            <Route path="/found-pets/:id" element={<PetDetails />} />
            <Route path="/reunited-pets" element={<ReunitedPets />} />
            <Route path="/adoption" element={<Adoption />} />
            <Route path="/adoption/:id" element={<PetDetails />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/report-lost" element={
              <RequireAuth>
                <ReportLost />
              </RequireAuth>
            } />
            <Route path="/report-found" element={
              <RequireAuth>
                <ReportFound />
              </RequireAuth>
            } />
            <Route path="/admin/*" element={
              <RequireAuth adminOnly>
                <Admin />
              </RequireAuth>
            } />
            <Route path="/auth" element={<Auth />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
