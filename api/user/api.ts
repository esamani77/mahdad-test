import { axiosInstance } from "@/lib/axiosInstance";
import { useQuery } from "@tanstack/react-query";

const getUser = async (id: number, abort?: AbortController) => {
  try {
    const responce = await axiosInstance.get(`/user/${id}`, {
      signal: abort?.signal,
    });
    return responce;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const useGetUserQuery = (
  id?: number | undefined,
  abort?: AbortController | null
) => {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => (id ? getUser(id, abort) : null),
    enabled: !!id,
    staleTime: 24 * 60 * 60 * 1000, // 24h
  });
};
