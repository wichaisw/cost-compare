import { useStore } from "@nanostores/react";
import { sortedItemList } from "../states/items";
import type { ItemType } from "./ItemForm";
import {
  getPriceDifference,
  getPriceDifferencePercent,
  getSavedCost,
} from "../utils/priceCalculations";

export function SummaryCard() {
  const $sortedItemList: ItemType[] = useStore(sortedItemList);
  const [firstItem, secondItem] = $sortedItemList;

  if ($sortedItemList.length === 0) {
    return null;
  }

  return (
    <div className="overflow-hidden rounded shadow-lg">
      <div className="px-6 py-4">
        <div className="mb-2 text-xl font-bold">Summary</div>
        <div className="text-base text-gray-700">
          <span>{firstItem.itemName} is the cheapest</span>
          <br />
          <span>{secondItem.itemName} is the second cheapest</span>
          <br />
          <div className="flew-row mt-2 flex justify-between">
            <span>
              {firstItem.itemName} is cheaper than {secondItem.itemName} by
            </span>
            <span>
              {getPriceDifference(firstItem, secondItem)} Currency/Unit
            </span>
          </div>
          <div className="flew-row flex justify-between">
            <span>Which means</span>
            <span>{getPriceDifferencePercent(firstItem, secondItem)} %</span>
          </div>
          <br />
          <div className="flew-row mt-2 flex justify-between">
            <span>Buying {firstItem.amount} units will save you</span>
            <span>{getSavedCost(firstItem, secondItem)} Currency</span>
          </div>
        </div>
      </div>
    </div>
  );
}
