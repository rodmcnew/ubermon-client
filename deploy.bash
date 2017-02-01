#!/usr/bin/env bash
npm run build
git remote add production git@github.com:ubermon-client-react-redux/ubermon-client-react-redux.github.io.git
git add . && git commit -m "add build files"
git push origin master
git subtree push --prefix build production master
