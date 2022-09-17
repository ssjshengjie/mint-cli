import fs from "fs";
import minimist from "minimist";
import path from "path";
import { init } from "../../utils/init";
import { renderMain } from "../../utils/renderMain";
import { renderTemplate } from "../../utils/renderTemplate";
import { red, green, bold } from "kolorist";
import getCommand from "../../utils/getCommand";
export const createProjectAction = async () => {
  const cwd = process.cwd();
  const argv = minimist(process.argv.slice(2));
  let targetDir = argv._[0];
  const result = await init(targetDir);
  const userAgent = process.env.npm_config_user_agent ?? "";
  const packageManager = /pnpm/.test(userAgent)
    ? "pnpm"
    : /yarn/.test(userAgent)
    ? "yarn"
    : "npm";
  const {
    projectName,
    packageName = projectName,
    needsJsx = argv.jsx,
    needsTypeScript = argv.typescript,
    needsRouter = argv.router,
    needsPinia = argv.pinia,
  } = result;
  if (projectName) {
    targetDir = projectName;
  }
  // root path
  const root = path.join(cwd, targetDir);
  //Check if this file exists
  if (fs.existsSync(root)) {
    console.log(
      "Duplicate directory, launch CLI, please select red to choose a name"
    );
    process.exit(1);
  } else if (!fs.existsSync(root)) {
    // create directory with root = projectName
    fs.mkdirSync(root);
  }
  const pkg = { name: packageName, version: "0.0.0" };
  //create package.json content name version
  fs.writeFileSync(
    path.resolve(root, "package.json"),
    JSON.stringify(pkg, null, 2)
  );
  // render a config to  pakeage.json devDependcies
  const templateRoot = path.resolve(__dirname, "template");
  // render function
  function render(templateName) {
    const templateDir = path.resolve(templateRoot, templateName);
    renderTemplate(templateDir, root);
  }
  // default package config
  render("config/default");
  //default vscode idea json setting
  render("vscode");
  // render ts
  if (needsTypeScript) {
    render("config/ts");
  }
  // render jsx config
  if (needsJsx) {
    needsTypeScript ? render("config/tsx") : render("config/jsx");
  }
  // render router config
  if (needsRouter) {
    render("config/router");
    needsTypeScript ? render("code/ts-router") : render("code/router");
  }
  //render pinia config
  if (needsPinia) {
    render("config/pinia");
    needsTypeScript ? render("code/ts-pinia") : render("code/pinia");
  }
  //render vue-reouer
  const codeTemplate =
    (needsTypeScript ? "ts-" : "") + (needsRouter ? "router" : "default");
  render(`code/${codeTemplate}`);
  //render project scr
  const codePublic = needsTypeScript ? "ts-default" : "default";
  render(`code/${codePublic}`);
  //render src main.ts or main.js
  renderMain(needsTypeScript, needsRouter, needsPinia, root);
  console.log(`\nDone. Now run:\n`);
  if (root !== cwd) {
    console.log(`  ${bold(green(`cd ${path.relative(cwd, root)}`))}`);
  }
  console.log(`  ${bold(green(getCommand(packageManager, "install")))}`);
  // if (needsPrettier) {
  //   console.log(`  ${bold(green(getCommand(packageManager, "lint")))}`);
  // }
  console.log(`  ${bold(green(getCommand(packageManager, "dev")))}`);
  console.log();
};
