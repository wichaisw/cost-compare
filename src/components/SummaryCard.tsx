import { useStore } from "@nanostores/react";
import { sortedItemList } from "../states/items";

import {
  getPriceDifference,
  getPriceDifferencePercent,
  getPricePerUnit,
  getSavedCost,
} from "../utils/priceCalculations";
import { currency } from "../states/configs";
import type { ItemType } from "./Item";

export function SummaryCard() {
  const $sortedItemList: ItemType[] = useStore(sortedItemList);
  const $currency: string = useStore(currency);
  const [firstItem] = $sortedItemList;

  if ($sortedItemList.length < 2) {
    return null;
  }

  return (
    <div className="mb-32 w-full">
      <div className="mb-2 text-xl font-bold text-white">
        <span>{firstItem.itemName} is the cheapest choice!</span>
        {/* <span>
          Buying {firstItem.amount} units will save you{" "}
          {getSavedCost(firstItem, secondItem)} {$currency}
        </span> */}
      </div>
      <div className="flex w-full flex-col overflow-auto rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              <th className="border-blue-gray-100 bg-blue-gray-50 border-b p-4">
                Item
              </th>
              <th className="border-blue-gray-100 bg-blue-gray-50 border-b p-4">
                {$currency}/Unit
              </th>
              <th className="border-blue-gray-100 bg-blue-gray-50 border-b p-4">
                <span className="whitespace-normal text-wrap break-all">
                  The Cheapest Saved You by ...
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {$sortedItemList.map((item, index) => {
              return (
                <tr key={`${item.itemName}-${index}`}>
                  <td className="border-blue-gray-50 border-b p-4">
                    {item.itemName}
                  </td>
                  <td className="border-blue-gray-50 border-b p-4">
                    {getPricePerUnit(item.price, item.amount)}
                  </td>
                  <td className="border-blue-gray-50 whitespace-normal text-wrap break-all border-b p-4">
                    {index === 0 ? (
                      <p>Cheapest Choice!</p>
                    ) : item.price === 0 ? (
                      <p>It's Free!</p>
                    ) : (
                      <p>
                        {getPriceDifference(firstItem, item)} {$currency}/Unit (
                        {getPriceDifferencePercent(firstItem, item)} %)
                      </p>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
