import fs from "fs";
import path from "path";

const dir = process.cwd();

// Read package.json without using dynamic import (CJS/ESM compatible)
const mainPkgPath = path.join(dir, "package.json");
const mainInfo = JSON.parse(fs.readFileSync(mainPkgPath, "utf8") || "{}");

const libPackage = path.join(dir, "package.dist.json");

// Read package.dist.json safely and tolerate missing/invalid content.
let libObj = {};
try {
  if (fs.existsSync(libPackage)) {
    const text = fs.readFileSync(libPackage, "utf8");
    try {
      libObj = JSON.parse(text || "{}");
    } catch (parseErr) {
      // If file contains invalid JSON (eg. 'undefined'), start from an empty object
      libObj = {};
    }
  }
} catch (err) {
  // If any IO error happens, rethrow so the build stops with a clear error
  throw err;
}

libObj.version = mainInfo.version;
libObj.dependencies = JSON.parse(JSON.stringify(mainInfo.dependencies || {}));
libObj.peerDependencies = JSON.parse(
  JSON.stringify(mainInfo.peerDependencies || {}),
);
// Preserve package type (module/commonjs) so Node can load the dist files
// without reparsing warnings. If the package.json has a "type" field, use it;
// otherwise default to "module" for our plugins.
if (mainInfo.type) {
  libObj.type = mainInfo.type;
} else if (!libObj.type) {
  libObj.type = "module";
}
// Ensure main is set for runtime resolution
if (!libObj.main) libObj.main = "index.js";

fs.writeFileSync(libPackage, JSON.stringify(libObj, undefined, 2), "utf8");

console.log(
  `package.dist.json updated successfully to version ${mainInfo.version}`,
);

// Copy README and generated package.json into dist if present
const readmePath = path.join(dir, "README.md");
const outReadme = path.join(dir, "dist", "README.md");
const outPackage = path.join(dir, "dist", "package.json");
try {
  if (fs.existsSync(readmePath)) fs.copyFileSync(readmePath, outReadme);
  if (fs.existsSync(libPackage)) fs.copyFileSync(libPackage, outPackage);
} catch (copyErr) {
  // Non-fatal for subsequent build steps, but print a warning
  console.warn(
    "distfiles: could not copy README or package.dist.json to dist:",
    copyErr.message,
  );
}
