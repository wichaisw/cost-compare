import { useFormContext, type UseFieldArrayRemove } from "react-hook-form";
import { getPricePerUnit } from "../utils/priceCalculations";
import { Button } from "./Button";

export type ItemType = {
  itemName: string;
  price: number;
  amount: number;
};

export type ItemProp = ItemType & {
  index: number;
  removeFormItem: UseFieldArrayRemove;
};

export function Item({
  itemName,
  price = 0,
  amount = 0,
  index,
  removeFormItem,
}: ItemProp) {
  const { register } = useFormContext();

  function removeItem(index: number) {
    removeFormItem(index);
    const storageItem: ItemType[] = JSON.parse(
      localStorage.getItem("costCompareItem") ?? "[]",
    );

    storageItem.splice(index, 1);
    localStorage.setItem("costCompareItem", JSON.stringify(storageItem));
  }

  return (
    <div className="grid grid-cols-4 gap-4">
      {/* <label htmlFor="item-price">{itemName}</label> */}
      <input
        type="text"
        id="item-name"
        className="rounded-sm px-1 text-black"
        defaultValue={itemName || ""}
        {...register(`itemList.${index}.itemName`, {
          required: "Name is required",
        })}
      />
      <input
        type="text"
        id="item-price"
        className="rounded-sm px-1 text-black"
        defaultValue={0}
        {...register(`itemList.${index}.price`, {
          required: "Price is required",
          valueAsNumber: true,
          validate: {
            positive: (value) => value >= 0 || "Price cannot be negative",
            number: (value) => !isNaN(value) || "Price must be a number",
          },
        })}
      />
      <input
        type="text"
        id="item-amount"
        className="rounded-sm px-1 text-black"
        defaultValue={1}
        {...register(`itemList.${index}.amount`, {
          required: "Amount is required",
          valueAsNumber: true,
          validate: {
            positive: (value) => value > 0 || "Amount must be greater than 0",
            number: (value) => !isNaN(value) || "Amount must be a number",
          },
        })}
      />
      <div className="flex justify-between">
        <span> {amount > 0 ? getPricePerUnit(price, amount) : 0}</span>
        <Button
          text="X"
          color="red"
          style={"text-xs   rounded-full "}
          callback={() => removeItem(index)}
        />
      </div>
    </div>
  );
}
