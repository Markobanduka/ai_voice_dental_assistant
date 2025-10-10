import { useAvailableTrainers } from "@/hooks/use-trainers";
import Image from "next/image";

function TrainerInfo({ trainerId }: { trainerId: string }) {
  const { data: trainers = [] } = useAvailableTrainers();
  const trainer = trainers.find((t) => t.id === trainerId);

  if (!trainer) return null;

  return (
    <div className="flex items-center gap-4">
      <Image
        src={trainer.imageUrl!}
        alt={trainer.name}
        width={48}
        height={48}
        className="w-12 h-12 rounded-full object-cover"
      />
      <div>
        <h3 className="font-medium">{trainer.name}</h3>
        {/* <p className="text-sm text-muted-foreground">{trainer.speciality || "General Dentistry"}</p> */}
      </div>
    </div>
  );
}

export default TrainerInfo;
