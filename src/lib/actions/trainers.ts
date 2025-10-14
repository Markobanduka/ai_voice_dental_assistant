"use server";

import { Gender } from "@prisma/client";
import { prisma } from "../prisma";
import { generateAvatar } from "../utils";
import { revalidatePath } from "next/cache";
import { currentUser } from "@clerk/nextjs/server";

export async function checkIfTrainer() {
  const user = await currentUser();
  if (!user) return null;

  const email = user.emailAddresses[0]?.emailAddress;
  if (!email) return null;

  const trainer = await prisma.trainer.findUnique({
    where: { email },
  });

  return !!trainer;
}

export async function geTrainers() {
  try {
    const trainers = await prisma.trainer.findMany({
      include: {
        _count: { select: { appointments: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    return trainers.map((trainer) => ({
      ...trainer,
      appointmentCount: trainer._count.appointments,
    }));
  } catch (error) {
    console.log("Error fetching trainers:", error);
    throw new Error("Failed to fetch trainers");
  }
}

interface CreateTrainerInput {
  name: string;
  email: string;
  phone: string;
  gender: Gender;
  isActive: boolean;
}

export async function createTrainer(input: CreateTrainerInput) {
  try {
    if (!input.name || !input.email)
      throw new Error("Name and email are required");

    const trainer = await prisma.trainer.create({
      data: {
        ...input,
        imageUrl: generateAvatar(input.name, input.gender),
      },
    });

    revalidatePath("/admin");

    return trainer;
  } catch (error: any) {
    console.error("Error creating trainer:", error);

    if (error?.code === "P2002") {
      throw new Error("A trainer with this email already exists");
    }

    throw new Error("Failed to create trainer");
  }
}

interface UpdateTrainerInput extends Partial<CreateTrainerInput> {
  id: string;
}

export async function updateTrainer(input: UpdateTrainerInput) {
  try {
    if (!input.name || !input.email)
      throw new Error("Name and email are required");

    const currentTrainer = await prisma.trainer.findUnique({
      where: { id: input.id },
      select: { email: true },
    });

    if (!currentTrainer) throw new Error("Trainer not found");

    if (input.email !== currentTrainer.email) {
      const existingTrainer = await prisma.trainer.findUnique({
        where: { email: input.email },
      });

      if (existingTrainer) {
        throw new Error("A trainer with this email already exists");
      }
    }

    const trainer = await prisma.trainer.update({
      where: { id: input.id },

      data: {
        name: input.name,
        email: input.email,
        phone: input.phone,
        gender: input.gender,
        isActive: input.isActive,
      },
    });

    return trainer;
  } catch (error) {
    console.error("Error updating trainer:", error);
    throw new Error("Failed to update trainer");
  }
}

export async function getAvailableTrainers() {
  try {
    const trainers = await prisma.trainer.findMany({
      where: { isActive: true },
      include: {
        _count: {
          select: { appointments: true },
        },
      },
      orderBy: { name: "asc" },
    });

    return trainers.map((trainer) => ({
      ...trainer,
      appointmentCount: trainer._count.appointments,
    }));
  } catch (error) {
    console.error("Error fetching available trainers:", error);
    throw new Error("Failed to fetch available trainers");
  }
}
