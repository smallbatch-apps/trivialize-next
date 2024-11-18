"use client";

import { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { Dialog, Transition } from "@headlessui/react";
import { queryClient } from "../../app/providers";
import { clientPost, tagsQuery } from "@/utilities/queries";
import Icon from "@/components/layout/Icon";
import type { Event, Round } from "@/utilities/types";
import ButtonSmall from "@/components/forms/ButtonSmall";
import Button from "@/components/forms/Button";

type Props = {
  event: Event;
};

type FormFields = Partial<Round>;

export default function NewRoundForm({ event }: Props) {
  const [open, setOpen] = useState(false);
  const rounds = event.rounds ?? [];

  const { data: tags = [] } = useQuery({
    queryKey: ["tags"],
    queryFn: tagsQuery,
  });

  const { register, handleSubmit, reset } = useForm<FormFields>({
    defaultValues: {
      event_id: event.id,
      text: "",
      sort: rounds.length + 1,
      question_count: 10,
      tag_id: "",
    },
  });

  const submitFn = async (payload: FormFields) => {
    await clientPost("rounds", payload);

    setTimeout(
      () => queryClient.invalidateQueries({ queryKey: ["events", event.id] }),
      500
    );
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
                      htmlFor="text"
                      className="inline-block font-semibold mb-2 font-oswald"
                    >
                      Text
                    </label>
                    <input
                      {...register("text")}
                      className="p-3 border rounded-sm w-full text-sm"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="sort"
                      className="inline-block mb-2 font-semibold mb-2 font-oswald w-32"
                    >
                      Sort
                    </label>
                    <input
                      {...register("sort")}
                      className="p-3 border rounded-sm w-32 text-sm"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="sort"
                      className="inline-block mb-2 font-semibold mb-2 font-oswald w-32"
                    >
                      Qs per round
                    </label>
                    <input
                      {...register("question_count")}
                      className="p-3 border rounded-sm w-32 text-sm"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="text"
                      className="inline-block font-semibold mb-2 font-oswald w-32"
                    >
                      Primary Tag
                    </label>
                    <select
                      {...register("tag_id")}
                      className="p-3 border rounded-sm w-32 text-sm pr-2"
                    >
                      {tags.map((tag) => (
                        <option value={tag.id}>{tag.text}</option>
                      ))}
                    </select>
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
                      <Icon type="fas" icon="plus" />
                      Create Round
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
        Add Round
      </ButtonSmall>
    </>
  );
}
