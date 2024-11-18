import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { clientPost } from "@/utilities/queries";
import { useForm } from "react-hook-form";
import { queryClient } from "../../app/providers";
import { Question } from "@/utilities/types";

interface Props {
  question: Question;
}

interface FormFields {
  text: string;
  points: number;
}

export default function NewAnswerForm({ question }: Props) {
  const [open, setOpen] = useState(false);
  const { handleSubmit, register, reset } = useForm<FormFields>({
    defaultValues: {
      text: "",
      points: 1,
    },
  });

  const submitFn = async (payload: FormFields) => {
    await clientPost("answers", {
      question_id: question.id,
      ...payload,
    });

    queryClient.invalidateQueries({ queryKey: ["questions", question.id] });
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
              <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
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
                <form onSubmit={handleSubmit(submitFn)} className="p-3">
                  <div className="mb-3">
                    <label
                      htmlFor="text"
                      className="inline-block font-semibold mb-2 font-oswald"
                    >
                      Text
                    </label>
                    <textarea
                      {...register("text")}
                      className="p-3 border rounded-sm w-full text-sm"
                    />
                  </div>

                  <div className="mb-3">
                    <label
                      htmlFor="text"
                      className="inline-block font-semibold mr-2 font-oswald"
                    >
                      Points
                    </label>
                    <input
                      {...register("points", { valueAsNumber: true })}
                      className="p-3 border rounded-sm w-1/5 text-sm"
                    />
                  </div>
                  <div className="text-right">
                    <button
                      onClick={() => setOpen(false)}
                      className="p-2 px-4 text-sm rounded-sm bg-white text-gray-800 mr-4"
                    >
                      <i className="fal fa-times"></i>
                    </button>
                    <button
                      type="submit"
                      className="p-3 hidden md:inline-block py-2 font-light tracking-wider bg-red-600 text-white rounded"
                    >
                      Save Answer
                    </button>
                  </div>
                </form>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
      <div className="text-right mb-3">
        <button
          className="p-2 hidden md:inline-block px-6 font-light tracking-wider bg-red-600 text-white rounded mt-4"
          onClick={() => setOpen(true)}
        >
          Create New Answer
        </button>
      </div>
    </>
  );
}
