#!/usr/bin/env bash

set -e

./node_modules/.bin/npm-cli-login
./node_modules/.bin/release-it --non-interactive --dry-run --no-git.requireCleanWorkingDir --verbose 0.0.5
