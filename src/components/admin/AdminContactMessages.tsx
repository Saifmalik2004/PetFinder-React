import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { ContactMessage } from "@/types/contact";
import MessagesHeader from "../admin/contactMessage/MessageHeader";
import MessagesTable from "../admin/contactMessage/MessagesTable";

const AdminContactMessages = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const queryClient = useQueryClient();

  const { data: messages, isLoading } = useQuery({
    queryKey: ["contactMessages"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("contact_messages")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw new Error(error.message);
      return data as ContactMessage[];
    },
  });

  const markAsReadMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("contact_messages")
        .update({ read: true })
        .eq("id", id);

      if (error) throw new Error(error.message);
      return id;
    },
    onSuccess: (id) => {
      queryClient.setQueryData<ContactMessage[]>(["contactMessages"], (old) =>
        old?.map((msg) => (msg.id === id ? { ...msg, read: true } : msg)) || []
      );
      toast.success("Message marked as read");
    },
  });

  const handleMarkAsRead = (id: string) => {
    markAsReadMutation.mutate(id);
  };

  const handleReplyByEmail = (email: string, subject: string) => {
    if (!email) return toast.error("No email address provided");
    const encodedSubject = encodeURIComponent(`Re: ${subject}`);
    window.open(
      `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${encodedSubject}`,
      "_blank"
    );
  };

  const filteredMessages = messages?.filter((message) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      message.name.toLowerCase().includes(searchLower) ||
      message.subject.toLowerCase().includes(searchLower) ||
      message.email.toLowerCase().includes(searchLower)
    );
  }) || [];

  const unreadCount = messages?.filter((message) => !message.read).length || 0;

  return (
    <div className="space-y-6">
      <MessagesHeader
        unreadCount={unreadCount}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <MessagesTable
        messages={filteredMessages}
        isLoading={isLoading}
        selectedMessage={selectedMessage}
        setSelectedMessage={setSelectedMessage}
        handleMarkAsRead={handleMarkAsRead}
        handleReplyByEmail={handleReplyByEmail}
      />
    </div>
  );
};

export default AdminContactMessages;