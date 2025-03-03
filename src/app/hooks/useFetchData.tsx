import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api";

const fetchData = async (endpoint: string) => {
  const { data } = await api.get(endpoint);
  return data;
};

export const useFetchData = (key: string, endpoint: string, enabled?: boolean) => {
  return useQuery({
    queryKey: [key],
    queryFn: () => fetchData(endpoint),
    enabled: enabled
  });
};
