/* eslint-disable security/detect-object-injection */
/* eslint-disable security/detect-non-literal-fs-filename */

const fs = require('fs')
const path = require('path')
const { pruneDevDeps } = require('../src/Prune')

describe('Prune', () => {
  test('ensure pruning devDeps removes all of them', () => {
    const sourceLockfilePath = path.join(__dirname, '__fixtures__', 'npm-shrinkwrap-orig.json')
    const resultLockfilePath = path.join(
      __dirname,
      '__fixtures__',
      'npm-shrinkwrap-prunedDevDeps.json'
    )

    const sourceLockfile = JSON.parse(fs.readFileSync(sourceLockfilePath, 'utf8'))
    const prunedLockfile = pruneDevDeps({ sourceLockfile })

    const prunedLockfileMock = JSON.parse(fs.readFileSync(resultLockfilePath, 'utf8'))

    expect(prunedLockfile).toEqual(prunedLockfileMock)
  })

  test('ensure pruning already pruned file doesnt change it', () => {
    const sourceLockfilePath = path.join(
      __dirname,
      '__fixtures__',
      'npm-shrinkwrap-prunedDevDeps.json'
    )
    const resultLockfilePath = path.join(
      __dirname,
      '__fixtures__',
      'npm-shrinkwrap-prunedDevDeps.json'
    )

    const sourceLockfile = JSON.parse(fs.readFileSync(sourceLockfilePath, 'utf8'))
    const prunedLockfile = pruneDevDeps({ sourceLockfile })

    const prunedLockfileMock = JSON.parse(fs.readFileSync(resultLockfilePath, 'utf8'))

    expect(prunedLockfile).toEqual(prunedLockfileMock)
  })

  test('ensure an no change happens for any generic object that doesnt have deps structure', () => {
    const sourceLockfile = { something: 1234 }

    const result = pruneDevDeps({ sourceLockfile })
    expect(result).toEqual(sourceLockfile)
  })
})
