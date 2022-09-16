import { program } from "commander";
import { createProjectAction } from "./actions";
import banner from "../utils/clg";
export const createCommand = () => {
  program
    .command("create")
    .description("Start creating the project")
    .action(() => {
      console.log(`\n${banner}\n`);
      createProjectAction();
    });
};
