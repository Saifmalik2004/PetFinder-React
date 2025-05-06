import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Mail } from "lucide-react";
import { ContactMessage } from "@/types/contact";

type MessageDialogProps = {
  selectedMessage: ContactMessage | null;
  setSelectedMessage: (message: ContactMessage | null) => void;
  handleReplyByEmail: (email: string, subject: string) => void;
};

const MessageDialog = ({
  selectedMessage,
  setSelectedMessage,
  handleReplyByEmail,
}: MessageDialogProps) => {
  return (
    <Dialog
      open={!!selectedMessage}
      onOpenChange={(isOpen) => {
        if (!isOpen) setSelectedMessage(null);
      }}
    >
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Contact Message</DialogTitle>
        </DialogHeader>
        {selectedMessage && (
          <div className="grid gap-4 py-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Subject</p>
              <p className="font-medium">{selectedMessage.subject}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">From</p>
                <p>{selectedMessage.name}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Email</p>
                <p>{selectedMessage.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Date</p>
                <p>{format(new Date(selectedMessage.created_at), "MMMM d, yyyy")}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Status</p>
                <p>{selectedMessage.read ? "Read" : "Unread"}</p>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Message</p>
              <div className="mt-2 p-4 bg-gray-50 rounded-md">
                {selectedMessage.message}
              </div>
            </div>
            <div className="flex justify-end">
              <Button
                onClick={() =>
                  handleReplyByEmail(selectedMessage.email, selectedMessage.subject)
                }
              >
                <Mail className="h-4 w-4 mr-2" />
                Reply by Email
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default MessageDialog;