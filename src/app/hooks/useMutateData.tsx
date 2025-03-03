/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api, publicApi } from "../services/api";

const mutateData = async ({ endpoint, payload }: { endpoint: string; payload: any }) => {
  const { data } = await api.post(endpoint, payload);
  return data;
};

export const useMutateData = (key: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: mutateData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [key] });
    },
  });
};

const mutateAuthData = async ({ endpoint, payload }: { endpoint: string; payload: any }) => {
  const { data } = await publicApi.post(endpoint, payload);
  return data;
};

export const useMutateAuthData = (key: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: mutateAuthData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [key] });
    },
  });
};
