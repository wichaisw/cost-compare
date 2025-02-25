import { useStore } from "@nanostores/react";
import { isBackdropOpen, isModalOpen } from "../states/modals";

export function Backdrop() {
  const $isModalOpen = useStore(isModalOpen);
  const $isBackdropOpen = useStore(isBackdropOpen);

  return (
    <>
      {$isModalOpen || $isBackdropOpen ? (
        <div
          className={`size-dvw absolute inset-0 m-0 h-full w-full bg-slate-800 ${$isBackdropOpen ? "opacity-50" : ""}`}
        ></div>
      ) : null}
    </>
  );
}
