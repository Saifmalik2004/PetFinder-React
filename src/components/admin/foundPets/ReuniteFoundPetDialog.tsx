
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

interface ReuniteFoundPetDialogProps {
  onConfirm: (story: string) => void;
  onCancel: () => void;
}

const ReuniteFoundPetDialog: React.FC<ReuniteFoundPetDialogProps> = ({
  onConfirm,
  onCancel,
}) => {
  const [reuniteStory, setReuniteStory] = useState("");

  return (
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
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={() => onConfirm(reuniteStory)}>
          Confirm Reunion
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default ReuniteFoundPetDialog;
