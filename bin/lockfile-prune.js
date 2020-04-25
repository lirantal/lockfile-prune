#!/usr/bin/env node
/* eslint-disable security/detect-object-injection */
/* eslint-disable security/detect-non-literal-fs-filename */

'use strict'

const fs = require('fs')
const debug = require('debug')('lockfile-prune')
const { pruneDevDeps } = require('../src/Prune')

const args = process.argv.slice(2)

let lockfilePath
if (args && args[0]) {
  lockfilePath = args[0]
  debug(`Provided with lockfile path: ${lockfilePath}`)
}

let sourceLockfile
try {
  sourceLockfile = JSON.parse(fs.readFileSync(lockfilePath, 'utf8'))
} catch (error) {
  debug('Error: unable to parse sourceLockfile')
  throw error
}

const lockfile = pruneDevDeps({ sourceLockfile })
fs.writeFileSync(lockfilePath, JSON.stringify(lockfile, null, 2))
console.log(`Successfully pruned and saved: ${lockfilePath}`)
