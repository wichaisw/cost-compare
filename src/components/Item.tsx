import { useFormContext } from "react-hook-form";
import { getPricePerUnit } from "../utils/priceCalculations";

export type ItemType = {
  itemName: string;
  price: number;
  amount: number;
};

export type ItemProp = ItemType & { index: number };

export function Item({ itemName, price = 0, amount = 0, index }: ItemProp) {
  const { register, control } = useFormContext();
  return (
    <div className="grid grid-cols-4 gap-4">
      <label htmlFor="item-price">{itemName}</label>
      {/* TODO add error for type NaN */}
      <input
        type="text"
        id="item-price"
        className="rounded-sm px-1 text-black"
        {...register(`itemList.${index}.price`, {
          required: true,
          valueAsNumber: true,
        })}
      />
      <input
        type="text"
        id="item-amount"
        className="rounded-sm px-1 text-black"
        {...register(`itemList.${index}.amount`, {
          required: true,
          valueAsNumber: true,
        })}
      />
      <span> {amount > 0 ? getPricePerUnit(price, amount) : 0}</span>
    </div>
  );
}
