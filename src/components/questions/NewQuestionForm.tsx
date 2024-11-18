import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Select, { MultiValue } from "react-select";

import { useForm } from "react-hook-form";
import { QuestionTypes } from "@/utilities/enums";
import { queryClient } from "../../app//providers";
import { Tag } from "@/utilities/types";
import { clientPost } from "@/utilities/queries";
// import { questionService } from "@/services";

interface Props {
  tags: Tag[];
}

interface FormFields {
  text: string;
  type: QuestionTypes;
  tags: MultiValue<Tag>;
}

export default function NewQuestionForm({ tags }: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const { register, handleSubmit, setValue } = useForm<FormFields>({
    defaultValues: {
      text: "",
      type: QuestionTypes.Simple,
      tags: [],
    },
  });

  register("tags");

  const submitFn = async (payload: FormFields) => {
    const { tags: setTags, ...remaining } = payload;
    const newQuestion = await clientPost("questions", remaining);
    const { question } = await newQuestion.json();

    const questionId = question.id;

    await clientPost("question_tags", {
      question_id: questionId,
      tag_ids: setTags.map((t) => t.id),
    });

    queryClient.invalidateQueries({ queryKey: ["questions"] });
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
                  className="flex flex-col gap-3"
                >
                  <div className="text-gray-500 text-center">
                    Don&apos;t worry, you will add answers later.
                  </div>
                  <div>
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

                  <div>
                    <label
                      htmlFor="type"
                      className="inline-block font-semibold mb-2 font-oswald"
                    >
                      Question Type
                    </label>
                    <select
                      className="p-3 border rounded-sm w-full text-sm"
                      {...register("type", { valueAsNumber: true })}
                    >
                      <option value={QuestionTypes.Simple}>
                        Simple Question with one Answer
                      </option>
                      <option value={QuestionTypes.MultipleChoice}>
                        Multiple Choice Question
                      </option>
                      <option value={QuestionTypes.MultipleCorrect}>
                        Multiple Correct Answers
                      </option>
                      <option value={QuestionTypes.TrueFalse}>
                        True or False
                      </option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="tags"
                      className="inline-block font-semibold mb-2 font-oswald"
                    >
                      Tags
                    </label>
                    <Select
                      options={tags}
                      isMulti
                      name="tags"
                      className="z-50 react-select"
                      classNamePrefix="react-select"
                      getOptionLabel={({ text }) => text}
                      getOptionValue={({ id }) => id}
                      onChange={(value) => setValue("tags", value)}
                    />
                  </div>
                  <div className="text-right">
                    <button
                      type="submit"
                      className="p-6 hidden md:inline-block py-3 text-lg font-light tracking-wider bg-red-600 text-white rounded mt-4"
                    >
                      Save Question
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
          className="p-3 hidden md:inline-block px-6 text-lg font-light tracking-wider bg-red-600 text-white rounded mt-4"
          onClick={() => setOpen(true)}
        >
          Create New Question
        </button>
      </div>
    </>
  );
}
