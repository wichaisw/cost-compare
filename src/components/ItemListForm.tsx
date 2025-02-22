import { useEffect, useState } from "react";
import { Item } from "./Item";
import { itemList, sortedItemList } from "../states/items";
import { useStore } from "@nanostores/react";
import { currency } from "../states/configs";
import { Button } from "./Button";
import { getPricePerUnit } from "../utils/priceCalculations";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { Backdrop } from "./Backdrop";
import { AddItemModal } from "./AddItemModal";

export type ItemType = {
  itemName: string;
  price: number;
  amount: number;
};

export function ItemListForm() {
  // const $itemList = useStore(itemList);
  const [isInit, setIsInit] = useState(false);

  const $currency: string = useStore(currency);
  const formMethods = useForm({
    defaultValues: {
      itemList: [
        {
          itemName: "item 1",
          price: 0,
          amount: 0,
        },
      ],
    },
  });

  const { fields, append, prepend, remove, swap, move, insert, replace } =
    useFieldArray({
      control: formMethods.control, // control props comes from useForm (optional: if you are using FormProvider)
      name: "itemList", // unique name for your Field Array
    });

  useEffect(() => {
    initFormFromStorage();
  }, []);

  function initFormFromStorage() {
    const storageItem: ItemType[] = JSON.parse(
      localStorage.getItem("costCompareItem") ?? "[]",
    );

    console.log(storageItem);
    // itemList.set([...storageItem]);
    replace([...storageItem]);
    setIsInit(true);
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
  }

  return (
    <FormProvider {...formMethods}>
      <form
        className="w-full"
        onSubmit={formMethods.handleSubmit(() => compareItems(fields))}
      >
        <div className="flex min-h-72 w-full flex-col gap-3 rounded bg-slate-800 p-4 text-white">
          {!isInit ? (
            <span>"Loading..."</span>
          ) : (
            <>
              <header className="grid grid-cols-4 gap-4">
                <span className="col-start-2">Total Price</span>
                <span>Amount</span>
                <span>{$currency}/Unit</span>
              </header>

              {fields.length > 0 ? (
                fields.map((itemField, index: number) => {
                  return (
                    <Item
                      itemName={itemField.itemName}
                      price={itemField.price}
                      amount={itemField.amount}
                      key={itemField.id}
                      index={index}
                      removeFormItem={remove}
                    />
                  );
                })
              ) : (
                <div>NO Data</div>
              )}
            </>
          )}
        </div>

        <section className="my-2 flex w-full flex-row justify-between">
          <Button text="Clear" color="gray" type="reset" />
          <Button
            text="Compare"
            color="blue"
            type="submit"
            // callback={() => updateFormAndCompare($itemList)}
          />
        </section>
      </form>

      {/* <!-- modal --> */}
      <Backdrop />
      <AddItemModal addToForm={append} />
    </FormProvider>
  );
}
