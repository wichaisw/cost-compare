import type { ItemType } from "../components/Item";

export function getPricePerUnit(price: number, amount: number) {
  if (amount === 0) {
    throw new Error("Amount cannot be zero");
  }

  return Math.round((price / amount) * 10000) / 10000;
}

export function getPriceDifference(firstItem: ItemType, secondItem: ItemType) {
  const difference =
    getPricePerUnit(secondItem.price, secondItem.amount) * 10000 -
    getPricePerUnit(firstItem.price, firstItem.amount) * 10000;
  return difference / 10000;
}

export function getPriceDifferencePercent(
  firstItem: ItemType,
  secondItem: ItemType,
) {
  const difference = getPriceDifference(firstItem, secondItem);
  return (
    Math.round(
      (difference / getPricePerUnit(secondItem.price, secondItem.amount)) *
        10000,
    ) / 100
  );
}

export function getSavedCost(firstItem: ItemType, secondItem: ItemType) {
  const difference = getPriceDifference(firstItem, secondItem);
  return Math.round(difference * firstItem.amount * 10000) / 10000;
}
