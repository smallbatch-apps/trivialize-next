// import { useRouter } from "next/navigation";
// import { apiClient } from "@/apiClient";
import BlueBox from "@/components/layout/BlueBox";
import PlanningHero from "@/images/heroes/planning.jpg";
import SignupForm from "@/components/forms/SignupForm";

export default function page() {
  return (
    <>
      <BlueBox hero={PlanningHero}>
        <h2 className="text-6xl mb-8 font-oswald">Sign Up</h2>

        <p>
          Create your Trivialize account and start storing questions. You don't
          need to set up any payments now, but you can upgrade when you're ready
          to start making events.
        </p>

        <div className="mt-8">
          <span className="rounded border border-white p-3 px-4 hover:bg-blue-600">
            View Packages
          </span>
          <span className="rounded border border-white p-3 px-4 bg-white text-blue-500 hover:bg-blue-600 ml-5">
            Just want to log in?
          </span>
        </div>
      </BlueBox>

      <div className="px-5 py-3 sm:px-8 sm:py-5 md:px-16 md:py-10 lg:px-20 lg:py-16 xl:px-60 xl:py-20 2xl:px-72 2xl:py-32 font-light">
        <div className="grid grid-cols-2 gap-4">
          <SignupForm />
          <div className="shadow rounded p-5 col-span-2 md:col-span-1">
            <h2 className="text-xl text-gray-600 uppercase">Your Account</h2>
            <hr className="mt-3" />
            <div className="flex justify-between mt-3 mx-5">
              <span>Monthly Cost</span>
              <span className="font-semibold">Free</span>
            </div>
            <div className="flex justify-between mt-2 mb-3 mx-5">
              <span>Access Length</span>
              <span className="font-semibold">Infinite</span>
            </div>
            <hr />
            <div className="flex mt-6 mb-3">
              <span className="px-5">
                <i className="fal fa-check"></i>
              </span>
              <span>
                Manage questions and answers for future events, store and
                search, and tag to find them more easily.
              </span>
            </div>
            <div className="flex mt-6 mb-3">
              <span className="px-5">
                <i className="fal fa-clock"></i>
              </span>
              <span>
                Prepare and create events, add rounds, and assign questions into
                them. Build custom slideshow to help you run the event. - Coming
                Soon!
              </span>
            </div>
            <div className="flex mt-6 mb-3">
              <span className="px-5">
                <i className="fal fa-clock"></i>
              </span>
              <span>
                Full digital event management, including registrations, digital
                scoring assistance, event leaderboards and more - Coming Less
                Soon!
              </span>
            </div>
            <div className="flex mt-6 mb-3">
              <span className="px-5">
                <i className="fal fa-clock"></i>
              </span>
              <span>
                Online events with team setup, registration, team chat or video
                rooms, and host video broadcast. - Coming Eventually!
              </span>
            </div>
            <hr />
            <div className="mt-3 flex">
              <div></div>
              <div>
                <div className="w-full">Terms of Service</div>
                <div className="text-xs w-full text-gray-500">
                  I agree to the terms of service
                </div>
              </div>
            </div>
            <div className="mt-3 flex">
              <div></div>
              <div>
                <div className="w-full">Newsletter Signup</div>
                <div className="text-xs w-full text-gray-500">
                  I want to receive occasional updates of new features.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
