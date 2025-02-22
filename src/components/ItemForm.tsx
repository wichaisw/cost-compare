import { useEffect, useState } from "react";
import { Item } from "./Item";
import { itemList, sortedItemList } from "../states/items";
import { useStore } from "@nanostores/react";
import { currency } from "../states/configs";
import { Button } from "./Button";
import { getPricePerUnit } from "../utils/priceCalculations";

export type ItemType = {
  itemName: string;
  price: number;
  amount: number;
};

export function ItemForm() {
  const $itemList = useStore(itemList);
  const $currency: string = useStore(currency);

  useEffect(() => {
    initFormFromStorage();
  }, []);

  function initFormFromStorage() {
    const storageItem: ItemType[] = JSON.parse(
      localStorage.getItem("costCompareItem") ?? "[]",
    );

    console.log(storageItem);
    itemList.set([...storageItem]);
  }

  // TODO make a proper dynamic form

  return (
    <>
      <div className="flex flex-col gap-3 rounded bg-slate-800 p-4 text-white">
        <header className="grid grid-cols-4 gap-4">
          <span className="col-start-2">Total Price</span>
          <span>Amount</span>
          <span>{$currency}/Unit</span>
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

      <section className="my-2 flex w-full flex-row justify-between">
        <ClearButton />
        <CompareButton />
      </section>
    </>
  );
}

function CompareButton() {
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

function ClearButton() {
  useStore(itemList);
  useStore(sortedItemList);

  function clearItemList() {
    itemList.set([]);
    sortedItemList.set([]);
    localStorage.setItem("costCompareItem", "[]");
  }

  return <Button text="Clear" color="gray" callback={clearItemList} />;
}
