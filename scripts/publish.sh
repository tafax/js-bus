#!/usr/bin/env bash

set -e

if [[ "$TRAVIS_EVENT_TYPE" == "cron" ]] || [[ $TRAVIS_BRANCH != "master" ]]
    then
        echo "This script only works for MASTER and for non-CRON tasks..."
        exit 0
fi

git remote set-url origin https://tafax:$GITHUB_TOKEN@github.com/tafax/js-bus.git
git checkout master
git pull --tags origin master

./node_modules/.bin/npm-cli-login
./node_modules/.bin/release-it --non-interactive --verbose 0.0.5
