const fs = require("fs");
const path = require("path");

const dir = process.cwd();

const mainInfo = require(path.join(dir, "package.json"));

const libPackage = path.join(dir, "package.dist.json");

fs.readFile(libPackage, function (error, data) {
  if (error) {
    throw error;
  }

  const text = data.toString();
  const libObj = JSON.parse(text);

  libObj.version = mainInfo.version;
  libObj.dependencies = JSON.parse(JSON.stringify(mainInfo.dependencies));
  libObj.peerDependencies = JSON.parse(
    JSON.stringify(mainInfo.peerDependencies)
  );

  fs.writeFileSync(libPackage, JSON.stringify(libObj, undefined, 2), "utf8");

  console.log(
    `package.dist.json updated successfully to version ${mainInfo.version}`
  );

  fs.copyFileSync(
    path.join(dir, "README.md"),
    path.join(dir, "dist", "README.md")
  );
  fs.copyFileSync(
    path.join(dir, "package.dist.json"),
    path.join(dir, "dist", "package.json")
  );
});
