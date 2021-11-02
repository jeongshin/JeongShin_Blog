#!/usr/bin/env sh

set -e

yarn docs:build

cd .vuepress/dist

git clone -b gh-pages https://github.com/JeongShin/JeongShin_Blog/

cp -rf JeongShin_Blog/.git ./.git
rm -rf JeongShin_Blog

git add .
git commit -m "$*"

git push origin gh-pages

cd -