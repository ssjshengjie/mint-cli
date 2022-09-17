#! /usr/bin/env zx

import { program } from "commander";
import { createCommand } from "./lib/core/create";
import { helpOptions } from "./lib/core/help";
import { version } from "./lib/core/version";
//version
version();
//options
helpOptions();
// create project
createCommand();
program.parse(process.argv);
const options = program.opts();
if (options.dest) console.log(options.dest);
if (options.frame) console.log(options.frame);
