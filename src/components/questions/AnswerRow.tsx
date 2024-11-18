import { Answer } from "@/utilities/types";
import { clientPatch } from "@/utilities/queries";
import { useForm } from "react-hook-form";
import { queryClient } from "../../app//providers";

interface Props {
  answer: Answer;
  currentAnswerId: string | null;
  setCurrentAnswerId: any;
  questionId: string;
  index: number;
}

export default function AnswerRow({
  answer,
  currentAnswerId,
  setCurrentAnswerId,
  questionId,
}: Props) {
  const { handleSubmit, register, reset } = useForm<Partial<Answer>>({
    defaultValues: {
      text: answer.text,
      points: answer.points,
    },
  });

  const submitFn = async (payload: Partial<Answer>) => {
    await clientPatch(`answers/${answer.id}`, payload);
    queryClient.invalidateQueries({ queryKey: ["questions", questionId] });
    setCurrentAnswerId(null);
  };

  return (
    <>
      {currentAnswerId !== answer.id && (
        <tr className="border border-b-1 group">
          <td className="p-2 text-center">
            {answer.points !== 0 ? (
              <i className="fad fa-check-circle text-green-600"></i>
            ) : (
              <i className="fad fa-circle text-gray-300"></i>
            )}
          </td>
          <td className="p-2">{answer.text}</td>
          <td className="p-2 text-center">{answer.points}</td>
          <td className="p-1 text-center">
            <i
              className="fad fa-edit text-gray-500 hidden group-hover:inline-block cursor-pointer hover:text-green-500"
              onClick={() => setCurrentAnswerId(answer.id)}
            ></i>
          </td>
        </tr>
      )}
      {currentAnswerId === answer.id && (
        <tr className="border border-b-1 group">
          <td className="p-2" colSpan={4}>
            <form onSubmit={handleSubmit(submitFn)} className="flex w-full">
              <input
                type="text"
                {...register("text")}
                className="p-1 flex-grow border"
              />
              <input
                type="text"
                className="p-1 mx-3 w-16 border"
                {...register("points", { valueAsNumber: true })}
              />
              <div className="rounded-b flex gap-2 text-right">
                <button
                  type="button"
                  className="shadow rounded h-8 w-8 bg-gray-100 hover:bg-gray-200"
                  onClick={() => {
                    reset();
                    setCurrentAnswerId(null);
                  }}
                >
                  <i
                    className="fad fa-times text-xl relative"
                    style={{ top: "3px" }}
                  ></i>
                </button>
                <button
                  type="submit"
                  className="shadow rounded h-8 w-8 bg-gray-100 hover:bg-gray-200"
                >
                  <i
                    className="fad fa-check text-xl relative"
                    style={{ top: "3px" }}
                  ></i>
                </button>
                <button
                  type="button"
                  className="shadow rounded h-8 w-8 bg-gray-100 text-gray-500 hover:bg-red-500 hover:text-white"
                >
                  <i className="fad fa-trash hidden"></i>
                </button>
              </div>
            </form>
          </td>
        </tr>
      )}
    </>
  );
}
