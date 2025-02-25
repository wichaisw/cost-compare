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

export type ItemType = {
  itemName: string;
  price: number;
  amount: number;
};

export function ItemListForm() {
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
    mode: "onChange",
    criteriaMode: "all",
  });

  const { formState, control } = formMethods;

  const { fields, append, prepend, remove, swap, move, insert, replace } =
    useFieldArray({
      control,
      name: "itemList",
    });

  useEffect(() => {
    initFormFromStorage();
  }, []);

  useEffect(() => {
    console.log(formMethods.getValues().itemList);
    compareItems(formMethods.getValues().itemList);
  }, [formMethods.getValues().itemList.length]);

  function initFormFromStorage() {
    const defaultItemList: ItemType[] = [
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
    ];
    const storageItem: ItemType[] = JSON.parse(
      localStorage.getItem("costCompareItem") ??
        JSON.stringify(defaultItemList),
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
      console.error("need at least than 2 items to compare");
      return;
    }

    if (formState.errors.itemList) {
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
      formMethods.setValue(`itemList.${index}.price`, 0);
    });

    const updatedItemList = formMethods.getValues().itemList;
    localStorage.setItem("costCompareItem", JSON.stringify(updatedItemList));
  }

  if (!isInit) {
    <span>"Loading..."</span>;
  }

  return (
    <FormProvider {...formMethods}>
      <form
        className="flex h-full w-full flex-col lg:w-1/2"
        onSubmit={formMethods.handleSubmit((data: { itemList: ItemType[] }) =>
          compareItems(data.itemList),
        )}
      >
        <div className="mb-2 flex w-full flex-col gap-3 rounded p-4 text-white lg:mb-6 lg:p-0">
          {fields.length <= 0 || !isInit ? (
            <div>No Data</div>
          ) : (
            <>
              <header className="grid grid-cols-4 gap-4">
                <span className="col-start-2">Total Price</span>
                <span>Amount</span>
                <span>{$currency}/Unit</span>
              </header>
              {fields.map((itemField, index: number) => {
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
                    <div className="text-start text-sm text-red-500">
                      {formState.errors.itemList?.[index]?.amount && (
                        <span>
                          {formState.errors.itemList[index]?.amount?.message}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>

        {isInit && formMethods.getValues().itemList.length >= 2 ? (
          <>
            <section className="my-2 w-full justify-items-center px-4 lg:px-0">
              <div className="flex w-full flex-row justify-end gap-2 lg:mb-2">
                <Button
                  text="Clear"
                  color="gray"
                  type="reset"
                  style="w-1/2 lg:w-1/4"
                  callback={clearLocalState}
                />
                <Button
                  text="Compare"
                  color="blue"
                  type="submit"
                  style="w-1/2 lg:w-1/4"
                />
              </div>
            </section>
            <SummaryCard />
          </>
        ) : null}
      </form>

      {/* <!-- modal --> */}
      <Backdrop />
      <AddItemModal addToForm={append} />
    </FormProvider>
  );
}
