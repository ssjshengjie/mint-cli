import { program } from "commander";
import path from "../../package.json";
export const version = () => {
  program.name(path.name).description(path.description).version(path.version);
};
