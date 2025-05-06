
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useIsMobile } from "@/hooks/use-mobile";

const formSchema = z.object({
  applicant_name: z.string().min(1, "Full name is required"),
  applicant_email: z.string().email("Invalid email address"),
  applicant_phone: z.string().min(1, "Phone number is required"),
  reason: z.string().min(1, "Reason for adoption is required"),
  living_situation: z.string().min(1, "Living situation is required"),
  experience: z.string().min(1, "Pet experience is required"),
});

interface AdoptionApplicationDialogProps {
  petId: string;
  isOpen: boolean;
  onClose: () => void;
}

const AdoptionApplicationDialog = ({
  petId,
  isOpen,
  onClose,
}: AdoptionApplicationDialogProps) => {
  const { user } = useAuth();
  const isMobile = useIsMobile();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      applicant_name: user?.user_metadata?.full_name || "",
      applicant_email: user?.email || "",
      applicant_phone: "",
      reason: "",
      living_situation: "",
      experience: "",
    },
  });

  const applyMutation = useMutation({
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      if (!user) throw new Error("User not authenticated");
      if (!petId) throw new Error("Pet ID not found");

      const { error } = await supabase.from("adoption_applications").insert({
        pet_id: petId,
        user_id: user.id,
        applicant_name: values.applicant_name,
        applicant_email: values.applicant_email,
        applicant_phone: values.applicant_phone,
        reason: values.reason,
        living_situation: values.living_situation,
        experience: values.experience,
        status: "pending",
      });

      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Adoption application submitted successfully!");
      onClose();
      form.reset();
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to submit application");
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    applyMutation.mutate(values);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className={`
          max-w-full sm:max-w-lg max-h-[100vh] 
          ${isMobile ? "p-2 top-0 translate-y-0" : "p-4"} 
          flex flex-col overflow-y-auto
        `}
      >
        <DialogHeader className="shrink-0 pt-4 pb-5">
          <DialogTitle className="text-2xl font-bold">Adoption Application</DialogTitle>
        </DialogHeader>
        <ScrollArea
          className={`${isMobile ? "max-h-[100vh]" : "max-h-[80vh]"} flex-1 overflow-y-auto`}
        >
          <div className="px-1 py-1">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <FormField
                    control={form.control}
                    name="applicant_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Full Name <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="applicant_email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Email <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="e.g. john@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="applicant_phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Phone Number <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input type="tel" placeholder="e.g. +1 123-456-7890" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="reason"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Reason for Adoption <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Why do you want to adopt this pet? (e.g., companionship, family pet)"
                          className="min-h-[60px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="living_situation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Living Situation <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe your home (e.g., apartment, house, yard, other pets)"
                          className="min-h-[60px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="experience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Pet Experience <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe your experience with pets (e.g., previous pets, care knowledge)"
                          className="min-h-[60px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter
                  className={`${isMobile ? "flex-col" : "flex"} gap-2 pt-2 pb-3`}
                >
                  <Button
                    type="button"
                    variant="outline"
                    onClick={onClose}
                    className={`${isMobile ? "w-full" : ""}`}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={applyMutation.isPending}
                    className={`${isMobile ? "w-full" : ""}`}
                  >
                    {applyMutation.isPending ? "Submitting..." : "Submit Application"}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default AdoptionApplicationDialog;
