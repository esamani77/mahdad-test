import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

type Theme = boolean;
export type fontSize = "small" | "medium" | "large";

export const darkModeAtom = atomWithStorage<Theme>("darkMode", false);
export const fontSizeAtom = atomWithStorage<fontSize>("fontSize", "medium");