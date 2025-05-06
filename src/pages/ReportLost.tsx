import Layout from "@/components/layout/Layout";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FileUpload } from "@/components/ui/file-upload";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import RequireAuth from "@/components/auth/RequireAuth";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  petName: z.string().min(1, "Pet name is required"),
  petType: z.string().min(1, "Pet type is required"),
  breed: z.string().optional(),
  color: z.string().optional(),
  lastSeenLocation: z.string().min(1, "Last seen location is required"),
  lastSeenDate: z.string().min(1, "Last seen date is required"),
  contactName: z.string().min(1, "Your name is required"),
  contactEmail: z.string().email("Invalid email").optional().or(z.literal("")),
  contactPhone: z.string().optional().or(z.literal("")),
  description: z.string().optional().or(z.literal("")),
  imageUrl: z.string().optional().or(z.literal("")),
});

type FormValues = z.infer<typeof formSchema>;

const ReportLost = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      petName: "",
      petType: "",
      breed: "",
      color: "",
      lastSeenLocation: "",
      lastSeenDate: new Date().toISOString().split("T")[0],
      contactName: "",
      contactEmail: "",
      contactPhone: "",
      description: "",
      imageUrl: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    if (!user) {
      toast.error("You must be logged in to submit a report");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase.from("lost_pets").insert([
        {
          pet_name: data.petName,
          pet_type: data.petType,
          breed: data.breed || null,
          color: data.color || null,
          last_seen_location: data.lastSeenLocation,
          last_seen_date: data.lastSeenDate,
          contact_name: data.contactName,
          contact_email: data.contactEmail || null,
          contact_phone: data.contactPhone || null,
          description: data.description || null,
          image_url: data.imageUrl || null,
          reunite_story: null,
          user_id: user.id,
        },
      ]);

      if (error) throw error;

      toast.success("Report submitted successfully! It will be reviewed by our team.");
      navigate("/lost-pets");
    } catch (error: any) {
      toast.error(`Error submitting report: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <RequireAuth>
        <div className="page-container max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4">Report a Lost Pet</h1>
            <p className="text-gray-600">
              We understand how distressing it can be to lose a pet. Fill out the form below with as
              much detail as possible to help others identify your pet. All submitted reports will
              be reviewed and published to our lost pets page.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="petName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Pet Name</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. Max" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="petType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Pet Type</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select pet type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Dog">Dog</SelectItem>
                              <SelectItem value="Cat">Cat</SelectItem>
                              <SelectItem value="Bird">Bird</SelectItem>
                              <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="breed"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Breed (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. Golden Retriever" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="color"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Color (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. Golden/Brown" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="lastSeenLocation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Seen Location</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. Central Park, New York" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="lastSeenDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Seen Date</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description (Optional)</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Provide any additional details that might help identify your pet..." 
                            className="min-h-[120px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="imageUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pet Image</FormLabel>
                        <FormControl>
                          <FileUpload 
                            onUploadComplete={(url) => form.setValue("imageUrl", url)} 
                            existingUrl={field.value}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="pt-4 border-t border-gray-200">
                    <h3 className="font-medium mb-4">Contact Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="contactName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Your Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="contactEmail"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email (Optional)</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="you@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="contactPhone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone (Optional)</FormLabel>
                            <FormControl>
                              <Input placeholder="(123) 456-7890" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-4 pt-4">
                  <Button type="button" variant="outline" onClick={() => navigate(-1)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit Report"}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </RequireAuth>
    </Layout>
  );
};

export default ReportLost;
