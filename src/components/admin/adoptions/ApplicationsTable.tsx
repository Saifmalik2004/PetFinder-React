
import React from "react";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { CheckCircle, XCircle, Eye } from "lucide-react";
import { StatusBadge } from "./StatusBadge";
import { AdoptionApplication } from "@/types/adoption";
import { ApplicationDetailsDialog } from "./ApplicationDetailsDialog";




interface ApplicationsTableProps {
  applications: AdoptionApplication[];
  isLoading: boolean;
  handleApproveApplication: (id: string, petId: string) => void;
  handleRejectApplication: (id: string) => void;
  setSelectedApplication: (app: AdoptionApplication | null) => void;
}

export const ApplicationsTable: React.FC<ApplicationsTableProps> = ({
  applications,
  isLoading,
  handleApproveApplication,
  handleRejectApplication,
  setSelectedApplication,
}) => {
  return (
    <Table className="min-w-[800px] table-fixed w-full">
      <TableHeader className="sticky top-0 bg-white z-10">
        <TableRow>
          <TableHead className="w-[100px]">Status</TableHead>
          <TableHead>Pet Name</TableHead>
          <TableHead>Type/Breed</TableHead>
          <TableHead>Applicant</TableHead>
          <TableHead>Date Applied</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading ? (
          <TableRow>
            <TableCell colSpan={6} className="text-center py-10">
              Loading...
            </TableCell>
          </TableRow>
        ) : applications.length === 0 ? (
          <TableRow>
            <TableCell colSpan={6} className="text-center py-10">
              No applications found
            </TableCell>
          </TableRow>
        ) : (
          applications.map((app) => (
            <TableRow key={app.id}>
              <TableCell><StatusBadge status={app.status} /></TableCell>
              <TableCell className="font-medium">{app.pet_name}</TableCell>
              <TableCell>
                {app.pet_type} {app.pet_breed ? `(${app.pet_breed})` : ""}
              </TableCell>
              <TableCell>{app.applicant_name}</TableCell>
              <TableCell>
                {format(new Date(app.created_at), "MMM d, yyyy")}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => setSelectedApplication(app)}
                      >
                        <span className="sr-only">View details</span>
                        <Eye className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <ApplicationDetailsDialog />
                  </Dialog>
                  {app.status === "pending" && (
                    <>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => handleApproveApplication(app.id, app.pet_id)}
                      >
                        <span className="sr-only">Approve</span>
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => handleRejectApplication(app.id)}
                      >
                        <span className="sr-only">Reject</span>
                        <XCircle className="h-4 w-4 text-red-500" />
                      </Button>
                    </>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};
