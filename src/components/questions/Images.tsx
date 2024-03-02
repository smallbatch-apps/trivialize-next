import Dropzone from "react-dropzone";

import Icon from "@/components/layout/Icon";
import { Question } from "@/utilities/types";
import { queryClient } from "@/utilities/queries";

// import { documentService } from "@/services";

interface Props {
  question: Question | null;
}

export default function Images({ question }: Props) {
  return (
    <>
      <h3 className="text-xl font-oswald ">Images</h3>
      <div className="grid grid-cols-4 gap-5 my-5 justify-center place-content-center">
        {question?.documents.map((document) => (
          <div className="group relative flex items-center" key={document.id}>
            <img
              src={`${process.env.REACT_APP_IMAGE_HOST}/${question.companyId}/${document.location}`}
              className="border rounded"
              alt={document.title}
            />
            <span
              className="shadow absolute hidden top-2 right-2 w-6 h-6 rounded-sm bg-red-50 text-red-800 text-center group-hover:inline hover:bg-red-200 cursor-pointer"
              onClick={async () => {
                // await documentService.delete(document.id);
                queryClient.invalidateQueries({ queryKey: ["questions"] });
              }}
            >
              <Icon type="far" icon="times" className="" />
            </span>
          </div>
        ))}

        <Dropzone
          onDrop={async ([file]) => {
            // await documentService.upload({
            //   title: file.name,
            //   type: "company",
            //   questionId: question?.id,
            //   document: file,
            // });
            queryClient.invalidateQueries({ queryKey: ["questions"] });

            // const data = await request.json();
            // setUploadedFile(data);
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
