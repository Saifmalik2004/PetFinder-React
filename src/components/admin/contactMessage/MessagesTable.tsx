import { Table, TableBody, TableHead, TableHeader, TableRow,TableCell } from "@/components/ui/table";
import { ContactMessage } from "@/types/contact";
import MessageRow from "./MessageRow";
import MessageDialog from "./MessageDialog";

type MessagesTableProps = {
  messages: ContactMessage[];
  isLoading: boolean;
  selectedMessage: ContactMessage | null;
  setSelectedMessage: (message: ContactMessage | null) => void;
  handleMarkAsRead: (id: string) => void;
  handleReplyByEmail: (email: string, subject: string) => void;
};

const MessagesTable = ({
  messages,
  isLoading,
  selectedMessage,
  setSelectedMessage,
  handleMarkAsRead,
  handleReplyByEmail,
}: MessagesTableProps) => {
  return (
    <>
      <div className="overflow-x-auto border rounded-lg">
        <Table className="min-w-[600px] w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[60px]">Status</TableHead>
              <TableHead>From</TableHead>
              <TableHead className="hidden sm:table-cell max-w-[200px]">
                Subject
              </TableHead>
              <TableHead className="hidden sm:table-cell">Date</TableHead>
              <TableHead className="w-[80px] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-10">
                  Loading...
                </TableCell>
              </TableRow>
            ) : messages.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-10">
                  No messages found
                </TableCell>
              </TableRow>
            ) : (
              messages.map((message) => (
                <MessageRow
                  key={message.id}
                  message={message}
                  setSelectedMessage={setSelectedMessage}
                  handleMarkAsRead={handleMarkAsRead}
                  handleReplyByEmail={handleReplyByEmail}
                />
              ))
            )}
          </TableBody>
        </Table>
      </div>
      <MessageDialog
        selectedMessage={selectedMessage}
        setSelectedMessage={setSelectedMessage}
        handleReplyByEmail={handleReplyByEmail}
      />
    </>
  );
};

export default MessagesTable;