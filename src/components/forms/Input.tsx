import { useFormContext } from "react-hook-form";

export default function Input({
  name,
  ...props
}: React.ComponentProps<"input"> & { name: string }) {
  const { register } = useFormContext();
  return (
    <input
      {...register(name)}
      {...props}
      className="w-full font-light mt-2 border-0 bg-gray-100 text-gray-600 p-2 px-3 rounded"
    />
  );
}
