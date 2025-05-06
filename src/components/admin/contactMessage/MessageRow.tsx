import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Eye, Mail, MoreHorizontal } from "lucide-react";
import { ContactMessage } from "@/types/contact";

type MessageRowProps = {
  message: ContactMessage;
  setSelectedMessage: (message: ContactMessage | null) => void;
  handleMarkAsRead: (id: string) => void;
  handleReplyByEmail: (email: string, subject: string) => void;
};

const MessageRow = ({
  message,
  setSelectedMessage,
  handleMarkAsRead,
  handleReplyByEmail,
}: MessageRowProps) => {
  return (
    <TableRow className={message.read ? "" : "font-medium bg-gray-50"}>
      <TableCell>
        <div
          className={`h-2 w-2 rounded-full ${
            message.read ? "bg-gray-300" : "bg-purple-500"
          }`}
        />
      </TableCell>
      <TableCell>
        {message.name}
        <div className="sm:hidden text-xs text-gray-500 mt-1">
          {message.subject && `${message.subject} | `}
          {format(new Date(message.created_at), "MMM d, yyyy")}
        </div>
      </TableCell>
      <TableCell className="hidden sm:table-cell max-w-[200px] truncate">
        {message.subject}
      </TableCell>
      <TableCell className="hidden sm:table-cell">
        {format(new Date(message.created_at), "MMM d, yyyy")}
      </TableCell>
      <TableCell className="text-right">
        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => {
                  setSelectedMessage(message);
                  if (!message.read) {
                    handleMarkAsRead(message.id);
                  }
                }}
              >
                View
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleReplyByEmail(message.email, message.subject)}
              >
                Reply
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="hidden md:flex justify-end gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => {
                  setSelectedMessage(message);
                  if (!message.read) {
                    handleMarkAsRead(message.id);
                  }
                }}
              >
                <span className="sr-only">View message</span>
                <Eye className="h-4 w-4" />
              </Button>
            </DialogTrigger>
          </Dialog>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => handleReplyByEmail(message.email, message.subject)}
          >
            <span className="sr-only">Reply</span>
            <Mail className="h-4 w-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default MessageRow;