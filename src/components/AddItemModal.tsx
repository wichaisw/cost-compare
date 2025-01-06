import { useStore } from "@nanostores/react";
import { isModalOpen } from "../states/modal";

export function AddItemModal() {
  const $isModalOpen = useStore(isModalOpen);

  return (
    <section>
      {$isModalOpen ? (
        <main>
          <section className="text-lg text-black">AddItemModal</section>
        </main>
      ) : null}
    </section>
  );
}
