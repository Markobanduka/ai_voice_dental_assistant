import { useUpdateTrainer } from "@/hooks/use-trainers";
import { formatPhoneNumber } from "@/lib/utils";
import { Trainer, Gender } from "@prisma/client";
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

interface EditTrainerDialogProps {
  isOpen: boolean;
  onClose: () => void;
  trainer: Trainer | null;
}

function EditTrainerDialog({
  trainer,
  isOpen,
  onClose,
}: EditTrainerDialogProps) {
  const [editingTrainer, setEditingTrainer] = useState<Trainer | null>(trainer);

  const updateTrainerMutation = useUpdateTrainer();

  const handlePhoneChange = (value: string) => {
    const formattedPhoneNumber = formatPhoneNumber(value);
    if (editingTrainer) {
      setEditingTrainer({ ...editingTrainer, phone: formattedPhoneNumber });
    }
  };

  const handleSave = () => {
    if (editingTrainer) {
      updateTrainerMutation.mutate(
        { ...editingTrainer },
        { onSuccess: handleClose }
      );
    }
  };

  const handleClose = () => {
    onClose();
    setEditingTrainer(null);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Doctor</DialogTitle>
          <DialogDescription>
            Update doctor information and status.
          </DialogDescription>
        </DialogHeader>

        {editingTrainer && (
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={editingTrainer.name}
                  onChange={(e) =>
                    setEditingTrainer({
                      ...editingTrainer,
                      name: e.target.value,
                    })
                  }
                />
              </div>
              {/* <div className="space-y-2">
                <Label htmlFor="speciality">Speciality</Label>
                <Input
                  id="speciality"
                  value={editingDoctor.speciality}
                  onChange={(e) =>
                    setEditingDoctor({ ...editingDoctor, speciality: e.target.value })
                  }
                />
              </div> */}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={editingTrainer.email}
                onChange={(e) =>
                  setEditingTrainer({
                    ...editingTrainer,
                    email: e.target.value,
                  })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={editingTrainer.phone}
                onChange={(e) => handlePhoneChange(e.target.value)}
                placeholder="(060) 123-4567"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select
                  value={editingTrainer.gender || ""}
                  onValueChange={(value) =>
                    setEditingTrainer({
                      ...editingTrainer,
                      gender: value as Gender,
                    })
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
                <Label htmlFor="status">Status</Label>
                <Select
                  value={editingTrainer.isActive ? "active" : "inactive"}
                  onValueChange={(value) =>
                    setEditingTrainer({
                      ...editingTrainer,
                      isActive: value === "active",
                    })
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
        )}

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="bg-primary hover:bg-primary/90"
            disabled={updateTrainerMutation.isPending}
          >
            {updateTrainerMutation.isPending ? "Saving..." : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default EditTrainerDialog;
