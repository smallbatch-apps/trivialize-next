import { migrate } from "drizzle-orm/neon-http/migrator";

import { db } from "./";

async function main() {
  await migrate(db, { migrationsFolder: "src/db/migrations" });
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
