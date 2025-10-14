"use client";

import {
  createTrainer,
  getAvailableTrainers,
  geTrainers,
  updateTrainer,
  checkIfTrainer,
} from "@/lib/actions/trainers";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useIsTrainer() {
  return useQuery({
    queryKey: ["isTrainer"],
    queryFn: checkIfTrainer,
  });
}

export function useGetTrainers() {
  const result = useQuery({
    queryKey: ["getTrainers"],
    queryFn: geTrainers,
  });

  return result;
}

export function useCreateTrainer() {
  const queryClient = useQueryClient();

  const result = useMutation({
    mutationFn: createTrainer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getTrainers"] });
    },
    onError: (error) => console.log("Error while  creating a trainer"),
  });

  return result;
}

export function useUpdateTrainer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTrainer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getTrainers"] });
      queryClient.invalidateQueries({ queryKey: ["getAvailableTrainers"] });
    },
    onError: (error) => console.error("Failed to update trainer:", error),
  });
}

export function useAvailableTrainers() {
  const result = useQuery({
    queryKey: ["getAvailableTrainers"],
    queryFn: getAvailableTrainers,
  });

  return result;
}
