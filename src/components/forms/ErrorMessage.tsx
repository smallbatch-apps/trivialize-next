import type { FormState } from "react-hook-form";

interface Props {
  name: string;
  formState: FormState<any>;
}

export default function ErrorMessage({ name, formState }: Props) {
  if (!formState.errors[name]) return null;
  return (
    <div className="bg-red-50 text-red-400 rounded-b p-1 px-2 m-2 mt-0">
      {formState.errors[name]?.message?.toString()}
    </div>
  );
}
