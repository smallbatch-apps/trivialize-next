import prisma from "../index";

import { rawTags } from "./tags";
import { rawQuestions } from "./questions";

export const companyId = "c7c3c627-322f-41fc-a483-957428f79f5b";

async function main() {
  await prisma.company.create({
    data: {
      name: "Trivialize",
      users: {
        create: {
          id: companyId,
          name: "Matt Burgess",
          email: "matt@smallbatch.io",
          password: process.env.AUTH_PASSWORD,
        },
      },
    },
  });

  await prisma.tag.createMany({ data: rawTags });

  const questions = rawQuestions.map(async (question) => {
    await prisma.question.create({
      data: question,
    });
  });

  await Promise.all(questions);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
