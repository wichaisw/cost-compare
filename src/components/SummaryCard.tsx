import { useStore } from "@nanostores/react";
import { sortedItemList } from "../states/items";

import {
  getPriceDifference,
  getPriceDifferencePercent,
  getSavedCost,
} from "../utils/priceCalculations";
import { currency } from "../states/configs";
import type { ItemType } from "./Item";

export function SummaryCard() {
  const $sortedItemList: ItemType[] = useStore(sortedItemList);
  const $currency: string = useStore(currency);
  const [firstItem, secondItem] = $sortedItemList;

  if ($sortedItemList.length < 2) {
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
              {getPriceDifference(firstItem, secondItem)} {$currency}/Unit
            </span>
          </div>
          <div className="flew-row flex justify-between">
            <span>Which means</span>
            <span>{getPriceDifferencePercent(firstItem, secondItem)} %</span>
          </div>
          <br />
          <div className="flew-row mt-2 flex justify-between">
            <span>Buying {firstItem.amount} units will save you</span>
            <span>
              {getSavedCost(firstItem, secondItem)} {$currency}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
