import { useStore } from "@nanostores/react";
import { itemList, sortedItemList } from "../states/items";
import { Button } from "./Button";

export function ClearButton() {
  useStore(itemList);
  useStore(sortedItemList);

  function clearItemList() {
    itemList.set([]);
    sortedItemList.set([]);
    localStorage.setItem("costCompareItem", "[]");
  }

  return <Button text="Clear" color="gray" callback={clearItemList} />;
}
