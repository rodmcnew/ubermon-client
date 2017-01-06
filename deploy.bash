#!/usr/bin/env bash
npm run build
git remote add production git@github.com:ubermon-client/ubermon-client.github.io.git
git add . && git commit -m "add files"
git subtree push --prefix build production master
