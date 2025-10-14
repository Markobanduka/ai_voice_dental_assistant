import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import TrainerDashboardClient from "./TrainerDashboardClient";

const TrainersPage = async () => {
  const user = await currentUser();

  if (!user) redirect("/");

  const userEmail = user?.emailAddresses[0]?.emailAddress;

  console.log(userEmail);

  if (!userEmail) redirect("/");
  const trainer = await prisma.trainer.findUnique({
    where: { email: userEmail },
  });

  console.log("Trainer:", trainer);

  if (!trainer) {
    redirect("/dashboard");
  }

  return <TrainerDashboardClient />;
};

export default TrainersPage;
