type IButtonProps = {
  color: string;
  text: string;
  size?: number;
};

export function Button({ color, text, size }: IButtonProps) {
  const colorVariants: Record<string, string> = {
    blue: "bg-blue-500 hover:bg-blue-700",
    red: "bg-red-500 hover:bg-red-700",
    orange: "bg-orange-500 hover:bg-orange-700",
    gray: "bg-slate-500 hover:bg-slate-700",
  };

  return (
    <button
      className={`rounded px-4 py-2 font-bold text-white ${colorVariants[color]}`}
    >
      {text}
    </button>
  );
}
