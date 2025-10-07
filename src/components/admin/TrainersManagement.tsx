import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  EditIcon,
  MailIcon,
  PhoneIcon,
  PlusIcon,
  StethoscopeIcon,
} from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { Trainer } from "@prisma/client";
import { useGetTrainers } from "@/hooks/use-trainers";
import AddTrainerDialog from "./AddTrainerDialog";
import EditTrainerDialog from "./EditTrainerDialog";

function TrainersManagement() {
  const { data: trainers = [] } = useGetTrainers();

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedTrainer, setSelectedTrainer] = useState<Trainer | null>(null);

  const handleEditTrainer = (trainer: Trainer) => {
    setSelectedTrainer(trainer);
    setIsEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setIsEditDialogOpen(false);
    setSelectedTrainer(null);
  };

  return (
    <>
      <Card className="mb-12">
        <CardHeader className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <StethoscopeIcon className="size-5 text-primary" />
              Trainers Management
            </CardTitle>
            <CardDescription>
              Manage and oversee all trainers in your practice
            </CardDescription>
          </div>

          <Button
            onClick={() => setIsAddDialogOpen(true)}
            className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/100"
          >
            <PlusIcon className="mr-2 size-4" />
            Add Trainers
          </Button>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            {trainers.map((trainer) => (
              <div
                key={trainer.id}
                className="flex items-center justify-between p-4 bg-muted/30 rounded-xl border border-border/50"
              >
                <div className="flex items-center gap-4">
                  <Image
                    src={trainer.imageUrl}
                    alt={trainer.name}
                    width={48}
                    height={48}
                    className="size-12 rounded-full object-cover ring-2 ring-background"
                  />

                  <div>
                    <div className="font-semibold">{trainer.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {trainer.name}

                      <span className="ml-2 px-2 py-0.5 bg-muted rounded text-xs">
                        {trainer.gender === "MALE" ? "Male" : "Female"}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 mt-1">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <MailIcon className="h-3 w-3" />
                        {trainer.email}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <PhoneIcon className="h-3 w-3" />
                        {trainer.phone}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-center">
                    <div className="font-semibold text-primary">
                      {trainer.appointmentCount}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Appointments
                    </div>
                  </div>

                  {trainer.isActive ? (
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                      Active
                    </Badge>
                  ) : (
                    <Badge variant="secondary">Inactive</Badge>
                  )}
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-8 px-3"
                    onClick={() => handleEditTrainer(trainer)}
                  >
                    <EditIcon className="size-4 mr-1" />
                    Edit
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <AddTrainerDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
      />

      <EditTrainerDialog
        key={selectedTrainer?.id}
        isOpen={isEditDialogOpen}
        onClose={handleCloseEditDialog}
        trainer={selectedTrainer}
      />
    </>
  );
}
export default TrainersManagement;
