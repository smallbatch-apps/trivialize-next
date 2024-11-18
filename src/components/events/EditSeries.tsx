import { useForm } from "react-hook-form";
import type { Series } from "@/utilities/types";
import { useState } from "react";
import Icon from "@/components/layout/Icon";
import ButtonSmall from "@/components/forms/ButtonSmall";
type Props = {
  series: Series;
};

export default function EditSeries({ series }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const { handleSubmit, register } = useForm<Partial<Series>>({
    defaultValues: { name: series.name, description: series.description },
  });
  return (
    <div>
      {!isEditing && (
        <div>
          <h3 className="text-lg flex justify-between">
            {series.name}
            <span
              className="text-grey-600 hover:text-grey-800 hover:cursor-pointer"
              onClick={() => setIsEditing(!isEditing)}
            >
              <Icon type="fas" icon="edit" />
            </span>
          </h3>
          <p>{series.description}</p>
        </div>
      )}
      {isEditing && (
        <form
          className="flex flex-col gap-2"
          onSubmit={handleSubmit((data) => {
            console.log(data);
          })}
        >
          <div className="flex">
            <div className="w-32 font-bold">Name</div>
            <input
              className="border py-1 px-3 flex-grow"
              type="text"
              {...register("name")}
            />
          </div>
          <div className="flex">
            <div className="w-32 font-bold">Description</div>
            <textarea
              className="border py-1 px-3 flex-grow h-24"
              {...register("description")}
            />
          </div>
          <div className="flex justify-end items-center gap-5">
            <Icon
              type="fas"
              icon="times"
              className="cursor-pointer"
              onClick={() => setIsEditing(false)}
            />
            <ButtonSmall type="submit">Save</ButtonSmall>
          </div>
        </form>
      )}
    </div>
  );
}
