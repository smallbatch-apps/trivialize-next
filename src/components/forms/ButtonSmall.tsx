export default function ButtonSmall({
  children,
  type = "button",
  ...props
}: React.ComponentProps<"button">) {
  return (
    <button
      type={type}
      {...props}
      className="tracking-wider bg-red-600 text-white rounded-sm px-3 text-sm py-1 hover:bg-red-700 flex items-center gap-2"
    >
      {children}
    </button>
  );
}
