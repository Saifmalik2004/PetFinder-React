
import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FileUpload } from "@/components/ui/file-upload";
import { AdoptionPet } from "@/types/adoption";

export const petFormSchema = z.object({
  pet_name: z.string().min(1, "Pet name is required"),
  pet_type: z.string().min(1, "Pet type is required"),
  breed: z.string().optional(),
  age: z.string().min(1, "Age is required"),
  color: z.string().optional(),
  description: z.string().optional(),
  location: z.string().min(1, "Location is required"),
  image_url: z.string().optional(),
});

export type PetFormValues = z.infer<typeof petFormSchema>;

interface PetFormProps {
  onSubmit: (data: PetFormValues) => void;
  initialValues?: Partial<PetFormValues>;
  isSubmitting: boolean;
  submitLabel: string;
  onCancel: () => void;
  isMobile: boolean;
}

export const PetForm: React.FC<PetFormProps> = ({
  onSubmit,
  initialValues,
  isSubmitting,
  submitLabel,
  onCancel,
  isMobile,
}) => {
  const form = useForm<PetFormValues>({
    resolver: zodResolver(petFormSchema),
    defaultValues: initialValues || {
      pet_name: "",
      pet_type: "",
      breed: "",
      age: "",
      color: "",
      description: "",
      location: "",
      image_url: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <FormField
            control={form.control}
            name="pet_name"
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
            name="pet_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pet Type</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
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
            name="age"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Age</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. 2 years" {...field} />
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
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. NYC Animal Shelter" {...field} />
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
                  placeholder="Provide information about the pet..."
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
          name="image_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pet Image</FormLabel>
              <FormControl>
                <FileUpload
                  onUploadComplete={(url) => form.setValue("image_url", url)}
                  existingUrl={field.value}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className={`flex ${isMobile ? "flex-col" : ""} gap-2 pt-2 pb-3`}>
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className={`${isMobile ? "w-full" : ""}`}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className={`${isMobile ? "w-full" : ""}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : submitLabel}
          </Button>
        </div>
      </form>
    </Form>
  );
};
