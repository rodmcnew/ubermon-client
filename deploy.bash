git remote add build git@github.com:ubermon-client/ubermon-client.github.io.git
git add build && git commit -m "Initial build subtree commit"
git subtree push --prefix build dist gh-pages
