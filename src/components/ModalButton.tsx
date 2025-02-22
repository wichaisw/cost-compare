import { useStore } from "@nanostores/react";
import { isModalOpen } from "../states/modals";
import { Button, type IButtonProps } from "./Button";

export function ModalButton({ color, text }: IButtonProps) {
  const $isModalOpen: boolean = useStore(isModalOpen);

  return (
    <div onClick={() => isModalOpen.set(!$isModalOpen)}>
      <Button color={color} text={text} />
    </div>
  );
}
