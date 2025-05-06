
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminContactMessages from "@/components/admin/AdminContactMessages";
import AdminPetReports from "@/components/admin/AdminPetReports";
import ResponsiveContainer from "@/components/layout/ResponsiveContainer";
import { useIsMobile } from "@/hooks/use-mobile";

const AdminReports = () => {
  const isMobile = useIsMobile();

  return (
    <ResponsiveContainer className="space-y-6">
      <div className="flex justify-between items-center flex-wrap">
        <h2 className="text-2xl font-bold mb-4 md:mb-0">Reports & Messages</h2>
      </div>

      <Tabs defaultValue="contact" className="w-full">
        <TabsList className={`mb-6 grid w-full ${isMobile ? 'grid-cols-2' : 'grid-cols-2'} gap-2`}>
          <TabsTrigger value="contact" className="whitespace-nowrap">Contact Messages</TabsTrigger>
          <TabsTrigger value="pet-reports" className="whitespace-nowrap">Pet Reports</TabsTrigger>
        </TabsList>
        <TabsContent value="contact">
          <AdminContactMessages />
        </TabsContent>
        <TabsContent value="pet-reports">
          <AdminPetReports />
        </TabsContent>
      </Tabs>
    </ResponsiveContainer>
  );
};

export default AdminReports;
