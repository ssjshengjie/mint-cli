import { program } from "commander";
import banner from "../utils/clg";
import { createProjectAction } from "./actions";
export const createCommand = () => {
  program
    .command("create")
    .description("Start creating the project")
    .action(() => {
      console.log(`\n${banner}\n`);
      createProjectAction();
    });
};
