type Props = React.ComponentPropsWithoutRef<"button"> & {
  children: React.ReactNode;
};

export default function Button({ children, ...remaining }: Readonly<Props>) {
  return (
    <button
      {...remaining}
      className="tracking-wider bg-red-600 text-white rounded-sm px-3 py-1 hover:bg-red-700 flex items-center gap-2"
    >
      {children}
    </button>
  );
}
