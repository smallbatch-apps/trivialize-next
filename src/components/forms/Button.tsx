export default function Button({
  children,
  type = "button",
  ...props
}: React.ComponentProps<"button">) {
  return (
    <button
      type={type}
      {...props}
      className="p-6 py-3 text-lg font-light tracking-wider bg-red-600 text-white rounded flex items-center gap-3"
    >
      {children}
    </button>
  );
}
