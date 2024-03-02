type Props = React.ComponentProps<"label"> & { name: string };

export default function Label({ children, name, ...props }: Props) {
  return (
    <label htmlFor={name} {...props} className="font-light text-gray-600">
      {children}
    </label>
  );
}
