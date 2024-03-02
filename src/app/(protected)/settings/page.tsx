import { auth } from "@/auth";

export default async function Page() {
  const session = await auth();

  return (
    <div>
      <h1>Settings</h1>
      <p>{JSON.stringify(session)}</p>
    </div>
  );
}
