import { useFormContext } from "react-hook-form";

import Label from "./Label";
import Input from "./Input";
import ErrorMessage from "./ErrorMessage";

type Props = {
  name: string;
  label: string;
  type?: "text" | "email" | "password";
  placeholder?: string;
};

export default function FormGroup({
  name,
  type = "text",
  label,
  placeholder,
}: Props) {
  const { register, formState } = useFormContext();
  return (
    <div>
      <Label name={name}>{label}</Label>
      <Input type={type} name={name} placeholder={placeholder} />
      <ErrorMessage name={name} formState={formState} />
    </div>
  );
}
