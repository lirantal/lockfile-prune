#!/usr/bin/env node
/* eslint-disable security/detect-object-injection */
/* eslint-disable security/detect-non-literal-fs-filename */

'use strict'

const fs = require('fs')
const debug = require('debug')('lockfile-prune')
const args = process.argv.slice(2)

let lockfilePath
if (args && args[0]) {
  lockfilePath = args[0]
  debug(`Provided with lockfile path: ${lockfilePath}`)
}

// based on Issaac's code snippet to prune devDeps from a shrinkwrap
// https://gist.github.com/isaacs/0547571e778beb4710a1114ff5f61d8b
function pruneDevDeps({ sourceLockfile }) {
  let lockfile
  try {
    lockfile = JSON.parse(JSON.stringify(sourceLockfile))
  } catch (error) {
    debug('Error: unable to parse sourceLockfile')
    throw error
  }

  if (lockfile.dependencies) {
    for (const [name, dependencies] of Object.entries(lockfile.dependencies)) {
      if (dependencies.dev === true) {
        delete lockfile.dependencies[name]
      }
    }
  }

  return lockfile
}

const sourceLockfile = JSON.parse(fs.readFileSync(lockfilePath, 'utf8'))
const lockfile = pruneDevDeps({ sourceLockfile })
fs.writeFileSync(lockfilePath, JSON.stringify(lockfile, null, 2))
console.log(`Successfully pruned and saved: ${lockfilePath}`)
