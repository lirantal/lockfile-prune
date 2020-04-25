'use strict'
/* eslint-disable security/detect-object-injection */
/* eslint-disable security/detect-non-literal-fs-filename */
const debug = require('debug')('lockfile-prune')

// based on Issaac's code snippet to prune devDeps from a shrinkwrap
// https://gist.github.com/isaacs/0547571e778beb4710a1114ff5f61d8b
function pruneDevDeps({ sourceLockfile }) {
  const lockfile = JSON.parse(JSON.stringify(sourceLockfile))

  if (lockfile.dependencies) {
    for (const [name, dependencies] of Object.entries(lockfile.dependencies)) {
      if (dependencies.dev === true) {
        delete lockfile.dependencies[name]
      }
    }
  }

  return lockfile
}

module.exports = { pruneDevDeps }
