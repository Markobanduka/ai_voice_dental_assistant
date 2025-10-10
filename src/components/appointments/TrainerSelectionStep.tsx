import { useAvailableTrainers } from "@/hooks/use-trainers";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Image from "next/image";
import { MapPinIcon, PhoneIcon, StarIcon } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { TrainerCardsLoading } from "./TrainerCardsLoading";

interface TrainerSelectionStepProps {
  selectedTrainerId: string | null;
  onSelectTrainer: (dentistId: string) => void;
  onContinue: () => void;
}

function TrainerSelectionStep({
  onContinue,
  onSelectTrainer,
  selectedTrainerId,
}: TrainerSelectionStepProps) {
  const { data: trainers = [], isLoading } = useAvailableTrainers();

  if (isLoading)
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Choose Your Dentist</h2>
        <TrainerCardsLoading />
      </div>
    );

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Choose Your Trainer</h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trainers.map((trainer) => (
          <Card
            key={trainer.id}
            className={`cursor-pointer transition-all hover:shadow-lg ${
              selectedTrainerId === trainer.id ? "ring-2 ring-primary" : ""
            }`}
            onClick={() => onSelectTrainer(trainer.id)}
          >
            <CardHeader className="pb-4">
              <div className="flex items-start gap-4">
                <Image
                  src={trainer.imageUrl!}
                  alt={trainer.name}
                  width={64}
                  height={64}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex-1">
                  <CardTitle className="text-lg">{trainer.name}</CardTitle>

                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center gap-1">
                      <StarIcon className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span className="text-sm font-medium">5</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      ({trainer.appointmentCount} appointments)
                    </span>
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPinIcon className="w-4 h-4" />
                <span>Start Fitness</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <PhoneIcon className="w-4 h-4" />
                <span>{trainer.phone}</span>
              </div>
              <p className="text-sm text-muted-foreground">
                {trainer.bio ||
                  "Experienced training professional providing quality sessions."}
              </p>
              <Badge variant="secondary">Licensed Professional</Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedTrainerId && (
        <div className="flex justify-end">
          <Button onClick={onContinue}>Continue to Time Selection</Button>
        </div>
      )}
    </div>
  );
}
export default TrainerSelectionStep;
