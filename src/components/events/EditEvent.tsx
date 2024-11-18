import type { Event, Round } from "@/utilities/types";
import { useState } from "react";
import Icon from "../layout/Icon";
import { useForm } from "react-hook-form";
import { clientPatch } from "@/utilities/queries";
import { queryClient } from "../../app/providers";
import ButtonSmall from "@/components/forms/ButtonSmall";

type Props = {
  event: Event;
};

const statuses = ["", "Draft", "Published", "Completed"];

type FormFields = Partial<Event>;

export default function EditEvent({ event }: Props) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { handleSubmit, register } = useForm<FormFields>({
    defaultValues: {
      id: event.id,
      description: event.description,
      location: event.location,
      location_link: event.location_link,
    },
  });

  const submitFn = async (payload: FormFields) => {
    const { id, ...remaining } = payload;
    await clientPatch(`events/${id}`, remaining);
    queryClient.invalidateQueries({ queryKey: ["events", id] });
  };
  return (
    <>
      <h4 className="flex justify-between font-oswald text-blue-400 text-xl">
        Event Details
        {!isEditing && (
          <Icon
            type="fas"
            icon="edit"
            className="cursor-pointer"
            onClick={() => setIsEditing(!isEditing)}
          />
        )}
      </h4>
      {!isEditing && (
        <div className="flex flex-col gap-3">
          <div className="flex gap-3">
            <div>Description:</div>
            <div>{event.description}</div>
          </div>
          <div className="flex gap-3">
            <div>Location:</div>
            <div>
              <a href={event.location_link} className="text-blue-500 underline">
                {event.location ? event.location : "-"}
              </a>
            </div>
          </div>
          <div className="flex gap-3">
            <div>Status:</div>
            <div>{statuses[event.status]}</div>
          </div>
        </div>
      )}
      {isEditing && (
        <form onSubmit={handleSubmit(submitFn)} className="flex flex-col gap-2">
          <div className="flex">
            <div className="w-32 font-bold">Description</div>
            <input
              className="border py-1 px-3 flex-grow"
              type="text"
              {...register("description")}
            />
          </div>
          <div className="flex">
            <div className="w-32 font-bold">Location</div>
            <textarea
              className="border py-1 px-3 flex-grow h-24"
              {...register("location")}
            />
          </div>
          <div className="flex">
            <div className="w-32 font-bold">Location Link</div>
            <textarea
              className="border py-1 px-3 flex-grow h-24"
              {...register("location_link")}
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
    </>
  );
}
