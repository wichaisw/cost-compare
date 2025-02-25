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

type ErrorState = {
  itemName?: string;
  price?: string;
  amount?: string;
};

export function AddItemModal({ addToForm }: AddItemModalProps) {
  const $isModalOpen = useStore(isModalOpen);

  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState<string>("0");
  const [amount, setAmount] = useState<string>("1");
  const [errors, setErrors] = useState<ErrorState>({});

  function validateInputs(): boolean {
    const newErrors: ErrorState = {};

    // Validate item name
    if (!itemName.trim()) {
      newErrors.itemName = "Item name is required";
    }

    // Validate price
    const priceNum = parseFloat(price);
    if (isNaN(priceNum)) {
      newErrors.price = "Price must be a number";
    } else if (priceNum < 0) {
      newErrors.price = "Price cannot be negative";
    }

    // Validate amount
    const amountNum = parseFloat(amount);
    if (isNaN(amountNum)) {
      newErrors.amount = "Amount must be a number";
    } else if (amountNum <= 0) {
      newErrors.amount = "Amount must be greater than 0";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function addItem() {
    if (!validateInputs()) {
      return;
    }

    const existingItems = JSON.parse(
      localStorage.getItem("costCompareItem") ?? "[]",
    );
    const newItem = {
      itemName,
      price: parseFloat(price),
      amount: parseFloat(amount),
    };
    addToForm(newItem);

    const stringifiedItem = JSON.stringify([...existingItems, newItem]);
    localStorage.setItem("costCompareItem", stringifiedItem);

    resetForm();
    isModalOpen.set(false);
  }

  function resetForm() {
    setItemName("");
    setPrice("0");
    setAmount("1");
    setErrors({});
  }

  function handleCloseModal() {
    isModalOpen.set(false);
    resetForm();
  }

  return (
    <>
      {$isModalOpen ? (
        <div className="absolute flex h-3/4 w-5/6 grow items-center lg:w-2/6">
          <section className="grid w-full grid-cols-3 gap-4 self-center rounded bg-slate-800 p-4 text-white">
            <Button
              style="col-span-1 col-start-3 w-8 rounded bg-slate-400 text-center justify-self-end text-sm rounded-xl lg:w-10"
              color="gray"
              callback={handleCloseModal}
              text="X"
            />

            <label htmlFor="added-item-name">Item</label>
            <div className="col-span-2">
              <input
                id="added-item-name"
                type="text"
                className="w-full rounded-sm px-1 text-black"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
              />
              {errors.itemName && (
                <span className="text-sm text-red-500">{errors.itemName}</span>
              )}
            </div>

            <label htmlFor="added-item-price">Price</label>
            <div className="col-span-2">
              <input
                id="added-item-price"
                type="text"
                className="w-full rounded-sm px-1 text-black"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              {errors.price && (
                <span className="text-sm text-red-500">{errors.price}</span>
              )}
            </div>

            <label htmlFor="added-item-amount">Amount</label>
            <div className="col-span-2">
              <input
                id="added-item-amount"
                type="text"
                className="w-full rounded-sm px-1 text-black"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              {errors.amount && (
                <span className="text-sm text-red-500">{errors.amount}</span>
              )}
            </div>

            <Button
              color="blue"
              text="Add Item"
              style="col-span-3"
              callback={addItem}
            />
          </section>
        </div>
      ) : null}
    </>
  );
}
