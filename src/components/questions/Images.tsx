import Dropzone from "react-dropzone";

import Icon from "@/components/layout/Icon";
import { Question } from "@/utilities/types";
import { queryClient } from "../../app/providers";

interface Props {
  question: Question;
}

export default function Images({ question }: Props) {
  if (question && !question?.documents) question.documents = [];

  return (
    <>
      <div className="flex gap-5 justify-between place-content-center w-full">
        <div className="flex gap-5 justify-between place-content-center w-full">
          {question?.documents.map((document) => (
            <div
              className="group relative flex items-center w-full"
              key={document.id}
            >
              <img
                src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${question.company_id}/${document.location}`}
                className="border rounded h-32 w-auto"
              />
              <span
                className="shadow absolute hidden top-2 right-2 w-6 h-6 rounded-sm bg-red-50 text-red-800 text-center group-hover:inline hover:bg-red-200 cursor-pointer"
                onClick={async () => {
                  // await documentService.delete(document.id);
                  // queryClient.invalidateQueries({ queryKey: ["questions", ques] });
                }}
              >
                <Icon type="far" icon="times" className="" />
              </span>
            </div>
          ))}
        </div>
        <Dropzone
          onDrop={async (acceptedFiles) => {
            const formData = new FormData();
            formData.append("question_id", question.id);
            formData.append("company_id", question.company_id);
            acceptedFiles.forEach((file) => {
              formData.append("file", file);
            });

            try {
              const response = await fetch("/api/upload", {
                method: "POST",
                body: formData,
              });

              if (!response.ok) {
                throw new Error("Failed to upload file");
              }

              await response.json();

              queryClient.invalidateQueries({
                queryKey: ["questions", question.id],
              });
            } catch (error) {
              console.error("Error uploading file:", error);
            }
          }}
        >
          {({ getRootProps, getInputProps }) => (
            <section className="bg-gray-100 p-3 col-span-2 text-center border-dashed border-2 cursor-pointer flex flex-col justify-center">
              <div {...getRootProps()} className="justify-self-center">
                <input {...getInputProps()} />
                <p className="text-gray-600">
                  <Icon icon="images" className="fa-lg mr-3 top-1 relative" />
                  <br />
                  Drop or click to upload
                </p>
              </div>
            </section>
          )}
        </Dropzone>
      </div>
    </>
  );
}
