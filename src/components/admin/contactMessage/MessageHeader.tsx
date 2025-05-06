import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

type MessagesHeaderProps = {
  unreadCount: number;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
};

const MessagesHeader = ({ unreadCount, searchTerm, setSearchTerm }: MessagesHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row md:justify-between md:items-center px-4 py-2 md:px-6 md:py-4 gap-4">
      <div className="flex items-center gap-4">
        <h2 className="text-2xl font-bold flex-1">Contact Messages</h2>
        {unreadCount > 0 && (
          <div className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs font-medium">
            {unreadCount} unread
          </div>
        )}
      </div>
      <div className="flex items-center gap-2 w-full md:w-auto">
        <div className="relative flex-1 md:flex-none">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="search"
            placeholder="Search by name, email..."
            className="pl-10 w-full md:w-60"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default MessagesHeader;