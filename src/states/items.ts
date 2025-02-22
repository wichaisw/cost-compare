import { atom } from "nanostores";
import type { ItemType } from "../components/Item";

export const itemList = atom<ItemType[]>([]);
export const sortedItemList = atom<ItemType[]>([]);
