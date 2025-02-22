import { useEffect, useState } from "react";
import { Item } from "./Item";
import { itemList } from "../states/items";
import { useStore } from "@nanostores/react";

export type ItemType = {
  itemName: string;
  price: number;
  amount: number;
};

export function ItemForm() {
  const $itemList = useStore(itemList);

  useEffect(() => {
    const storageItem: ItemType[] = JSON.parse(
      localStorage.getItem("costCompareItem") ?? "[]",
    );

    console.log(storageItem);
    itemList.set([...storageItem]);
  }, []);

  return (
    <div className="flex flex-col gap-3 rounded bg-slate-800 p-4 text-white">
      <header className="grid grid-cols-4 gap-4">
        <span className="col-start-2">Price</span>
        <span>Amount</span>
        <span>Price/Unit</span>
      </header>

      {$itemList.map((item: ItemType, index: number) => {
        return (
          <Item
            itemName={item.itemName}
            price={item.price}
            amount={item.amount}
            key={`${item.itemName}-${index}}`}
          />
        );
      })}
    </div>
  );
}
