import fs from "fs";
import path from "path";
import { renderTemplate } from "./renderTemplate";
const templateRoot = path.resolve(__dirname, "template");
// render function
function render(templateName, root) {
  const templateDir = path.resolve(templateRoot, templateName);
  renderTemplate(templateDir, root);
}
function writePCK(root, packageName) {
  //写入 package.json
  const pkg = { name: packageName, version: "0.0.0" };
  // package.json content name version
  fs.writeFileSync(
    path.resolve(root, "package.json"),
    JSON.stringify(pkg, null, 2)
  );
  //render default with vite.config.js
  render("config/default", root);
}
function writeConfig(config, root) {
  const { needsTypeScript, needsJsx, needsRouter, needsPinia } = config;
  const cfg = {
    needsTypeScript: "config/ts",
    needsJsx: "config/jsx",
    needsRouter: "config/router",
    needsPinia: "config/pinia",
  };
  const target = { needsTypeScript, needsJsx, needsRouter, needsPinia };
  for (const item in target) {
    if (config[item]) {
      render(`${cfg[item]}`, root);
    }
  }
}
function writeCode(config, root) {
  const { needsTypeScript, needsRouter, needsPinia } = config;
  const cfg = {
    needsTypeScript: "code/ts-default",
    needsRouter: "code/router",
    needsPinia: "code/pinia",
  };
  const target = { needsTypeScript, needsRouter, needsPinia };
  if (!needsTypeScript) {
    render("code/default", root);
  }
  for (const item in target) {
    if (config[item]) {
      render(`${cfg[item]}`, root);
    }
  }
}
function writeVscode(root) {
  render("vscode", root);
}
export { writePCK, writeConfig, writeCode, writeVscode };
