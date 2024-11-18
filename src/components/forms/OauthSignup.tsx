import Icon from "@/components/layout/Icon";

import Link from "next/link";

export default function OathSignup() {
  return (
    <div>
      <h1>Sign up with social media</h1>

      <div className="flex justify-center mt-5 gap-2 text-white">
        <div className="flex flex-1 items-center gap-2 justify-center rounded bg-blue-500 p-2 px-3 hover:bg-blue-600 cursor-pointer">
          <Icon icon="facebook" type="fab" className="fa-xl" fixedWidth />
          Sign up with Facebook
        </div>
        <Link
          href={process.env.NEXT_PUBLIC_GOOGLE_LINK ?? ""}
          className="flex flex-1 items-center justify-center gap-2 rounded bg-blue-500 p-2 px-3 hover:bg-blue-600 cursor-pointer"
        >
          <Icon icon="google" type="fab" className="fa-xl" fixedWidth />
          Sign up with Google
        </Link>
      </div>
    </div>
  );
}
