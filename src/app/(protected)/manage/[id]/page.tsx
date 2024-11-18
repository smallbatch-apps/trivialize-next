import BlueBoxSmall from "@/components/layout/BlueBoxSmall";
import HeroImage from "@/images/heroes/bar-2.jpg";
import SeriesList from "@/components/events/SeriesList";
import EventQuestions from "@/components/manage/EventQuestions";

export default function page() {
  return (
    <>
      <BlueBoxSmall hero={HeroImage}>
        <h2 className="text-6xl font-oswald">Manage Quiz Event</h2>
        <p className="text-2xl mt-6 text-blue-100">
          Add questions in the setup rounds for this trivia event
        </p>
      </BlueBoxSmall>

      <div className="container mx-auto h-full">
        <h1 className="font-oswald text-blue-400 text-4xl m-5 my-6">
          Add and manage questions for this event
        </h1>

        <EventQuestions />
      </div>
    </>
  );
}
