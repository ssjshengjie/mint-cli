import fs from "fs";
import { bold, green } from "kolorist";
import minimist from "minimist";
import path from "path";
import getCommand from "../../utils/getCommand";
import { init } from "../../utils/init";
import { renderMain } from "../../utils/renderMain";
import { transformTs } from "../../utils/transfrom";
import {
  writeCode,
  writeConfig,
  writePCK,
  writeVscode,
} from "../../utils/write";
export const createProjectAction = async () => {
  const cwd = process.cwd();
  const argv = minimist(process.argv.slice(2));
  let targetDir = argv._[0];
  const result = await init();
  const userAgent = process.env.npm_config_user_agent ?? "";
  const packageManager = /pnpm/.test(userAgent)
    ? "pnpm"
    : /yarn/.test(userAgent)
    ? "yarn"
    : "npm";
  const {
    projectName,
    packageName = projectName,
    needsTypeScript,
    needsRouter,
    needsPinia,
  } = result;
  if (projectName) {
    targetDir = projectName;
  }
  // root path  => C:\\Users\\xxx\\Desktop\\mint-cli\\project
  const root = path.join(cwd, targetDir);
  //Check if this file exists
  if (fs.existsSync(root)) {
    console.log(
      "Duplicate directory, launch CLI, please select red to choose a name"
    );
    process.exit(1);
  } else if (!fs.existsSync(root)) {
    // create directory with root => projectName  you/directory/project
    fs.mkdirSync(root);
  }
  //write package.json
  writePCK(root, packageName);
  // write package.json devDependencies dependencies
  writeConfig(result, root);
  //write code template
  writeCode(result, root);
  //write vscode setting
  writeVscode(root);
  // //render src main.ts or main.js
  renderMain(needsTypeScript, needsRouter, needsPinia, root);
  //If the project is ts, change all file names ending in js to ts
  if (needsTypeScript) {
    transformTs(root);
  }
  //=== end
  console.log(`\nDone. Now run:\n`);
  if (root !== cwd) {
    console.log(`  ${bold(green(`cd ${path.relative(cwd, root)}`))}`);
  }
  console.log(`  ${bold(green(getCommand(packageManager, "install")))}`);
  console.log(`  ${bold(green(getCommand(packageManager, "dev")))}`);
  console.log();
};
