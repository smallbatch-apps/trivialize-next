"use client";

// import { signOut } from "@/auth";

import { usePathname } from "next/navigation";
// import { LoginContext } from "../../utilities/reducers";

import Link from "next/link";

import AccountPanel from "../layout/AccountPanel";

export default function Navbar() {
  // const { pathname } = useLocation();
  // const {
  //   state: { loggedIn },
  // } = useContext(LoginContext);
  const pathname = usePathname();
  // console.log(session)
  const loggedIn = true;
  // className="font-medium py-1 my-3 border-b-4 border-gray-900 mr-6"
  const inactiveClassName =
    "font-medium py-1 my-3 border-b-4 border-gray-900 mr-6";
  const activeClassName = `${inactiveClassName} text-white border-blue-500`;

  return (
    <div className="flex justify-between">
      <div className="flex">
        <Link
          href="/"
          className="font-medium py-1 my-3 border-b-4 border-gray-900 mr-6"
        >
          Home
        </Link>

        {!loggedIn && (
          <>
            <Link
              href="/signup"
              className="font-medium py-1 my-3 border-b-4 border-gray-900 mr-6"
            >
              Sign Up
            </Link>
            <Link
              href="/login"
              className="font-medium py-1 my-3 border-b-4 border-gray-900 mr-6"
            >
              Log In
            </Link>
          </>
        )}

        {loggedIn && (
          <>
            <Link
              href="/questions"
              className={
                pathname.startsWith("/questions")
                  ? activeClassName
                  : inactiveClassName
              }
            >
              Manage Questions
            </Link>
            <Link
              href="/events"
              className={
                pathname.startsWith("/events")
                  ? activeClassName
                  : inactiveClassName
              }
            >
              Manage Series and Events
            </Link>

            <Link
              href="/logout"
              className="font-medium py-1 my-3 border-b-4 border-gray-900 mr-6"
            >
              Log Out
            </Link>
          </>
        )}
      </div>
      <div className="flex">
        <AccountPanel />
      </div>
    </div>
  );
}
