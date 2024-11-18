import BlueBoxSmall from "@/components/layout/BlueBoxSmall";
import QuestionsPanel from "@/components/questions/QuestionsPanel";
import QuestionsHero from "@/images/heroes/questions.jpg";

export default function page() {
  return (
    <>
      <BlueBoxSmall hero={QuestionsHero}>
        <h2 className="text-6xl font-oswald">Manage Your Questions</h2>
        <p className="text-2xl mt-6 text-blue-100">
          Add your questions and answers, tag them to make them easier to find
          later.
        </p>
      </BlueBoxSmall>

      <div className="container mx-auto h-full flex">
        <QuestionsPanel />
      </div>
    </>
  );
}
