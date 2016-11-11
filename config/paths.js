const path = require('path');
const fs = require('fs');

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebookincubator/create-react-app/issues/637
const appDirectory = fs.realpathSync(process.cwd());
function resolveApp(relativePath) {
  // console.log(path.resolve(appDirectory, relativePath));
  return path.resolve(appDirectory, relativePath);
}

// We support resolving modules according to `NODE_PATH`.
// This lets you use absolute paths in imports inside large monorepos:
// https://github.com/facebookincubator/create-react-app/issues/253.

// It works similar to `NODE_PATH` in Node itself:
// https://nodejs.org/api/modules.html#modules_loading_from_the_global_folders

// We will export `nodePaths` as an array of absolute paths.
// It will then be used by Webpack configs.
// Jest doesn’t need this because it already handles `NODE_PATH` out of the box.

const nodePaths = (process.env.NODE_PATH || '')
  .split(process.platform === 'win32' ? ';' : ':')
  .filter(Boolean)
  .map(resolveApp);

// config after eject: we're in ./config/
module.exports = {
  appBuild: resolveApp('client'),
  appPublic: resolveApp('client'),
  appHtml: resolveApp('app/index.html'),
  appTemplate: resolveApp('app/template.js'),
  appIndexJs: resolveApp('app/client.jsx'),
  appServerJs: resolveApp('app/server.jsx'),
  appPackageJson: resolveApp('package.json'),
  appSrc: resolveApp('app'),
  testsSetup: resolveApp('src/setupTests.js'),
  appNodeModules: resolveApp('node_modules'),
  ownNodeModules: resolveApp('node_modules'),
  nodePaths
};



// config before publish: we're in ./packages/react-scripts/config/
// if (__dirname.indexOf(path.join('packages', 'react-scripts', 'config')) !== -1) {
//   module.exports = {
//     appBuild: resolveOwn('../../../build'),
//     appPublic: resolveOwn('../template/public'),
//     appHtml: resolveOwn('../template/client/index.html'),
//     appIndexJs: resolveOwn('../template/client/index.jsx'),
//     appPackageJson: resolveOwn('../package.json'),
//     appSrc: resolveOwn('../template/client'),
//     testsSetup: resolveOwn('../template/client/setupTests.js'),
//     appNodeModules: resolveOwn('../node_modules'),
//     ownNodeModules: resolveOwn('../node_modules'),
//     nodePaths: nodePaths
//   };
// }
