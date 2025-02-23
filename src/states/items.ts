import { atom } from "nanostores";
import type { ItemType } from "../components/Item";

export const sortedItemList = atom<ItemType[]>([]);
