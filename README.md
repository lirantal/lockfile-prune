<p align="center"><h1 align="center">
  lockfile-prune
</h1>

<p align="center">
  Lockfiles have needs too and this package takes care of them
</p>

<p align="center">
  <a href="https://www.npmjs.org/package/lockfile-prune"><img src="https://badgen.net/npm/v/lockfile-prune" alt="npm version"/></a>
  <a href="https://www.npmjs.org/package/lockfile-prune"><img src="https://badgen.net/npm/license/lockfile-prune" alt="license"/></a>
  <a href="https://www.npmjs.org/package/lockfile-prune"><img src="https://badgen.net/npm/dt/lockfile-prune" alt="downloads"/></a>
  <a href="https://circleci.com/gh/lirantal/lockfile-prune"><img src="https://circleci.com/gh/lirantal/lockfile-prune.svg?style=svg" alt="build"/></a>
  <a href="https://codecov.io/gh/lirantal/lockfile-prune"><img src="https://badgen.net/codecov/c/github/lirantal/lockfile-prune" alt="codecov"/></a>
  <a href="https://snyk.io/test/github/lirantal/lockfile-prune"><img src="https://snyk.io/test/github/lirantal/lockfile-prune/badge.svg" alt="Known Vulnerabilities"/></a>
  <a href="./SECURITY.md"><img src="https://img.shields.io/badge/Security-Responsible%20Disclosure-yellow.svg" alt="Responsible Disclosure Policy" /></a>
</p>

# About

This package prunes any devDependencies entries in an npm's lockfile, supporting
either `npm-shrinkwrap.json` or `package-lock.json`.

# Usage

```bash
npx lockfile-prune <path/to/lockfile>
```

# Example

If you use this as part of an automated flow for releasing packages with
something like `semantic-release` then you only need to npx' the lockfile
before the release process.

However, you can also automate it in the following way, by adding these
run-script hooks into `package.json`:

```json
 "scripts": {
   "prepublishOnly": "npx lockfile-prune npm-shrinkwrap.json",
   "postpublish": "git checkout npm-shrinkwrap.json"
}
```

The `postpublish` hook isn't strictly necessary on build systems but
can prove useful to maintain the same git tree if you are publishing
from a local development machine.

# Contributing

Please consult [CONTRIBUTING](./CONTRIBUTING.md) for guidelines on contributing to this project.

# Author

**lockfile-prune** © [Liran Tal](https://github.com/lirantal), Released under the [Apache-2.0](./LICENSE) License.
