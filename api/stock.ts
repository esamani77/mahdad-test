import { axiosInstance } from "@/lib/axiosInstance";

export const getStock = async () => {
  try {
    const responce = await axiosInstance.get("/stock");
    return responce;
  } catch (error) {
    console.log(error);
    return null;
  }
};
