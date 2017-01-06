#!/usr/bin/env bash
npm run build
git remote add production git@github.com:ubermon-client/ubermon-client.github.io.git
git add build && git commit -m "add build files"
git subtree push --prefix build production master --force
