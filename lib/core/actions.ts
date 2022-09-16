import fs from "fs";
import minimist from "minimist";
import path from "path";
import { init } from "../utils/init";
import { renderTemplate } from "../utils/renderTemplate";
export const createProjectAction = async () => {
  const cwd = process.cwd();
  const argv = minimist(process.argv.slice(2));
  let targetDir = argv._[0];
  const result = await init(targetDir);
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
  //create package.json
  fs.writeFileSync(
    path.resolve(root, "package.json"),
    JSON.stringify(pkg, null, 2)
  );
  const templateRoot = path.resolve(__dirname, "template");
  function render(templateName) {
    const templateDir = path.resolve(templateRoot, templateName);
    renderTemplate(templateDir, root);
  }
  if (needsJsx) {
    render("config/jsx");
  }
  if (needsRouter) {
    render("config/router");
  }
  if (needsPinia) {
    render("config/pinia");
  }
  if (needsTypeScript) {
    render("config/ts");
    render("tsconfig/base");
  }
  const codeTemplate =
    (needsTypeScript ? "ts-" : "") + (needsRouter ? "router" : "default");
  render(`code/${codeTemplate}`);
};
