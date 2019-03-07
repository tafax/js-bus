#!/usr/bin/env bash

set -e

if [[ "$TRAVIS_EVENT_TYPE" == "cron" ]] || [[ $TRAVIS_BRANCH != "master" ]]
    then
        echo "This script only works for MASTER and for non-CRON tasks..."
        exit 0
fi

./node_modules/.bin/npm-cli-login
./node_modules/.bin/release-it --non-interactive
