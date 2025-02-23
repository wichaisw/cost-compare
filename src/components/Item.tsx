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
      <label htmlFor="item-price">{itemName}</label>
      {/* TODO add error for type NaN */}
      <input
        type="text"
        id="item-price"
        className="rounded-sm px-1 text-black"
        defaultValue={0}
        {...register(`itemList.${index}.price`, {
          required: true,
          valueAsNumber: true,
        })}
      />
      <input
        type="text"
        id="item-amount"
        className="rounded-sm px-1 text-black"
        defaultValue={0}
        {...register(`itemList.${index}.amount`, {
          required: true,
          valueAsNumber: true,
        })}
      />
      <div className="flex justify-between">
        <span> {amount > 0 ? getPricePerUnit(price, amount) : 0}</span>
        <Button
          text="X"
          color="red"
          style={"w-fit rounded-xl"}
          callback={() => removeItem(index)}
        />
      </div>
    </div>
  );
}
