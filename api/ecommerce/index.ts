import {
  usersInfoAtom,
  purchasesAtom,
  Purchase,
  products,
} from "@/store/ecommerce";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";

export const useGetUserInfo = (id: number | null) => {
  const [usersInfo] = useAtom(usersInfoAtom);

  return useQuery({
    queryKey: ["user", id],
    queryFn: () => usersInfo.find((user) => user.id === id),
    enabled: !!id,
  });
};

export const useGetUserPurchases = (id: number) => {
  const [purchasesList] = useAtom(purchasesAtom);

  return useQuery({
    queryKey: ["purchases", id],
    queryFn: () => purchasesList.filter((item) => item.customerId === id),
    enabled: !!id,
  });
};

export const useAddToCard = () => {
  const [usersInfo, setUsersInfo] = useAtom(usersInfoAtom);
  // instead quantity, i'll add a new one.
  return useMutation({
    mutationKey: ["add-to-card"],
    mutationFn: async ({
      productId,
      userId,
    }: {
      productId: number;
      userId: number;
    }) => {
      const userIndex = usersInfo.findIndex((user) => user.id === userId)!;
      const user = usersInfo[userIndex];
      user.activeCard.push(productId);
      usersInfo.splice(userIndex, 1, user);
      setUsersInfo(usersInfo);
      return usersInfo;
    },
  });
};

export const useRemoveFromCard = () => {
  const [usersInfo, setUsersInfo] = useAtom(usersInfoAtom);
  return useMutation({
    mutationKey: ["remove-from-card"],
    mutationFn: async ({
      productId,
      userId,
    }: {
      productId: number;
      userId: number;
    }) => {
      const userIndex = usersInfo.findIndex((user) => user.id === userId)!;
      const user = usersInfo[userIndex];
      user.activeCard = [];
      usersInfo.splice(userIndex, 1, user);
      setUsersInfo(usersInfo);
      return usersInfo;
    },
  });
};

export const useReduceItemFromCard = () => {
  const [usersInfo, setUsersInfo] = useAtom(usersInfoAtom);
  return useMutation({
    mutationKey: ["reduce-item-from-card"],
    mutationFn: async ({
      productId,
      userId,
    }: {
      productId: number;
      userId: number;
    }) => {
      const userIndex = usersInfo.findIndex((user) => user.id === userId)!;
      const user = usersInfo[userIndex];
      const itemIndex = user.activeCard.findIndex((item) => item === productId);
      user.activeCard.splice(itemIndex, 1);
      usersInfo.splice(userIndex, 1, user);
      setUsersInfo(usersInfo);
      return usersInfo;
    },
  });
};

export const useSubmitPurchase = () => {
  const [usersInfo, setUsersInfo] = useAtom(usersInfoAtom);
  const [purchasesList, setPurchasesList] = useAtom(purchasesAtom);
  return useMutation({
    mutationKey: ["purchase"],
    mutationFn: async ({ userId }: { userId: number }) => {
      const userIndex = usersInfo.findIndex((user) => user.id === userId)!;
      const user = usersInfo[userIndex];
      const userPurchaseList: Purchase[] = [];
      user.activeCard.forEach((item) => {
        userPurchaseList.push({
          id: new Date().getTime() * Math.floor(Math.random() * 1000),
          customerId: userId,
          productId: item,
          date: new Date().toISOString().split("T")[0],
        });
      });
      user.activeCard = [];
      setUsersInfo(usersInfo.splice(userIndex, 1, user));
      const newPurchasesList = [...purchasesList, ...userPurchaseList];
      setPurchasesList(newPurchasesList);
      setUsersInfo(usersInfo);
      return usersInfo;
    },
  });
};

export const useUserPurchases = (userId: number) => {
  const [purchasesList] = useAtom(purchasesAtom);
  return useQuery({
    queryKey: ["userPurchases", userId],
    queryFn: () => purchasesList.filter((item) => item.customerId === userId),
  });
};

export const useGetSuggestions = (userId: number) => {
  const [usersInfo] = useAtom(usersInfoAtom);
  return useQuery({
    queryKey: ["suggestions", userId],
    refetchInterval: (query) => {
      return 1000;
    },
    queryFn: () => {
      // randomly i choose one of it's item from it's card and suggest one by that category
      const userIndex = usersInfo.findIndex((user) => user.id === userId)!;
      const user = usersInfo[userIndex];
      const randomItemFromUserCard =
        user.activeCard[Math.floor(Math.random() * user.activeCard.length)];
      const category = products.filter(
        (item) => item.id === randomItemFromUserCard
      )[0].category;
      const randomItemFromCategory = products.filter(
        (item) => item.category === category
      )[Math.floor(Math.random() * products.length)];
      return randomItemFromCategory;
    },
  });
};
