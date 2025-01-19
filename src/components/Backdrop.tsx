import { useStore } from "@nanostores/react";
import { isModalOpen } from "../states/modal";

export function Backdrop() {
  const $isModalOpen = useStore(isModalOpen);

  return (
    <>
      {$isModalOpen ? (
        <div className="absolute h-full w-full bg-slate-800"></div>
      ) : null}
    </>
  );
}
