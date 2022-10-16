#!/bin/sh

env=$1

today=$(date +%y.%m.%d)
tagFormat="${env}/${today}-"

git fetch --all --tags
tagCount=$(git tag -l | grep -c $tagFormat)

newTagNumber=$(($tagCount + 1))
newTagName="${tagFormat}${newTagNumber}"

echo
echo "=================================="
echo
echo "   Created tag: \033[1m${newTagName}\033[0m   "
echo
echo "=================================="
echo
read -p "Are you sure to push this tag? (Y/n) " -n 1 -r
echo

if [[ $REPLY =~ ^[Yy]$ ]]; then
  git tag -a $newTagName -m $newTagName
  git push origin $newTagName
fi
