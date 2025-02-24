import { useStore } from "@nanostores/react";
import { isModalOpen } from "../states/modals";

export function Backdrop() {
  const $isModalOpen = useStore(isModalOpen);

  return (
    <>
      {$isModalOpen ? (
        <div className="size-dvw absolute inset-0 m-0 h-full w-full bg-slate-800"></div>
      ) : null}
    </>
  );
}
