import { useCreateTrainer } from "@/hooks/use-trainers";
import { Gender } from "@prisma/client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { formatPhoneNumber } from "@/lib/utils";

interface AddTrainerDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

function AddTrainerDialog({ isOpen, onClose }: AddTrainerDialogProps) {
  const [newTrainer, setNewTrainer] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "MALE" as Gender,
    isActive: true,
  });

  const createTrainerMutation = useCreateTrainer();

  const handlePhoneChange = (value: string) => {
    const formattedPhoneNumber = formatPhoneNumber(value);
    setNewTrainer({ ...newTrainer, phone: formattedPhoneNumber });
  };

  const handleSave = () => {
    createTrainerMutation.mutate({ ...newTrainer }, { onSuccess: handleClose });
  };

  const handleClose = () => {
    onClose();
    setNewTrainer({
      name: "",
      email: "",
      phone: "",
      gender: "MALE",
      isActive: true,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Trainer</DialogTitle>
          <DialogDescription>
            Add a new trainer to your practice.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="new-name">Name *</Label>
            <Input
              id="new-name"
              value={newTrainer.name}
              onChange={(e) =>
                setNewTrainer({ ...newTrainer, name: e.target.value })
              }
              placeholder="John Smith"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="new-email">Email *</Label>
            <Input
              id="new-email"
              type="email"
              value={newTrainer.email}
              onChange={(e) =>
                setNewTrainer({ ...newTrainer, email: e.target.value })
              }
              placeholder="trainer@example.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="new-phone">Phone</Label>
            <Input
              id="new-phone"
              value={newTrainer.phone}
              onChange={(e) => handlePhoneChange(e.target.value)}
              placeholder="(060) 123-4567"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="new-gender">Gender</Label>
              <Select
                value={newTrainer.gender || ""}
                onValueChange={(value) =>
                  setNewTrainer({ ...newTrainer, gender: value as Gender })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MALE">Male</SelectItem>
                  <SelectItem value="FEMALE">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="new-status">Status</Label>
              <Select
                value={newTrainer.isActive ? "active" : "inactive"}
                onValueChange={(value) =>
                  setNewTrainer({ ...newTrainer, isActive: value === "active" })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>

          <Button
            onClick={handleSave}
            className="bg-primary hover:bg-primary/90"
            disabled={
              !newTrainer.name ||
              !newTrainer.email ||
              createTrainerMutation.isPending
            }
          >
            {createTrainerMutation.isPending ? "Adding..." : "Add Trainer"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AddTrainerDialog;
