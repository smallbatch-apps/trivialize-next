"use client";

import { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import { Dialog, Transition } from "@headlessui/react";
import { queryClient } from "../../app/providers";
import { clientPost } from "@/utilities/queries";
import Icon from "@/components/layout/Icon";
import type { Series, Event } from "@/utilities/types";
import ButtonSmall from "@/components/forms/ButtonSmall";
import Button from "@/components/forms/Button";

type Props = {
  series: Series;
};

type FormFields = Partial<Event>;

export default function NewSeriesForm({ series }: Props) {
  const [open, setOpen] = useState(false);

  const { register, handleSubmit, reset } = useForm<FormFields>({
    defaultValues: {
      series_id: series.id,
      description: "",
      location: "",
      location_link: "",
    },
  });

  const submitFn = async (payload: FormFields) => {
    await clientPost("events", payload);
    queryClient.invalidateQueries({ queryKey: ["series"] });
    reset();
    setOpen(false);
  };

  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          auto-reopen="true"
          className="fixed z-10 inset-0 overflow-y-auto"
          onClose={setOpen}
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                  <button
                    type="button"
                    className="bg-white rounded-md text-gray-400 hover:text-gray-500"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close</span>
                    <i className="fal fa-times"></i>
                  </button>
                </div>
                <form
                  onSubmit={handleSubmit(submitFn)}
                  className="flex flex-col gap-6"
                >
                  <div>
                    <label
                      htmlFor="description"
                      className="inline-block font-semibold mb-2 font-oswald"
                    >
                      Description
                    </label>
                    <input
                      {...register("description")}
                      className="p-3 border rounded-sm w-full text-sm"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="location"
                      className="inline-block mb-2 font-semibold mb-2 font-oswald"
                    >
                      Location
                    </label>
                    <input
                      {...register("location")}
                      className="p-3 border rounded-sm w-full text-sm"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="location_link"
                      className="inline-block mb-2 font-semibold mb-2 font-oswald"
                    >
                      Location Link
                    </label>
                    <input
                      {...register("location_link")}
                      className="p-3 border rounded-sm w-full text-sm"
                    />
                  </div>

                  <div className="flex justify-end gap-6 items-center">
                    <span
                      onClick={(e) => {
                        e.preventDefault();
                        setOpen(false);
                      }}
                    >
                      <Icon type="fas" icon="times" />
                    </span>

                    <Button type="submit">
                      <Icon type="fas" icon="calendar" />
                      Create Event
                    </Button>
                  </div>
                </form>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <ButtonSmall onClick={() => setOpen(true)}>
        <Icon type="fas" icon="plus" />
        Create New Event
      </ButtonSmall>
    </>
  );
}
