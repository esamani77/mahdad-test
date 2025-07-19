import { atomWithStorage } from "jotai/utils";

type User = {
  id: number;
  name: string;
  city: string;
  activeCard: number[];
  purchases: number[];
};

export const customers: User[] = [
  { id: 1, name: "Ahmad", city: "Tehran", activeCard: [], purchases: [] },
  { id: 2, name: "Mehran", city: "Shiraz", activeCard: [], purchases: [] },
  { id: 3, name: "Ali", city: "Esfahan", activeCard: [], purchases: [] },
];

export const products = [
  { id: 101, name: "Laptop", category: "Electronics" },
  { id: 102, name: "Mouse", category: "Electronics" },
  { id: 103, name: "Monitor", category: "Electronics" },
  { id: 104, name: "Coffee Maker", category: "Home Appliances" },
  { id: 105, name: "Blender", category: "Home Appliances" },
  { id: 106, name: "Headphones", category: "Electronics" },
];

export interface Purchase {
  id: number;
  customerId: number;
  productId: number;
  date: string;
}
export const usersInfoAtom = atomWithStorage<User[]>("usersInfo", customers);
export const selectedCustomersAtom = atomWithStorage<number | null>(
  "selectedCustomers",
  null
);
export const purchasesAtom = atomWithStorage<Purchase[]>("purchases", []);
