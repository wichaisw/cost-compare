import { atom } from "nanostores";
import type { ItemType } from "../components/ItemForm";

export const itemList = atom<ItemType[]>([]);
export const sortedItemList = atom<ItemType[]>([]);
