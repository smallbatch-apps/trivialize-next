import BlueBoxSmall from "@/components/layout/BlueBoxSmall";
import HeroImage from "@/images/heroes/bar-2.jpg";
import SeriesList from "@/components/events/SeriesList";

export default function page() {
  return (
    <>
      <BlueBoxSmall hero={HeroImage}>
        <h2 className="text-6xl font-oswald">Manage Series and Events</h2>
        <p className="text-2xl mt-6 text-blue-100">
          Create and manage your series, events and rounds here.
        </p>
      </BlueBoxSmall>

      <div className="container mx-auto h-full">
        <h1 className="font-oswald text-blue-400 text-4xl m-5 my-6">
          Series and Events
        </h1>

        <SeriesList />
      </div>
    </>
  );
}
