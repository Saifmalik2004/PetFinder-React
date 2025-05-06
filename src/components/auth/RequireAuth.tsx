
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Skeleton } from "@/components/ui/skeleton";

type RequireAuthProps = {
  children: React.ReactNode;
  adminOnly?: boolean;
};

const RequireAuth = ({ children, adminOnly = false }: RequireAuthProps) => {
  const { user, isAdmin, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md space-y-4">
          <Skeleton className="h-8 w-3/4 mx-auto" />
          <Skeleton className="h-72 w-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/6" />
          </div>
        </div>
      </div>
    );
  }

  // Redirect to signin if user is not logged in
  if (!user) {
    return <Navigate to="/auth?mode=signin" state={{ from: location }} replace />;
  }

  // If it's an admin-only page and user is not admin
  if (adminOnly && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default RequireAuth;
