
import { PawPrint, Search, Heart, User, Bell } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

// Type definitions for the statistics
type DashboardStats = {
  lostPetsCount: number;
  foundPetsCount: number;
  adoptionPetsCount: number;
  pendingApprovalsCount: number;
  recentActivities: Array<{
    id: string;
    type: "lost" | "found" | "adoption";
    title: string;
    subtitle: string;
    createdAt: string;
  }>;
};

const AdminDashboard = () => {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["dashboardStats"],
    queryFn: async () => {
      // Get counts for different pet categories
      const [
        lostPetsResult, 
        foundPetsResult, 
        adoptionPetsResult,
        pendingLostResult,
        pendingFoundResult,
        pendingAdoptionsResult
      ] = await Promise.all([
        supabase.from("lost_pets").select("id", { count: "exact" }).eq("status", "approved"),
        supabase.from("found_pets").select("id", { count: "exact" }).eq("status", "approved"),
        supabase.from("adoption_pets").select("id", { count: "exact" }).eq("status", "available"),
        supabase.from("lost_pets").select("id", { count: "exact" }).eq("status", "pending"),
        supabase.from("found_pets").select("id", { count: "exact" }).eq("status", "pending"),
        supabase.from("adoption_applications").select("id", { count: "exact" }).eq("status", "pending"),
      ]);

      // Get recent activities
      const recentLost = await supabase
        .from("lost_pets")
        .select("id, pet_name, last_seen_location, created_at")
        .order("created_at", { ascending: false })
        .limit(2);

      const recentFound = await supabase
        .from("found_pets")
        .select("id, pet_type, breed, found_location, created_at")
        .order("created_at", { ascending: false })
        .limit(2);

      const recentAdoptions = await supabase
        .from("adoption_applications")
        .select(`
          id,
          pet_name:adoption_pets(pet_name),
          created_at,
          applicant_name
        `)
        .order("created_at", { ascending: false })
        .limit(2);

      const recentMessage = await supabase
        .from("contact_messages")
        .select(`
          id,
          name,
          subject,
          created_at
          
        `)
        .order("created_at", { ascending: false })
        .limit(2);


      // Format recent activities
      const activities = [
        ...(recentLost.data || []).map(item => ({
          id: item.id,
          type: "lost" as const,
          title: `New lost pet report: ${item.pet_name}`,
          subtitle: `Lost at ${item.last_seen_location}`,
          createdAt: item.created_at,
        })),
        ...(recentFound.data || []).map(item => ({
          id: item.id,
          type: "found" as const,
          title: `New found pet report: ${item.pet_type}${item.breed ? ` (${item.breed})` : ''}`,
          subtitle: `Found at ${item.found_location}`,
          createdAt: item.created_at,
        })),
        ...(recentAdoptions.data || []).map(item => ({
          id: item.id,
          type: "adoption" as const,
          title: `New adoption application`,
          subtitle: `${item.applicant_name} applied for ${item.pet_name?.pet_name || "a pet"}`,
          createdAt: item.created_at,
        })),
        ...(recentMessage.data || []).map(item => ({
          id: item.id,
          type: "contactMessage" as const,
          title: `New Contact Message`,
          subtitle: `${item.name} sent: "${item.subject}"`,
          createdAt: item.created_at,
        })),
      ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 3);

      return {
        lostPetsCount: lostPetsResult.count || 0,
        foundPetsCount: foundPetsResult.count || 0,
        adoptionPetsCount: adoptionPetsResult.count || 0,
        pendingApprovalsCount: (
          (pendingLostResult.count || 0) + 
          (pendingFoundResult.count || 0) + 
          (pendingAdoptionsResult.count || 0)
        ),
        recentActivities: activities,
      } as DashboardStats;
    },
  });

  // Sample data for charts (would be replaced with real data in a production app)
  const petReportsData = [
    { name: "Jan", lost: 12, found: 8, reunited: 5 },
    { name: "Feb", lost: 10, found: 12, reunited: 7 },
    { name: "Mar", lost: 15, found: 10, reunited: 9 },
    { name: "Apr", lost: 8, found: 9, reunited: 6 },
    { name: "May", lost: 14, found: 11, reunited: 8 },
    { name: "Jun", lost: 18, found: 15, reunited: 10 },
  ];

  const petTypesData = [
    { name: "Dogs", lost: 35, found: 28 },
    { name: "Cats", lost: 28, found: 22 },
    { name: "Birds", lost: 5, found: 3 },
    { name: "Others", lost: 7, found: 5 },
  ];

  // Loading state
  if (isLoading) {
    return (
      <div className="space-y-8">
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-24 bg-gray-100 rounded-lg animate-pulse"></div>
          ))}
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {[1, 2].map((i) => (
            <div key={i} className="h-80 bg-gray-100 rounded-lg animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Total Lost Pets
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="flex items-center">
              <div className="mr-4">
                <Search className="h-10 w-10 text-purple-500" />
              </div>
              <div>
                <div className="text-3xl font-bold">{stats?.lostPetsCount || 0}</div>
                <p className="text-xs text-green-500">Active reports</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Total Found Pets
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="flex items-center">
              <div className="mr-4">
                <PawPrint className="h-10 w-10 text-green-500" />
              </div>
              <div>
                <div className="text-3xl font-bold">{stats?.foundPetsCount || 0}</div>
                <p className="text-xs text-green-500">Active reports</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Available for Adoption
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="flex items-center">
              <div className="mr-4">
                <Heart className="h-10 w-10 text-red-500" />
              </div>
              <div>
                <div className="text-3xl font-bold">{stats?.adoptionPetsCount || 0}</div>
                <p className="text-xs text-green-500">Active listings</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Pending Approvals
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="flex items-center">
              <div className="mr-4">
                <Bell className="h-10 w-10 text-amber-500" />
              </div>
              <div>
                <div className="text-3xl font-bold">{stats?.pendingApprovalsCount || 0}</div>
                <p className="text-xs text-gray-500">Need review</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Pet Reports Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={petReportsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="lost"
                    stroke="#8b5cf6"
                    activeDot={{ r: 8 }}
                  />
                  <Line type="monotone" dataKey="found" stroke="#22c55e" />
                  <Line type="monotone" dataKey="reunited" stroke="#ef4444" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pet Types</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={petTypesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="lost" fill="#8b5cf6" />
                  <Bar dataKey="found" fill="#22c55e" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {stats?.recentActivities.map((activity, i) => (
              <div
                key={activity.id}
                className="flex items-center p-3 rounded-lg bg-gray-50 border border-gray-100"
              >
                <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                  <User className="h-5 w-5 text-purple-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">
                    {activity.title}
                  </p>
                  <p className="text-xs text-gray-500">
                    {activity.subtitle}
                  </p>
                </div>
                <div className="text-xs text-gray-500">
                  {new Date(activity.createdAt).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
