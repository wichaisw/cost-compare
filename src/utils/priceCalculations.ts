import type { ItemType } from "../components/Item";

const PRECISION = 4;
const MULTIPLIER = Math.pow(10, PRECISION);

function safeParseFloat(value: string | number): number {
  const num = typeof value === "string" ? parseFloat(value) : value;
  return isNaN(num) ? 0 : num;
}

function roundToFixed(num: number): number {
  return Math.round(num * MULTIPLIER) / MULTIPLIER;
}

export function getPricePerUnit(price: number, amount: number): number {
  // Handle invalid inputs
  price = safeParseFloat(price);
  amount = safeParseFloat(amount);

  if (amount <= 0 || price < 0) {
    return 0;
  }

  return roundToFixed(price / amount);
}

export function getPriceDifference(
  firstItem: ItemType,
  secondItem: ItemType,
): number {
  const firstPrice = getPricePerUnit(firstItem.price, firstItem.amount);
  const secondPrice = getPricePerUnit(secondItem.price, secondItem.amount);

  if (firstPrice === 0 && secondPrice === 0) {
    return 0;
  }

  return roundToFixed(secondPrice - firstPrice);
}

export function getPriceDifferencePercent(
  firstItem: ItemType,
  secondItem: ItemType,
): number {
  const firstPrice = getPricePerUnit(firstItem.price, firstItem.amount);
  const secondPrice = getPricePerUnit(secondItem.price, secondItem.amount);

  if (firstPrice === 0 && secondPrice === 0) {
    return 0;
  }
  if (secondPrice === 0) {
    return 0; // Avoid division by zero
  }

  const difference = getPriceDifference(firstItem, secondItem);
  return roundToFixed((difference / secondPrice) * 100);
}

export function getSavedCostPerUnit(
  firstItem: ItemType,
  secondItem: ItemType,
): number {
  const difference = getPriceDifference(firstItem, secondItem);

  if (difference <= 0 || firstItem.amount <= 0) {
    return 0;
  }

  return roundToFixed(difference);
}
export function getTotalSavedCost(
  firstItem: ItemType,
  secondItem: ItemType,
): number {
  const difference = getPriceDifference(firstItem, secondItem);

  if (difference <= 0 || firstItem.amount <= 0) {
    return 0;
  }

  return roundToFixed(difference * firstItem.amount);
}
export function validateItemData(item: ItemType): boolean {
  return (
    item &&
    typeof item.price === "number" &&
    !isNaN(item.price) &&
    item.price >= 0 &&
    typeof item.amount === "number" &&
    !isNaN(item.amount) &&
    item.amount > 0 &&
    typeof item.itemName === "string" &&
    item.itemName.trim().length > 0
  );
}
