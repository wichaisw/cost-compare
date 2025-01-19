import { useEffect, useState } from "react";
import { Item } from "./Item";

export type ItemType = {
  itemName: string;
  price: number;
  amount: number;
};

export function ItemForm() {
  const [items, setItems] = useState<ItemType[]>([]);

  useEffect(() => {
    const storageItem: ItemType[] = JSON.parse(
      localStorage.getItem("costCompareItem") ?? "[]",
    );

    console.log(storageItem);
    setItems([...storageItem]);
  }, []);

  return (
    <div className="flex flex-col gap-3 rounded bg-slate-800 p-4 text-white">
      <header className="grid grid-cols-4 gap-4">
        <span className="col-start-2">Price</span>
        <span>Amount</span>
        <span>Price/Unit</span>
      </header>

      {items.map((item: ItemType) => {
        // TODO  itemName should be unique
        return (
          <Item
            itemName={item.itemName}
            price={item.price}
            amount={item.amount}
            key={item.itemName}
          />
        );
      })}
    </div>
  );
}
