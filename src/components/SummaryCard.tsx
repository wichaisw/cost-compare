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
import { useEffect, useState } from "react";

export function SummaryCard() {
  const $sortedItemList: ItemType[] = useStore(sortedItemList);
  const $currency: string = useStore(currency);
  const [cheapestItem, secondCheapestItem] = $sortedItemList;
  const [compareTarget, setCompareTarget] =
    useState<ItemType>(secondCheapestItem);

  useEffect(() => {
    setCompareTarget(secondCheapestItem);
  }, [cheapestItem]);

  if ($sortedItemList.length < 2) {
    return null;
  }

  return (
    <div className="mt-8 w-full lg:mt-14">
      <div className="mb-2 text-white">
        <span className="text-lg font-bold lg:text-xl">
          {cheapestItem.itemName} is the Cheapest Choice!
        </span>
        <br />

        <div>
          <span>
            Buying {cheapestItem.amount} units will save you{" "}
            {getSavedCost(cheapestItem, compareTarget || secondCheapestItem)}
            {` ${$currency} `}
            compared to
          </span>
          <p className="mx-1 inline p-1">
            <select
              id="compare-target"
              className="inline rounded-lg border border-gray-300 bg-gray-50 p-1 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              onChange={(event) =>
                setCompareTarget($sortedItemList[Number(event.target.value)])
              }
              key={`itemList-select`}
            >
              {$sortedItemList.map((item, index) => {
                if (index === 0) return null;
                return (
                  <option key={`${item.itemName}-${index}`} value={index}>
                    {item.itemName}
                  </option>
                );
              })}
            </select>
          </p>
        </div>
      </div>
      <div className="my-4 flex w-full flex-col overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
        <table className="w-full table-auto text-left">
          <thead>
            <tr>
              <th className="border-blue-gray-100 bg-blue-gray-50 border-b p-3">
                Item
              </th>
              <th className="border-blue-gray-100 bg-blue-gray-50 border-b p-3">
                {$currency}/Unit
              </th>
              <th className="border-blue-gray-100 bg-blue-gray-50 overflow-wrap text-wrap break-words border-b p-3">
                Extra Cost/Unit
              </th>
            </tr>
          </thead>
          <tbody>
            {$sortedItemList.map((item, index) => {
              return (
                <tr
                  key={`${item.itemName}-${index}`}
                  className={index === 0 ? "bg-green-300" : ""}
                >
                  <td className="border-blue-gray-50 border-b object-contain p-3">
                    {item.itemName}
                  </td>
                  <td className="border-blue-gray-50 border-b p-3">
                    {getPricePerUnit(item.price, item.amount)}
                  </td>
                  <td className="border-blue-gray-50 over overflow-wrap text-wrap border-b p-3">
                    {index === 0 ? (
                      <p>The Cheapest Choice!</p>
                    ) : item.price === 0 ? (
                      <p>It's Free!</p>
                    ) : (
                      <p>
                        {getPriceDifference(cheapestItem, item)} {$currency} (
                        {getPriceDifferencePercent(cheapestItem, item)} %)
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
