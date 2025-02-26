export type IButtonProps = {
  color: string;
  text: string;
  style?: string;
  callback?: any;
  type?: "button" | "submit" | "reset";
  variant?: "circle" | "default";
};

export function Button({
  color,
  text,
  style,
  callback,
  type = "button",
  variant = "default",
}: IButtonProps) {
  const colorVariants: Record<string, string> = {
    blue: "bg-blue-400 hover:bg-blue-500",
    red: "bg-rose-500 hover:bg-rose-700",
    orange: "bg-orange-500 hover:bg-orange-700",
    amber: "bg-amber-500 hover:bg-orange-700",
    gray: "bg-slate-500 hover:bg-slate-700",
    green: "bg-green-400 hover:bg-green-600",
  };

  const variantClasses = {
    default: "rounded px-2 py-1 md:px-3 md:py-2",
    circle:
      "rounded-full w-6 h-6 lg:w-8 lg:h-8 flex items-center justify-center self-center",
  };

  return (
    <button
      className={`cursor-pointer font-bold text-white ${colorVariants[color]} ${variantClasses[variant]} ${style}`}
      onClick={callback}
      type={type}
    >
      {text}
    </button>
  );
}
