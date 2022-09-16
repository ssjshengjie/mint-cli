import { program } from "commander";

export const helpOptions = () => {
  program
    .option("-d --dest <dest>", "a destination folder")
    .option("-f --frame <frame>", "Choose the framework");
};
