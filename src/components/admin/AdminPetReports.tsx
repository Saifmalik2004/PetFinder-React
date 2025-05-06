
import { useState, useEffect } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardFooter 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Check, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";

type PetReport = {
  id: string;
  pet_name?: string;
  pet_type: string;
  status: string;
  image_url?: string;
  created_at: string;
  contact_name: string;
  contact_email?: string;
};

const AdminPetReports = () => {
  const [activeTab, setActiveTab] = useState<string>("lost");
  const [reports, setReports] = useState<PetReport[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const isMobile = useIsMobile();

  const fetchReports = async () => {
    setLoading(true);
    let data;
    
    if (activeTab === "lost") {
      const { data: lostPets, error } = await supabase
        .from("lost_pets")
        .select("*")
        .eq("status", "pending")
        .order("created_at", { ascending: false });
      
      if (error) {
        console.error("Error fetching lost pets:", error);
        toast.error("Failed to fetch lost pets reports");
        setLoading(false);
        return;
      }
      data = lostPets;
    } else {
      const { data: foundPets, error } = await supabase
        .from("found_pets")
        .select("*")
        .eq("status", "pending")
        .order("created_at", { ascending: false });
      
      if (error) {
        console.error("Error fetching found pets:", error);
        toast.error("Failed to fetch found pets reports");
        setLoading(false);
        return;
      }
      data = foundPets;
    }
    
    setReports(data as PetReport[]);
    setLoading(false);
  };

  useEffect(() => {
    fetchReports();
  }, [activeTab]);

  const updateReportStatus = async (id: string, status: string) => {
    try {
      const table = activeTab === "lost" ? "lost_pets" : "found_pets";
      
      const { error } = await supabase
        .from(table)
        .update({ status })
        .eq("id", id);
      
      if (error) throw error;
      
      toast.success(`Report ${status === "approved" ? "approved" : "rejected"} successfully`);
      fetchReports(); // Refresh the list
    } catch (error) {
      console.error(`Error updating report status:`, error);
      toast.error("Failed to update report status");
    }
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full max-w-xs mx-auto flex">
          <TabsTrigger value="lost" className="flex-1">Lost Pets</TabsTrigger>
          <TabsTrigger value="found" className="flex-1">Found Pets</TabsTrigger>
        </TabsList>
      </Tabs>
      
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-4">
                <div className="h-40 bg-gray-200 rounded-md"></div>
                <div className="h-4 bg-gray-200 rounded-md mt-4"></div>
                <div className="h-4 bg-gray-200 rounded-md mt-2 w-3/4"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : reports.length === 0 ? (
        <div className="text-center py-8 md:py-10">
          <p className="text-gray-500">No pending reports found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {reports.map((report) => (
            <Card key={report.id} className="overflow-hidden">
              <CardHeader className={`pb-2 ${isMobile ? 'flex-col' : 'flex-row justify-between items-start'}`}>
                <div>
                  <CardTitle className="text-lg line-clamp-1">
                    {report.pet_name || report.pet_type}
                  </CardTitle>
                  <CardDescription className="line-clamp-1">
                    Reported by {report.contact_name}
                  </CardDescription>
                </div>
                <Badge variant={report.status === "pending" ? "outline" : "default"} 
                       className={`whitespace-nowrap ${isMobile ? 'mt-2 self-start' : ''}`}>
                  {report.status}
                </Badge>
              </CardHeader>
              <CardContent className="pt-2">
                {report.image_url ? (
                  <div className="aspect-video w-full overflow-hidden rounded-md mb-4">
                    <img 
                      src={report.image_url} 
                      alt={report.pet_name || report.pet_type} 
                      className="object-cover w-full h-full"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/placeholder.svg";
                      }}
                    />
                  </div>
                ) : (
                  <div className="aspect-video w-full overflow-hidden rounded-md mb-4 bg-gray-100 flex items-center justify-center">
                    <span className="text-gray-400">No image</span>
                  </div>
                )}
                <div className="text-sm">
                  <p><strong>Type:</strong> {report.pet_type}</p>
                  <p><strong>Date:</strong> {format(new Date(report.created_at), "PPP")}</p>
                  {report.contact_email && (
                    <p className="truncate"><strong>Email:</strong> {report.contact_email}</p>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-1/2 mr-1"
                  onClick={() => updateReportStatus(report.id, "rejected")}
                >
                  <X className="h-4 w-4 mr-1" /> Reject
                </Button>
                <Button 
                  variant="default" 
                  size="sm" 
                  className="w-1/2 ml-1"
                  onClick={() => updateReportStatus(report.id, "approved")}
                >
                  <Check className="h-4 w-4 mr-1" /> Approve
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminPetReports;
