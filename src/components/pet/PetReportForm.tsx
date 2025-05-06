
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
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
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, Upload } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const petTypes = ["Dog", "Cat", "Bird", "Rabbit", "Other"];

const formSchema = z.object({
  petType: z.string().min(1, "Pet type is required"),
  breed: z.string().optional(),
  name: z.string().optional(),
  color: z.string().min(1, "Color description is required"),
  uniqueMarks: z.string().optional(),
  lastSeenDate: z.date({
    required_error: "Date is required",
  }),
  lastSeenLocation: z.string().min(1, "Location is required"),
  description: z.string().min(1, "Description is required"),
  contactName: z.string().min(1, "Contact name is required"),
  contactEmail: z.string().email("Invalid email address"),
  contactPhone: z.string().min(10, "Phone number must be at least 10 digits"),
});

type ReportValues = z.infer<typeof formSchema>;

type PetReportFormProps = {
  type: "lost" | "found";
};

const PetReportForm = ({ type }: PetReportFormProps) => {
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const navigate = useNavigate();

  const form = useForm<ReportValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      petType: "",
      breed: "",
      name: "",
      color: "",
      uniqueMarks: "",
      description: "",
      lastSeenLocation: "",
      contactName: "",
      contactEmail: "",
      contactPhone: "",
    },
  });

  const isLost = type === "lost";
  const pageTitle = isLost ? "Report a Lost Pet" : "Report a Found Pet";
  const dateLabel = isLost ? "When did you last see your pet?" : "When did you find this pet?";
  const locationLabel = isLost ? "Where was your pet last seen?" : "Where did you find this pet?";
  const descriptionLabel = isLost ? "Describe your pet and the circumstances of their disappearance" : "Describe the pet you found and any circumstances";
  const successRedirect = isLost ? "/lost-pets" : "/found-pets";
  const successMessage = isLost ? "Your lost pet report has been submitted" : "Your found pet report has been submitted";

  const onPhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: ReportValues) => {
    // Here we would normally upload the image to Supabase Storage
    // and then create a record in the appropriate table with the image URL

    // Simulate a loading state
    toast.loading("Submitting your report...");

    // Simulate API call with a timeout
    setTimeout(() => {
      console.log("succcessfully sumbmitted");
      toast.dismiss();
      toast.success(successMessage);
      navigate(successRedirect);
    }, 1500);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">{pageTitle}</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
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
                        {petTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
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
                    <FormLabel>Breed (optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter breed if known" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {isLost && (
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pet's Name (optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter pet's name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={form.control}
                name="color"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Color and Markings</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="E.g., Black and white, tabby pattern"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="uniqueMarks"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unique Marks (optional)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="E.g., Scar on left ear, white patch on chest"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div>
                <FormLabel>Photo Upload</FormLabel>
                <div className="mt-2">
                  <div className="flex items-center justify-center w-full">
                    <label
                      htmlFor="photo-upload"
                      className="flex flex-col items-center justify-center w-full h-44 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 border-gray-300"
                    >
                      {photoPreview ? (
                        <img
                          src={photoPreview}
                          alt="Preview"
                          className="object-contain w-full h-full rounded-lg"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="w-10 h-10 mb-3 text-gray-400" />
                          <p className="mb-2 text-sm text-gray-500">
                            <span className="font-semibold">Click to upload</span>{" "}
                            or drag and drop
                          </p>
                          <p className="text-xs text-gray-500">
                            SVG, PNG, JPG (MAX. 800x400px)
                          </p>
                        </div>
                      )}
                      <input
                        id="photo-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={onPhotoChange}
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <FormField
                control={form.control}
                name="lastSeenDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>{dateLabel}</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                          className={cn("p-3 pointer-events-auto")}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastSeenLocation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{locationLabel}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter the location address"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Please be as specific as possible with the location
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{descriptionLabel}</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Provide any additional details that might help"
                        className="resize-none h-24"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="pt-4">
                <h3 className="text-lg font-semibold mb-4">Contact Information</h3>

                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="contactName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Full Name" {...field} />
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
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="your.email@example.com"
                            {...field}
                          />
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
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input
                            type="tel"
                            placeholder="(123) 456-7890"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button type="submit" size="lg" className="bg-purple-600 hover:bg-purple-700">
              Submit Report
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default PetReportForm;
