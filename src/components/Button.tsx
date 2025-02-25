export type IButtonProps = {
  color: string;
  text: string;
  style?: string;
  callback?: any;
  type?: "button" | "submit" | "reset";
};

export function Button({
  color,
  text,
  style,
  callback,
  type = "button",
}: IButtonProps) {
  const colorVariants: Record<string, string> = {
    blue: "bg-blue-400 hover:bg-blue-500",
    red: "bg-rose-500 hover:bg-rose-700",
    orange: "bg-orange-500 hover:bg-orange-700",
    amber: "bg-amber-500 hover:bg-orange-700",
    gray: "bg-slate-500 hover:bg-slate-700",
    green: "bg-green-400 hover:bg-green-600",
  };

  return (
    <button
      className={`cursor-pointer rounded px-2 py-1 font-bold text-white md:px-3 md:py-2 ${colorVariants[color]} ${style}`}
      onClick={callback}
      type={type}
    >
      {text}
    </button>
  );
}
