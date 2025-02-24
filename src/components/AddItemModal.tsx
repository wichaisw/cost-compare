import { useStore } from "@nanostores/react";
import { isModalOpen } from "../states/modals";
import { Button } from "./Button";
import { useState } from "react";
import { type UseFieldArrayAppend } from "react-hook-form";

type AddItemModalProps = {
  addToForm: UseFieldArrayAppend<
    { itemList: { itemName: string; price: number; amount: number }[] },
    "itemList"
  >;
};

export function AddItemModal({ addToForm }: AddItemModalProps) {
  const $isModalOpen = useStore(isModalOpen);

  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState(0);
  const [amount, setAmount] = useState(0);

  function addItem(itemName: string, price: number, amount: number) {
    const existingItems = JSON.parse(
      localStorage.getItem("costCompareItem") ?? "[]",
    );
    const newItem = {
      itemName,
      price,
      amount,
    };
    addToForm(newItem);

    const stringifiedItem = JSON.stringify([...existingItems, newItem]);
    localStorage.setItem("costCompareItem", stringifiedItem);

    setItemName("");
    setPrice(0);
    setAmount(0);
    isModalOpen.set(false);
  }

  return (
    <>
      {$isModalOpen ? (
        <div className="absolute flex h-3/4 grow items-center lg:min-w-32">
          <section className="grid grid-cols-3 gap-4 self-center rounded bg-slate-800 p-4 text-white">
            <div
              className="col-start-3 rounded bg-slate-400 text-center"
              onClick={() => isModalOpen.set(false)}
            >
              X
            </div>
            <label htmlFor="added-item-name">Item</label>
            <input
              id="added-item-name"
              type="text"
              className="col-span-2 rounded-sm px-1 text-black"
              defaultValue={""}
              onChange={(e) => setItemName(e.target.value)}
            />
            <label htmlFor="added-item-price">Price</label>
            <input
              id="added-item-price"
              type="text"
              className="col-span-2 rounded-sm px-1 text-black"
              defaultValue={0}
              onChange={(e) => setPrice(parseFloat(e.target.value))}
            />
            <label htmlFor="added-item-amount">Amount</label>
            <input
              id="added-item-amount"
              type="text"
              className="col-span-2 rounded-sm px-1 text-black"
              defaultValue={0}
              onChange={(e) => setAmount(parseFloat(e.target.value))}
            />
            <Button
              color="blue"
              text="Add Item"
              style="col-span-3"
              callback={() => addItem(itemName, price, amount)}
            />
          </section>
        </div>
      ) : null}
    </>
  );
}
