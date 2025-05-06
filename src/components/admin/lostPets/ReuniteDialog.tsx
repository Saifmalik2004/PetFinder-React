import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { LostPet } from "../../../types/lostPets";

const ReuniteDialog = ({
  open,
  onOpenChange,
  pet,
  onConfirm,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pet: LostPet | null;
  onConfirm: (story: string) => void;
}) => {
  const [reuniteStory, setReuniteStory] = useState("");

  const handleConfirm = () => {
    onConfirm(reuniteStory);
    setReuniteStory("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Mark Pet as Reunited</DialogTitle>
          <DialogDescription>
            Share the reunion story of how this pet was reunited with its owner.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Textarea
            placeholder="Share the story of how this pet was reunited..."
            value={reuniteStory}
            onChange={(e) => setReuniteStory(e.target.value)}
            className="min-h-[120px]"
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleConfirm}>Confirm Reunion</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReuniteDialog;