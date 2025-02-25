import { useState } from "react";
import { Button } from "./Button";
import { currency } from "../states/configs";
import { isBackdropOpen } from "../states/modals";

export function Dropdown() {
  const CURRENCIES = ["THB", "USD", "JPY", "EUR", "CNY", "GBP"];
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  function toggleDropdown() {
    isBackdropOpen.set(true);
    setIsDropdownOpen(true);
  }

  function chooseCurrency(option: string) {
    isBackdropOpen.set(false);
    currency.set(option);
    setIsDropdownOpen(false);
  }

  return (
    <div className="mb-1 flex flex-col items-end">
      <div onClick={toggleDropdown}>
        <Button color="green" text="Currency" style="mb-1 cursor-pointer" />
      </div>

      {isDropdownOpen && (
        <div
          id="dropdown"
          className="absolute z-10 mt-8 w-44 divide-y divide-gray-100 rounded-lg bg-white shadow-sm lg:mt-11 dark:bg-gray-700"
          onMouseLeave={() => {
            setIsDropdownOpen(false);
            isBackdropOpen.set(false);
          }}
        >
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownDefaultButton"
          >
            {CURRENCIES.map((option) => {
              return (
                <li onClick={() => chooseCurrency(option)}>
                  <span className="block cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                    {option}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
