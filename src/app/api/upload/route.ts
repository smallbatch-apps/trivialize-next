import { NextResponse } from "next/server";
import busboy from "busboy";
import { put } from "@vercel/blob";
import { clientPost } from "@/utilities/queries";

export const runtime = "nodejs"; // Ensure we are using the Node.js runtime

type FieldInfo = {
  filename: string;
  encoding: string;
  mimeType: string;
};
type FileData = {
  fieldname: string;
  filename: string;
  encoding: string;
  mimetype: string;
  chunks: Buffer[]; // Used to collect chunks during the stream
  data: Buffer; // Final data as a single Buffer
};

export async function POST(req: Request) {
  return new Promise((resolve, reject) => {
    try {
      // Convert Headers to a plain object for busboy
      const headers: Record<string, string> = {};
      req.headers.forEach((value, key) => {
        headers[key.toLowerCase()] = value;
      });

      // Instantiate busboy with the converted headers
      const bb = busboy({ headers });

      const fields: Record<string, string> = {};
      const files: Array<FileData> = [];

      bb.on(
        "file",
        (
          fieldname: string,
          file: NodeJS.ReadableStream,
          filename: FieldInfo
        ): void => {
          // Define fileData with the correct structure including `chunks`
          const fileData: FileData = {
            fieldname,
            filename: filename.filename,
            encoding: filename.encoding,
            mimetype: filename.mimeType,
            chunks: [], // Initialize an empty array for chunks
            data: Buffer.from([]), // Initialize an empty buffer for data
          };

          file.on("data", (data: Buffer): void => {
            fileData.chunks.push(data);
          });

          file.on("end", (): void => {
            const completeBuffer = Buffer.concat(fileData.chunks);

            files.push({
              ...fileData,
              data: completeBuffer,
            });
          });
        }
      );

      bb.on("field", (fieldname: string, val: string): void => {
        fields[fieldname] = val;
      });

      bb.on("finish", (): void => {
        for (const file of files) {
          if (!file) continue;

          put(
            `${fields.company_id}/${
              file.filename ?? `uploaded-file-${Date.now()}`
            }`,
            file.data,
            { access: "public" }
          ).then(async (blob) => {
            const location = blob.url.split("/").pop();
            const documentResponse = await clientPost("documents", {
              question_id: fields.question_id,
              location,
            });
            const document = await documentResponse.json();
            console.log("Document created:", document);
          });
        }

        resolve(
          NextResponse.json({
            message: "File uploaded successfully",
            files,
            fields,
          })
        );
      });

      bb.on("error", (err: Error): void => {
        reject(new Response(`Upload error: ${err.message}`, { status: 500 }));
      });

      // Since `req.body` is a ReadableStream, convert it to Node.js's readable stream
      const reader = req.body?.getReader();
      if (reader) {
        (async () => {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            bb.write(value);
          }
          bb.end(); // End busboy stream
        })().catch((err) =>
          reject(new Response(`Stream error: ${err.message}`, { status: 500 }))
        );
      } else {
        reject(new Response("No body found", { status: 400 }));
      }
    } catch (error) {
      console.error("Upload Error:", error);
      reject(new Response("Error processing the upload", { status: 500 }));
    }
  });
}

// import { NextRequest, NextResponse } from "next/server";
// import formidable from "formidable";
// import fs from "fs";
// import { put } from "@vercel/blob";
// import { clientPost } from "@/utilities/queries";
// import { Readable } from "stream";
// import { IncomingMessage } from "http";
// import busboy from "busboy";
// import type { BusboyFileStream } from "busboy";

// export const runtime = "nodejs";
// export async function POST(req: NextRequest): Promise<NextResponse> {
//   return new Promise((resolve, reject) => {
//     try {
//       // Convert Headers to a plain object for busboy
//       const headers: Record<string, string> = {};
//       req.headers.forEach((value, key) => {
//         headers[key.toLowerCase()] = value;
//       });

//       // Instantiate busboy with the converted headers
//       const bb = busboy({ headers });

//       const fields: Record<string, string> = {};
//       const files: Array<{
//         fieldname: string;
//         filename: string;
//         encoding: string;
//         mimetype: string;
//         data: Buffer;
//       }> = [];

//       // Add the explicit return type `void` to fix the error
//       bb.on(
//         "file",
//         (
//           fieldname: string,
//           file: NodeJS.ReadableStream,
//           filename: string,
//           encoding: string,
//           mimetype: string
//         ): void => {
//           const fileData: { fieldname: string; filename: string; encoding: string; mimetype: string; chunks: Buffer[] } = { fieldname,
//             filename,
//             encoding,
//             mimetype,
//             data: [], };

//           file.on("data", (data: Buffer): void => {
//             fileData.data.push(data);
//           });

//           file.on("end", (): void => {
//             // Concatenate all chunks into a single buffer
//             const completeBuffer = Buffer.concat(fileData.chunks);
//             files.push({
//               fieldname: fileData.fieldname,
//               filename: fileData.filename,
//               encoding: fileData.encoding,
//               mimetype: fileData.mimetype,
//               data: completeBuffer,
//             });
//           });
//         }
//       );

//       bb.on("field", (fieldname: string, val: string): void => {
//         fields[fieldname] = val;
//       });

//       bb.on("finish", (): void => {
//         console.log("Files:", files);
//         console.log("Fields:", fields);
//         resolve(
//           NextResponse.json({
//             message: "File uploaded successfully",
//             files,
//             fields,
//           })
//         );
//       });

//       bb.on("error", (err: Error): void => {
//         reject(new Response(`Upload error: ${err.message}`, { status: 500 }));
//       });

//       // Since `req.body` is a ReadableStream, convert it to Node.js's readable stream
//       const reader = req.body?.getReader();
//       if (reader) {
//         (async () => {
//           while (true) {
//             const { done, value } = await reader.read();
//             if (done) break;
//             bb.write(value);
//           }
//           bb.end(); // End busboy stream
//         })().catch((err) =>
//           reject(new Response(`Stream error: ${err.message}`, { status: 500 }))
//         );
//       } else {
//         reject(new Response("No body found", { status: 400 }));
//       }
//     } catch (error) {
//       console.error("Upload Error:", error);
//       reject(new Response("Error processing the upload", { status: 500 }));
//     }
//   });
// try {
//   const form = formidable({ multiples: true });

//   // Create a promise to handle Formidable parsing
//   const data = await new Promise((resolve, reject) => {
//     const chunks: Buffer[] = [];

//     // Get the request body as a stream and collect chunks
//     req.body?.on("data", (chunk) => {
//       chunks.push(chunk);
//     });

//     req.body?.on("end", () => {
//       const buffer = Buffer.concat(chunks);
//       form.parse(buffer, (err, fields, files) => {
//         if (err) {
//           reject(err);
//           return;
//         }
//         resolve({ fields, files });
//       });
//     });

//     req.body?.on("error", (err) => {
//       reject(err);
//     });
//   });

//   const { fields, files } = data as {
//     fields: formidable.Fields;
//     files: formidable.Files;
//   };

//   console.log(files); // Log files for reference

//   return NextResponse.json({ message: "File uploaded successfully" });
// try {
//   const form = formidable({ multiples: true });

//   // Convert the body to a Readable stream for Formidable
//   // const reqBody = await req.arrayBuffer();
//   // const stream = Readable.from(Buffer.from(reqBody));

//   const contentLength = req.headers.get("content-length");
//   const bodyStream = req.body;

//   if (!bodyStream) {
//     return new Response("No body stream found", { status: 400 });
//   }

//   const incomingMessage = new IncomingMessage(req);
//   incomingMessage.headers = req.headers;
//   incomingMessage.method = req.method;
//   incomingMessage.url = req.url;
//   incomingMessage.push(await req.arrayBuffer());
//   incomingMessage.push(null);

//   const form = formidable({ multiples: true });

//   const { fields, files } = await new Promise((resolve, reject) => {
//     form.parse(stream, (err, fields, files) => {
//       if (err) {
//         reject(err);
//         return;
//       }
//       resolve({ fields, files });
//     });
//   });

//   // Process the file or relay to the Golang API
//   console.log(files);
//   console.log(fields);

// try {
//   // Parse the incoming form-data using Formidable
//   const form = formidable({
//     multiples: true, // Set true if you expect multiple file uploads
//   });

//   // Create a promise to parse the form
//   const formData = await new Promise<{
//     fields: formidable.Fields;
//     files: formidable.Files;
//   }>((resolve, reject) => {
//     form.parse(req as any, (err, fields, files) => {
//       if (err) reject(err);
//       else resolve({ fields, files });
//     });
//   });

//   // Extract the files from parsed form data
//   const { files, fields } = formData;
//   const companyIdValue = fields.company_id;
//   const companyId = Array.isArray(companyIdValue)
//     ? companyIdValue[0]
//     : companyIdValue;

//   const questionIdValue = fields.question_id;
//   const question_id = Array.isArray(questionIdValue)
//     ? questionIdValue[0]
//     : questionIdValue;

//   if (!companyId) {
//     return NextResponse.json(
//       { error: "No company_id provided" },
//       { status: 400 }
//     );
//   }
//   const uploadedFiles = [];

//   // Check if files.file is an array
//   const fileArray = Array.isArray(files.file) ? files.file : [files.file];

//   for (const file of fileArray) {
//     if (!file) continue;

//     const fileStream = fs.createReadStream(file.filepath);
//     const blob = await put(
//       `${companyId}/${
//         file.originalFilename ?? `uploaded-file-${Date.now()}`
//       }`,
//       fileStream,
//       { access: "public" }
//     );

//     uploadedFiles.push({ url: blob.url });
//     const location = blob.url.split("/").pop();
//     const document = await clientPost("documents", { question_id, location });
//     console.log("Document created:", document);
//   }

// return NextResponse.json({ uploadedFiles }, { status: 200 });
// } catch (error) {
//   console.error("Upload error:", error);
//   return NextResponse.json(
//     { error: "Failed to upload file" },
//     { status: 500 }
//   );
// }
// }
