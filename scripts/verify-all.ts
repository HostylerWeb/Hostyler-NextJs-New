import { execSync } from "node:child_process";

const steps = [
  { name: "Environment", command: "pnpm env:verify" },
  { name: "Foundation", command: "pnpm foundation:verify" },
  { name: "Database", command: "pnpm db:verify" },
  { name: "Design system", command: "pnpm design:verify" },
  { name: "Unit & integration tests", command: "pnpm test" },
  { name: "DB integrity", command: "pnpm db:integrity" },
  { name: "Lint", command: "pnpm lint" },
  { name: "Build", command: "pnpm build" },
];

console.log("Hostyler full verification\n");

for (const step of steps) {
  console.log(`\n── ${step.name} ──\n`);
  execSync(step.command, { stdio: "inherit", cwd: process.cwd() });
}

console.log("\n✓ Full verification passed.");
console.log(
  "\nOptional: start the server (`pnpm start`) then run `pnpm smoke` for HTTP checks.",
);
