import { useEffect, useState } from "react";
import { Item } from "./Item";
import { sortedItemList } from "../states/items";
import { useStore } from "@nanostores/react";
import { currency } from "../states/configs";
import { Button } from "./Button";
import { getPricePerUnit } from "../utils/priceCalculations";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { Backdrop } from "./Backdrop";
import { AddItemModal } from "./AddItemModal";
import { SummaryCard } from "./SummaryCard";
import { ErrorMessage } from "@hookform/error-message";

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
          amount: 1,
        },
        {
          itemName: "item 2",
          price: 0,
          amount: 1,
        },
      ],
    },
    criteriaMode: "all",
  });

  const { formState, control } = formMethods;

  const { fields, append, prepend, remove, swap, move, insert, replace } =
    useFieldArray({
      control, // control props comes from useForm (optional: if you are using FormProvider)
      name: "itemList", // unique name for your Field Array
    });

  useEffect(() => {
    initFormFromStorage();
  }, []);

  function initFormFromStorage() {
    const storageItem: ItemType[] = JSON.parse(
      localStorage.getItem("costCompareItem") ?? "[]",
    );

    replace([...storageItem]);
    setIsInit(true);
  }

  function updateItemList(itemList: ItemType[]) {
    const stringifiedItem = JSON.stringify(itemList);
    localStorage.setItem("costCompareItem", stringifiedItem);
    replace(itemList);
  }

  function compareItems(currentItemList: ItemType[]) {
    if (currentItemList.length < 2) {
      // TODO properly handle error
      console.log("need at least than 2 items to compare");
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

    sortedItemList.set(result);
    updateItemList(currentItemList);
  }

  function clearLocalState(event: any) {
    fields.forEach((itemField, index) => {
      formMethods.setValue(`itemList.${index}.amount`, 1);
      formMethods.setValue(`itemList.${index}.price`, 1);
    });

    const updatedItemList = formMethods.getValues().itemList;
    localStorage.setItem("costCompareItem", JSON.stringify(updatedItemList));
  }

  return (
    <FormProvider {...formMethods}>
      <form
        className="w-full lg:w-1/2"
        onSubmit={formMethods.handleSubmit((data: { itemList: ItemType[] }) =>
          compareItems(data.itemList),
        )}
      >
        <div className="mb-6 flex w-full flex-col gap-3 rounded p-4 text-white lg:min-h-72">
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
                    <div key={itemField.id + 1324}>
                      <Item
                        itemName={itemField.itemName}
                        price={itemField.price}
                        amount={itemField.amount}
                        key={itemField.id}
                        index={index}
                        removeFormItem={remove}
                      />
                      {/* <ErrorMessage
                        errors={
                          formState.errors.itemList
                            ? formState.errors.itemList[index]?.amount
                                ?.message || { amount: "" }
                            : { amount: "" }
                        }
                        key={`${itemField.id}-error`}
                        name={`itemList.${index}.amount`}
                        render={({ messages }) =>
                          messages &&
                          Object.entries(messages).map(([type, message]) => (
                            <p key={`${itemField.id}-${type}`}>{message}</p>
                          ))
                        }
                      /> */}
                    </div>
                  );
                })
              ) : (
                <div>NO Data</div>
              )}
            </>
          )}
        </div>

        <SummaryCard />

        <section className="fixed bottom-px left-px right-px mx-2 my-2 justify-items-center">
          <div className="flex w-full flex-row justify-between gap-2 lg:mb-2 lg:w-1/2">
            <Button
              text="Clear"
              color="gray"
              type="reset"
              style="w-1/2"
              callback={clearLocalState}
            />
            <Button text="Compare" color="blue" type="submit" style="w-1/2" />
          </div>
        </section>
      </form>

      {/* <!-- modal --> */}
      <Backdrop />
      <AddItemModal addToForm={append} />
    </FormProvider>
  );
}
