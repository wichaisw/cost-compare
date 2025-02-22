import { useStore } from "@nanostores/react";
import { itemList, sortedItemList } from "../states/items";
import { Button } from "./Button";
import type { ItemType } from "./ItemForm";
import { getPricePerUnit } from "../utils/priceCalculations";

export function CompareButton() {
  const $itemList = useStore(itemList);
  useStore(sortedItemList);

  function updateFormAndCompare(currentItemList: ItemType[]) {
    return compareItems(currentItemList);
  }

  function updateItemList(currentItemList: ItemType[]) {
    // todo update item value in itemForm
  }

  function compareItems(currentItemList: ItemType[]) {
    if (currentItemList.length < 2) {
      alert("need at least than 2 items to compare");
      return;
    }

    const result: ItemType[] = currentItemList.toSorted(
      (a: ItemType, b: ItemType): number => {
        return (
          getPricePerUnit(a.price, a.amount) -
          getPricePerUnit(b.price, b.amount)
        );
      },
    );

    return sortedItemList.set(result);
  }

  return (
    <Button
      text="Compare"
      color="blue"
      callback={() => updateFormAndCompare($itemList)}
    />
  );
}
