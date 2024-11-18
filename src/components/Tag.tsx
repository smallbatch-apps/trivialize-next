export default function Tag({
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <span className="mr-2 text-xs border border-gray-300 rounded-full bg-gray-100 p-1 px-2 group-hover:bg-gray-300">
      {children}
    </span>
  );
}
