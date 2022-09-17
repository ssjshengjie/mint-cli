import fs from "fs";
import path from "path";
const reg = /^((?!(\(|\)|<|>))\S)*?(\.js)$/;
export const transformTs = (cwd) => {
  fs.readdir(cwd, (err, files) => {
    if (err) {
      console.warn(err);
    }
    files.forEach((filename) => {
      const filedir = path.join(cwd, filename);
      fs.stat(filedir, (err, stats) => {
        if (err) {
          console.warn(err);
        } else {
          const isDir = stats.isDirectory();
          if (isDir) {
            // console.log(path.resolve(filedir));
            transformTs(path.resolve(filedir));
          } else {
            if (reg.test(filename)) {
              const newFiledir = path.resolve(filedir.replace(".js", ".ts"));
              fs.rename(filedir, newFiledir, (err) => {
                if (err) throw err;
                fs.stat(newFiledir, (err) => {
                  if (err) throw err;
                });
              });
            }
          }
        }
      });
    });
  });
};
