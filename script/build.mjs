import { build } from "esbuild";
import { resolve } from "path";
build({
  entryPoints: [resolve("index.ts")],
  bundle: true,
  outfile: "mt.cjs",
  platform: "node",
})
  .then(() => {
    console.log("watch~~~~~~~~~~~~~~~~~");
  })
  .catch(() => process.exit(1));
