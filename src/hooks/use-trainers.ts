"use client";

import {
  createTrainer,
  getAvailableTrainers,
  geTrainers,
  updateTrainer,
} from "@/lib/actions/trainers";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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
    onError: (error) => console.error("Failed to update doctor:", error),
  });
}

export function useAvailableDoctors() {
  const result = useQuery({
    queryKey: ["getAvailableDoctors"],
    queryFn: getAvailableTrainers,
  });

  return result;
}
