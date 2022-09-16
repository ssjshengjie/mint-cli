import { program } from "commander";
import { createProjectAction } from "./actions";

export const createCommand = () => {
  program
    .command("create")
    .description("Start creating the project")
    .action(() => {
      createProjectAction();
    });
};
