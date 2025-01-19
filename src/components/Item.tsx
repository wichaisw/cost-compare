import type { ItemType } from "./ItemForm";

type ItemProps = ItemType;

export function Item({ itemName, price = 0, amount = 0 }: ItemProps) {
  return (
    <div className="grid grid-cols-4 gap-4">
      <label htmlFor="item-price">{itemName}</label>
      <input
        type="text"
        id="item-price"
        className="rounded-sm px-1 text-black"
        defaultValue={price}
        onChange={(event) => event.target.value}
      />
      <input
        type="text"
        className="rounded-sm px-1 text-black"
        defaultValue={amount}
        onChange={(event) => event.target.value}
      />
      <span>{price / amount}</span>
    </div>
  );
}
