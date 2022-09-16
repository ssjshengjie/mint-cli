import minimist from "minimist";
import { init } from "../utils/init";

export const createProjectAction = async () => {
  const argv = minimist(process.argv.slice(2));
  const result = await init();
  console.log(argv);
};
